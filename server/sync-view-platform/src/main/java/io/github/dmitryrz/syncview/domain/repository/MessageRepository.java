package io.github.dmitryrz.syncview.domain.repository;

import io.github.dmitryrz.syncview.domain.model.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    @EntityGraph(attributePaths = {"author", "room"})
    Slice<Message> findAllByRoomId(UUID roomId, Pageable pageable);
}