package io.github.dmitryrz.syncview.service;

import io.github.dmitryrz.syncview.domain.model.UserPrincipal;
import io.github.dmitryrz.syncview.dto.response.UserResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UUID getOrCreateUserUuid(UUID sub, String username, String email);

    UserResponseDto getCurrentProfile(UUID uuid);

    String uploadAvatar(UserPrincipal principal, MultipartFile file);

    String getAvatar(UUID uuid);

    List<UserResponseDto> getListUsers();
}
