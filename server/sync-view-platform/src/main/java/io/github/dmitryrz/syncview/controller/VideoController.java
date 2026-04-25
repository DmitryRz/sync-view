package io.github.dmitryrz.syncview.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1/videos")
@RequiredArgsConstructor
public class VideoController {

    @GetMapping
    public ResponseEntity<?> getVideoList() {
        return ResponseEntity.ok().body("getVideoList");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVideoById(@PathVariable Long id) {
        return ResponseEntity.ok().body("getVideoById");
    }

    @PostMapping
    public ResponseEntity<?> createVideo() {
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