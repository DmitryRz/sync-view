package io.github.dmitryrz.syncview.service;

import io.github.dmitryrz.syncview.dto.request.RoomRequestDto;
import io.github.dmitryrz.syncview.dto.response.RoomResponseDto;

import java.util.List;

public interface RoomService {
    List<RoomResponseDto> getListRooms();

    RoomResponseDto getRoom(Long id);

    RoomResponseDto createRoom(RoomRequestDto request);

    RoomResponseDto updateRoom(Long id, RoomRequestDto request);

    void deleteRoom(Long id);
}
