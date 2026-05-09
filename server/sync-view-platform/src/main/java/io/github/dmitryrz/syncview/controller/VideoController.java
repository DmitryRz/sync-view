package io.github.dmitryrz.syncview.controller;

import io.github.dmitryrz.syncview.domain.model.UserPrincipal;
import io.github.dmitryrz.syncview.dto.request.VideoRequestDto;
import io.github.dmitryrz.syncview.dto.response.VideoResponseDto;
import io.github.dmitryrz.syncview.service.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @GetMapping
    public ResponseEntity<List<VideoResponseDto>> getVideoList() {
        List<VideoResponseDto> videoDto = videoService.getVideoList();
        return ResponseEntity.ok(videoDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoResponseDto> getVideoById(@PathVariable Long id) {
        VideoResponseDto response = videoService.getVideoById(id);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<VideoResponseDto> createVideo(@AuthenticationPrincipal UserPrincipal principal, @ModelAttribute VideoRequestDto request) {
        VideoResponseDto response = videoService.createVideo(principal, request);
        return ResponseEntity.created(URI.create(response.getUrl())).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVideo(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id) {
        return ResponseEntity.ok().body("updateVideo: " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id) {
        return ResponseEntity.ok().body("deleteVideo: " + id);
    }
}