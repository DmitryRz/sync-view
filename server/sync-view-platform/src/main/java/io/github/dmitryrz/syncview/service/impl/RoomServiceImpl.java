package io.github.dmitryrz.syncview.service.impl;

import io.github.dmitryrz.syncview.domain.model.Room;
import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.domain.model.Video;
import io.github.dmitryrz.syncview.domain.repository.RoomRepository;
import io.github.dmitryrz.syncview.domain.repository.UserRepository;
import io.github.dmitryrz.syncview.domain.repository.VideoRepository;
import io.github.dmitryrz.syncview.dto.request.RoomRequestDto;
import io.github.dmitryrz.syncview.dto.response.RoomResponseDto;
import io.github.dmitryrz.syncview.mapper.RoomMapper;
import io.github.dmitryrz.syncview.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomMapper roomMapper;

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final VideoRepository videoRepository;

    @Override
    public List<RoomResponseDto> getListRooms() {
        return roomRepository.findAllProjected();
    }

    @Override
    public RoomResponseDto getRoom(UUID id) {
        return roomMapper.toDto(
                roomRepository.findById(id).orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Комната с таким ID не найдена"
                        )));
    }

    @Override
    @Transactional
    public RoomResponseDto createRoom(RoomRequestDto request, UUID userUuid) {
        User user = userRepository.getReferenceById(userUuid);
        Video video = videoRepository.findById(request.getVideoId()).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Видео с таким ID не найдено"
        ));
        Room room = roomMapper.toEntity(request, user, video);
        room = roomRepository.save(room);
        return roomMapper.toDto(room);
    }

    @Override
    @Transactional
    public RoomResponseDto updateRoom(UUID id, RoomRequestDto request, UUID userUuid) {
        Room room = roomRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Комната с таким ID не найдена"
                ));
        if (!room.getCreator().getUuid().equals(userUuid)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Доступ запрещен");
        }

        if (request.getVideoId() != null) {
            Video video = videoRepository.findById(request.getVideoId()).orElseThrow(
                    () -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "Видео с таким ID не найдена"
                    ));
            room.setCurrentVideo(video);
        }

        if (request.getName() != null) {
            room.setName(request.getName());
        }
        Room updatedRoom = roomRepository.save(room);
        return roomMapper.toDto(updatedRoom);
    }

    @Override
    @Transactional
    public void deleteRoom(UUID id, UUID userUuid) {
        Room room = roomRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Комната с таким ID не найдена"
                ));
        if (!room.getCreator().getUuid().equals(userUuid)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Доступ запрещен");
        }
        roomRepository.delete(room);
    }
}
