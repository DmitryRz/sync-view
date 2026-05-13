package io.github.dmitryrz.syncview.service;

import io.github.dmitryrz.syncview.dto.request.MessageRequestDto;
import io.github.dmitryrz.syncview.dto.response.MessageResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.UUID;

public interface MessageService {
    Slice<MessageResponseDto> getMessages(UUID roomId, Pageable pageable);

    MessageResponseDto createMessage(UUID userId, UUID roomId, MessageRequestDto request);
}
