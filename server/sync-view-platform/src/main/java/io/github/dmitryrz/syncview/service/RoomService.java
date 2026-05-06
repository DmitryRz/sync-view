package io.github.dmitryrz.syncview.service;

import io.github.dmitryrz.syncview.dto.request.RoomRequestDto;
import io.github.dmitryrz.syncview.dto.response.RoomResponseDto;

import java.util.List;
import java.util.UUID;

public interface RoomService {
    List<RoomResponseDto> getListRooms();

    RoomResponseDto getRoom(UUID id);

    RoomResponseDto createRoom(RoomRequestDto request, UUID userUuid);

    RoomResponseDto updateRoom(UUID id, RoomRequestDto request, UUID userUuid);

    void deleteRoom(UUID id, UUID userUuid);
}
