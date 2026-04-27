package io.github.dmitryrz.syncview.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class VideoResponseDto {
    private Long id;
    private String title;
    private String url;
    private Integer duration;
    private String ownerUsername;
    private LocalDateTime createdAt;
}
