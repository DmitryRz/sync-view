package io.github.dmitryrz.syncview.controller;

import io.github.dmitryrz.syncview.domain.model.UserPrincipal;
import io.github.dmitryrz.syncview.dto.request.RoomRequestDto;
import io.github.dmitryrz.syncview.dto.response.RoomResponseDto;
import io.github.dmitryrz.syncview.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomResponseDto>> getListRooms() {
        List<RoomResponseDto> response = roomService.getListRooms();
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponseDto> getRoom(@PathVariable UUID id) {
        RoomResponseDto response = roomService.getRoom(id);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<RoomResponseDto> createRoom(@RequestBody RoomRequestDto request, @AuthenticationPrincipal UserPrincipal principal) {
        UUID userUuid = principal.uuid();
        RoomResponseDto response = roomService.createRoom(request, userUuid);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path(response.getId().toString())
                .buildAndExpand()
                .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponseDto> updateRoom(@PathVariable UUID id, @RequestBody RoomRequestDto request, @AuthenticationPrincipal UserPrincipal principal) {
        UUID userUuid = principal.uuid();
        RoomResponseDto response = roomService.updateRoom(id, request, userUuid);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable UUID id, @AuthenticationPrincipal UserPrincipal principal) {
        UUID userUuid = principal.uuid();
        roomService.deleteRoom(id, userUuid);
        return ResponseEntity.noContent().build();
    }
}
