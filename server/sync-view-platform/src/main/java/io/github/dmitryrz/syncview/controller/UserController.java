package io.github.dmitryrz.syncview.controller;

import io.github.dmitryrz.syncview.domain.model.UserPrincipal;
import io.github.dmitryrz.syncview.dto.response.UserResponseDto;
import io.github.dmitryrz.syncview.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentProfile(@AuthenticationPrincipal UserPrincipal principal) {
        UserResponseDto response = userService.getCurrentProfile(principal.uuid());

        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/upload-avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadAvatar(@AuthenticationPrincipal UserPrincipal principal, @RequestParam("avatar") MultipartFile file) {
        String url = userService.uploadAvatar(principal, file);

        return ResponseEntity.ok(Map.of("avatar", url));
    }

    @GetMapping("/{uuid}/avatar")
    public ResponseEntity<Void> getAvatar(@PathVariable("uuid") UUID uuid) {
        String avatarUrl = userService.getAvatar(uuid);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(avatarUrl))
                .build();
    }
}
