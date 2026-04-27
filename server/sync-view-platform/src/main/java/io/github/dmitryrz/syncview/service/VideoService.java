package io.github.dmitryrz.syncview.service;

import io.github.dmitryrz.syncview.dto.request.VideoRequestDto;
import io.github.dmitryrz.syncview.dto.response.VideoResponseDto;

import java.util.List;

public interface VideoService {

    List<VideoResponseDto> getVideoList();

    VideoResponseDto getVideoById(Long id);

    void createVideo(String userId, VideoRequestDto request);
}
