package io.github.dmitryrz.syncview.dto.response;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

import java.time.LocalDateTime;
import java.util.UUID;

@Value
@Builder
@Jacksonized
public class MessageResponseDto {
    UUID id;
    String content;
    String authorName;
    String authorAvatar;
    LocalDateTime createdAt;
}