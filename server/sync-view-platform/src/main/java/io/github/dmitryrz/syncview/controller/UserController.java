package io.github.dmitryrz.syncview.controller;

import io.github.dmitryrz.syncview.dto.response.UserResponseDto;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentProfile(@AuthenticationPrincipal Jwt jwt) {
        UserResponseDto response = UserResponseDto.builder()
                .username(jwt.getClaimAsString("preferred_username"))
                .email(jwt.getClaimAsString("email"))
                .avatar("https://picsum.photos/200")
                .build();

        return ResponseEntity.ok(response);
    }
}
