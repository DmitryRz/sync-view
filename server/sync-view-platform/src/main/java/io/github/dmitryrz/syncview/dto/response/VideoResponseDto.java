package io.github.dmitryrz.syncview.dto.response;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Value
@Builder
public class VideoResponseDto {
    Long id;
    String title;
    String url;
    Integer duration;
    String ownerUsername;
    LocalDateTime createdAt;
}
