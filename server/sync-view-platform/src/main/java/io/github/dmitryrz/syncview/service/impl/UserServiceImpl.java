package io.github.dmitryrz.syncview.service.impl;

import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.domain.repository.UserRepository;
import io.github.dmitryrz.syncview.dto.response.UserResponseDto;
import io.github.dmitryrz.syncview.service.UserService;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final TransactionTemplate transactionTemplate;
    private final MinioClient minioClient;

    @Value("${minio.bucket}")
    private String bucketName;

    @Value("${minio.endpoint}")
    private String url;

    @Override
    @Cacheable(value = "users_uuid", key = "#sub")
    public UUID getOrCreateUserUuid(UUID sub, String username, String email) {
        return userRepository.findById(sub)
                .map(User::getUuid)
                .orElseGet(() -> transactionTemplate.execute(status -> {
                    User newUser = User.builder()
                            .uuid(sub)
                            .username(username)
                            .email(email)
                            .build();
                    return userRepository.save(newUser).getUuid();
                }));
    }

    @Override
    public UserResponseDto getCurrentProfile(UUID uuid) {
        return userRepository.findById(uuid)
                .map(user -> UserResponseDto.builder()
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .avatar(user.getAvatarUrl())
                        .build())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Пользователь с таким ID не найден"
                ));
    }

    @Override
    @Transactional
    public String uploadAvatar(UUID userId, MultipartFile file) {
        User user = userRepository.findById(userId).orElseThrow();
        String objectName = "avatars/" + userId + "-" + file.getOriginalFilename();
        String avatarUrl = String.format("%s/%s/%s", url.replaceAll("/+$", ""), bucketName, objectName);

        user.setAvatarUrl(avatarUrl);

        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                try {
                    minioClient.putObject(
                            PutObjectArgs.builder()
                                    .bucket(bucketName)
                                    .object(objectName)
                                    .stream(file.getInputStream(), file.getSize(), -1)
                                    .contentType(file.getContentType())
                                    .build()
                    );
                } catch (Exception e) {
                    throw new RuntimeException("Ошибка при загрузке аватара", e);
                }
            }
        });

        return avatarUrl;

    }

    @Override
    public String getAvatar(UUID uuid) {
        return userRepository.findById(uuid).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Пользователь с таким ID не найден"
        )).getAvatarUrl();
    }
}