package io.github.dmitryrz.syncview.controller;

import io.github.dmitryrz.syncview.dto.response.MessageResponseDto;
import io.github.dmitryrz.syncview.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/rooms/{roomId}/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MessageController {
    private final MessageService messageService;

    @GetMapping
    public ResponseEntity<Slice<MessageResponseDto>> getMessages(@PathVariable String roomId,
                                                                 @PageableDefault(size = 30, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        UUID roomUuid;
        try {
            roomUuid = UUID.fromString(roomId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found");
        }
        Slice<MessageResponseDto> request = messageService.getMessages(roomUuid, pageable);
        return ResponseEntity.ok(request);
    }
}
