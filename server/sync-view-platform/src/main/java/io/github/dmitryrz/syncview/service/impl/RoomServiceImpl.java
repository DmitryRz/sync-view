package io.github.dmitryrz.syncview.service.impl;

import io.github.dmitryrz.syncview.domain.repository.RoomRepository;
import io.github.dmitryrz.syncview.dto.request.RoomRequestDto;
import io.github.dmitryrz.syncview.dto.response.RoomResponseDto;
import io.github.dmitryrz.syncview.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    @Override
    public List<RoomResponseDto> getListRooms() {
        return List.of();
    }

    @Override
    public RoomResponseDto getRoom(Long id) {
        return null;
    }

    @Override
    public RoomResponseDto createRoom(RoomRequestDto request) {
        return null;
    }

    @Override
    public RoomResponseDto updateRoom(Long id, RoomRequestDto request) {
        return null;
    }

    @Override
    public void deleteRoom(Long id) {

    }
}
