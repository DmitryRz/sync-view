package io.github.dmitryrz.syncview.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;


@Entity
@Table(name = "rooms")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "uuid", columnDefinition = "uuid")
    private UUID id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne
    @JoinColumn(name = "current_video_id")
    private Video currentVideo;

    @Column(name = "external_video_url")
    private String externalVideoUrl;

    public void setInternalVideo(Video video) {
        if (video == null) {
            throw new IllegalArgumentException("Видео не может быть null");
        }
        this.currentVideo = video;
        this.externalVideoUrl = null;
    }

    public void setExternalVideo(String url) {
        if (url == null || url.isBlank()) {
            throw new IllegalArgumentException("URL не может быть пустым");
        }
        this.externalVideoUrl = url;
        this.currentVideo = null;
    }
}