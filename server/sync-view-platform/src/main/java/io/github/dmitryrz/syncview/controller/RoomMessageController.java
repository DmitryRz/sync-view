package io.github.dmitryrz.syncview.controller;

import io.github.dmitryrz.syncview.domain.model.UserPrincipal;
import io.github.dmitryrz.syncview.dto.enums.RoomEventType;
import io.github.dmitryrz.syncview.dto.request.MessageRequestDto;
import io.github.dmitryrz.syncview.dto.response.MessageResponseDto;
import io.github.dmitryrz.syncview.dto.response.RoomEventDto;
import io.github.dmitryrz.syncview.dto.response.VideoSignalDto;
import io.github.dmitryrz.syncview.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class RoomMessageController {
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;

    // 1. Сообщения чата
    @MessageMapping("/room/{roomId}/chat")
    public void chat(@DestinationVariable UUID roomId, MessageRequestDto message, Authentication authentication) {
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        MessageResponseDto response = messageService.createMessage(user.uuid(), roomId, message);
        messagingTemplate.convertAndSend("/topic/" + roomId, response);
    }

    // 2. Управление плеером
    @MessageMapping("/room/{roomId}/player")
    public void playerControl(@DestinationVariable String roomId, VideoSignalDto message) {
        messagingTemplate.convertAndSend("/topic/" + roomId, message);
    }

    // 3. Уведомление о входе
    @MessageMapping("/room/{roomId}/join")
    public void joinRoom(@DestinationVariable String roomId, Authentication authentication) {
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        RoomEventDto event = new RoomEventDto(
                user.uuid(),
                user.username(),
                RoomEventType.JOIN,
                System.currentTimeMillis()
        );

        messagingTemplate.convertAndSend("/topic/" + roomId, event);
    }
}