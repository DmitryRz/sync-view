package io.github.dmitryrz.syncview.service.impl;

import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.domain.model.UserPrincipal;
import io.github.dmitryrz.syncview.domain.repository.UserRepository;
import io.github.dmitryrz.syncview.dto.response.UserResponseDto;
import io.github.dmitryrz.syncview.service.FileService;
import io.github.dmitryrz.syncview.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final FileService fileService;
    private final TransactionTemplate transactionTemplate;


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
                .map(this::toDto)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Пользователь с таким ID не найден"
                ));
    }

    @Override
    @Transactional
    public String uploadAvatar(UserPrincipal principal, MultipartFile file) {
        User user = userRepository.findById(principal.uuid()).orElseThrow();
        String objectName = fileService.uploadFile(file, "avatars", principal.username());
        String avatarUrl = fileService.buildFullUrl(objectName);
        try {
            user.setAvatarUrl(avatarUrl);
            userRepository.save(user);
        } catch (Exception e) {
            fileService.deleteFile(objectName);
            log.error("Не удалось сохранить запись в базу данных: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка сохранения");
        }
        return avatarUrl;
    }

    @Override
    public String getAvatar(UUID uuid) {
        return userRepository.findById(uuid).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Пользователь с таким ID не найден"
        )).getAvatarUrl();
    }

    @Override
    public List<UserResponseDto> getListUsers() {
        return userRepository.findAll(PageRequest.of(0, 10)).stream().map(this::toDto).toList();
    }

    private UserResponseDto toDto(User user) {
        return UserResponseDto.builder()
                .uuid(user.getUuid())
                .username(user.getUsername())
                .email(user.getEmail())
                .avatar(user.getAvatarUrl())
                .build();
    }
}