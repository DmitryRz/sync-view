package io.github.dmitryrz.syncview.domain.repository;

import io.github.dmitryrz.syncview.domain.model.Room;
import io.github.dmitryrz.syncview.dto.response.RoomResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    @Query("""
        SELECT new io.github.dmitryrz.syncview.dto.response.RoomResponseDto(r.id, r.name, c.username, v.url)
        FROM Room r
        LEFT JOIN r.creator c
        LEFT JOIN r.currentVideo v
    """)
    List<RoomResponseDto> findAllProjected();
}
