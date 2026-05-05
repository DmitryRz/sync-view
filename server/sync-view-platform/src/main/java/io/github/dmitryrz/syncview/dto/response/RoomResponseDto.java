package io.github.dmitryrz.syncview.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class RoomResponseDto {
    private UUID id;
    private String name;
    private String creator;
    private String currentVideo;
}
