package io.github.dmitryrz.syncview.dto.request;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Value
@Builder
@Jacksonized
public class RoomRequestDto {
    Long videoId;
    String name;
}
