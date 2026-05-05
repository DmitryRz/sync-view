package io.github.dmitryrz.syncview.dto.response;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserResponseDto {
    String username;
    String email;
    String avatar;
}
