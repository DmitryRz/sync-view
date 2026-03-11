package io.github.dmitryrz.syncview.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserResponseDto {
    private String username;
    private String email;
    private String avatar;
}
