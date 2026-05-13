package io.github.dmitryrz.syncview.service.impl;

import io.github.dmitryrz.syncview.domain.model.Message;
import io.github.dmitryrz.syncview.domain.model.Room;
import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.domain.repository.MessageRepository;
import io.github.dmitryrz.syncview.domain.repository.RoomRepository;
import io.github.dmitryrz.syncview.domain.repository.UserRepository;
import io.github.dmitryrz.syncview.dto.request.MessageRequestDto;
import io.github.dmitryrz.syncview.dto.response.MessageResponseDto;
import io.github.dmitryrz.syncview.service.MessageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    @Override
    public Slice<MessageResponseDto> getMessages(UUID roomId, Pageable pageable) {
        Slice<Message> entitySlice = messageRepository.findAllByRoomId(roomId, pageable);
        return entitySlice.map(this::convertToDto);
    }

    @Override
    @Transactional
    public MessageResponseDto createMessage(UUID userId, UUID roomId, MessageRequestDto request) {
        User user = userRepository.getReferenceById(userId);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Комната с ID " + roomId + " не найдена"));

        Message message = Message.builder()
                .content(request.getMessage())
                .author(user)
                .room(room)
                .build();

        return convertToDto(messageRepository.save(message));
    }

    private MessageResponseDto convertToDto(Message message) {
        return MessageResponseDto.builder()
                .id(message.getId())
                .content(message.getContent())
                .createdAt(message.getCreatedAt())
                .authorName(message.getAuthor().getUsername())
                .authorAvatar(message.getAuthor().getAvatarUrl())
                .build();
    }
}
