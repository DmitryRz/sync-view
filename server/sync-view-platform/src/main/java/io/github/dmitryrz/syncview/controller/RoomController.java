package io.github.dmitryrz.syncview.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {
    @GetMapping
    public ResponseEntity<?> getListRooms() {
        return ResponseEntity.ok().body("getListRooms");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoom(@PathVariable Long id) {
        return ResponseEntity.ok().body("getRoom");
    }

    @PostMapping
    public ResponseEntity<?> createRoom() {
        return ResponseEntity.ok().body("createRoom");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable Long id) {
        return ResponseEntity.ok().body("updateRoom");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        return ResponseEntity.ok().body("deleteRoom");
    }
}
