package io.github.dmitryrz.syncview.service.impl;

import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.domain.model.Video;
import io.github.dmitryrz.syncview.domain.repository.UserRepository;
import io.github.dmitryrz.syncview.domain.repository.VideoRepository;
import io.github.dmitryrz.syncview.dto.request.VideoRequestDto;
import io.github.dmitryrz.syncview.dto.response.VideoResponseDto;
import io.github.dmitryrz.syncview.mapper.VideoMapper;
import io.github.dmitryrz.syncview.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {
    private final VideoMapper videoMapper;

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;

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
    public void createVideo(String userId, VideoRequestDto request) {
        User owner = userRepository.findById(userId).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Пользователь с таким ID не найден"
                )
        );

        Video video = videoMapper.toEntity(request, owner);

        videoRepository.save(video);
    }
}
