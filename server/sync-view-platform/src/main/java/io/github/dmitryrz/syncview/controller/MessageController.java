package io.github.dmitryrz.syncview.controller;

import io.github.dmitryrz.syncview.dto.response.MessageResponseDto;
import io.github.dmitryrz.syncview.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/rooms/{roomId}/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MessageController {
    private final MessageService messageService;

    @GetMapping
    public ResponseEntity<Slice<MessageResponseDto>> getMessages(@PathVariable UUID roomId,
                                                                 @PageableDefault(size = 30, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Slice<MessageResponseDto> request = messageService.getMessages(roomId, pageable);
        return ResponseEntity.ok(request);
    }
}
