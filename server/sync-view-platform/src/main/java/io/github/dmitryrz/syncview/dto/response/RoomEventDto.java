package io.github.dmitryrz.syncview.dto.response;

import io.github.dmitryrz.syncview.dto.enums.RoomEventType;

import java.util.UUID;

public record RoomEventDto(
        UUID userId,
        String username,
        RoomEventType type,
        Long timestamp
) {}