package io.github.dmitryrz.syncview.controller;

import io.github.dmitryrz.syncview.dto.response.UserResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentProfile() {
        UserResponseDto response = UserResponseDto.builder()
                .username("username")
                .email("email@example.com")
                .avatar("https://picsum.photos/200")
                .build();

        return ResponseEntity.ok(response);
    }
}
