package io.github.dmitryrz.syncview.dto.response;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class UserResponseDto {
    UUID uuid;
    String username;
    String email;
    String avatar;
}
