package io.github.dmitryrz.syncview.service.impl;

import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.domain.model.UserPrincipal;
import io.github.dmitryrz.syncview.domain.model.Video;
import io.github.dmitryrz.syncview.domain.repository.UserRepository;
import io.github.dmitryrz.syncview.domain.repository.VideoRepository;
import io.github.dmitryrz.syncview.dto.request.VideoRequestDto;
import io.github.dmitryrz.syncview.dto.response.VideoResponseDto;
import io.github.dmitryrz.syncview.mapper.VideoMapper;
import io.github.dmitryrz.syncview.service.FileService;
import io.github.dmitryrz.syncview.service.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {
    private final VideoMapper videoMapper;

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;

    private final FileService fileService;


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

        String objectName = fileService.uploadFile(request.getFile(), "videos", principal.username());
        String videoUrl = fileService.buildFullUrl(objectName);

        Video video = Video.builder()
                .owner(owner)
                .title(request.getTitle())
                .url(videoUrl)
                .build();

        try {
            Video saveVideo = videoRepository.save(video);
            return videoMapper.toResponseDto(saveVideo);
        } catch (RuntimeException e) {
            fileService.deleteFile(objectName);
            log.error("Не удалось сохранить запись в базу данных: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка сохранения");
        }
    }
}
