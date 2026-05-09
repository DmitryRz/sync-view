package io.github.dmitryrz.syncview.service.impl;

import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.domain.model.UserPrincipal;
import io.github.dmitryrz.syncview.domain.model.Video;
import io.github.dmitryrz.syncview.domain.repository.UserRepository;
import io.github.dmitryrz.syncview.domain.repository.VideoRepository;
import io.github.dmitryrz.syncview.dto.request.VideoRequestDto;
import io.github.dmitryrz.syncview.dto.response.VideoResponseDto;
import io.github.dmitryrz.syncview.mapper.VideoMapper;
import io.github.dmitryrz.syncview.service.VideoService;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {
    private final VideoMapper videoMapper;

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;

    private final MinioClient minioClient;

    @Value("${minio.bucket}")
    private String bucketName;

    @Value("${minio.endpoint}")
    private String minioUrl;

    @Override
    public List<VideoResponseDto> getVideoList() {
        return videoRepository.findAllWithOwners().stream()
                .map(videoMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public VideoResponseDto getVideoById(Long id) {
        return videoRepository.findById(id)
                .map(videoMapper::toResponseDto)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Видео с таким ID не найдено"
                ));
    }

    @Override
    public VideoResponseDto createVideo(UserPrincipal principal, VideoRequestDto request) {
        User owner = userRepository.findById(principal.uuid()).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Пользователь с таким ID не найден"
                )
        );

        String objectName = "videos/" + principal.username() + "/" + UUID.randomUUID();
        String videoUrl = String.format("%s/%s/%s", minioUrl, bucketName, objectName);

        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .contentType(request.getFile().getContentType())
                            .stream(request.getFile().getInputStream(), request.getFile().getSize(), -1)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        Video video = Video.builder()
                .owner(owner)
                .title(request.getTitle())
                .url(videoUrl)
                .build();

        Video saveVideo = videoRepository.save(video);
        return videoMapper.toResponseDto(saveVideo);
    }
}
