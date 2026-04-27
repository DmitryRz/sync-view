package io.github.dmitryrz.syncview.controller;

import io.github.dmitryrz.syncview.dto.request.VideoRequestDto;
import io.github.dmitryrz.syncview.dto.response.VideoResponseDto;
import io.github.dmitryrz.syncview.service.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getVideoById(@PathVariable Long id) {
        VideoResponseDto videoDto = videoService.getVideoById(id);
        return ResponseEntity.ok().body("getVideoById");
    }

    @PostMapping
    public ResponseEntity<?> createVideo(@AuthenticationPrincipal Jwt jwt, @RequestBody VideoRequestDto request) {
        videoService.createVideo(jwt.getSubject(), request);
        return ResponseEntity.ok().body("createVideo");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVideo(@PathVariable Long id) {
        return ResponseEntity.ok().body("updateVideo: " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(@PathVariable Long id) {
        return ResponseEntity.ok().body("deleteVideo: " + id);
    }
}