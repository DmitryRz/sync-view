package io.github.dmitryrz.syncview.dto.response;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class RoomResponseDto {
    UUID id;
    String name;
    String creator;
    String currentVideo;
}
