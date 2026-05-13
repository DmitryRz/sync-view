package io.github.dmitryrz.syncview.dto.response;

import io.github.dmitryrz.syncview.dto.enums.PlayerAction;

import java.util.UUID;

public record VideoSignalDto(
        PlayerAction action,
        Double timestamp,
        Double playbackRate,
        Long sentAt,
        UUID initiatorId
) {}