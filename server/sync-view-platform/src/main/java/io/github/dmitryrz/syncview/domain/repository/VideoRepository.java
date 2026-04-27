package io.github.dmitryrz.syncview.domain.repository;

import io.github.dmitryrz.syncview.domain.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {
    @Query("SELECT v FROM Video v JOIN FETCH v.owner")
    List<Video> findAllWithOwners();
}
