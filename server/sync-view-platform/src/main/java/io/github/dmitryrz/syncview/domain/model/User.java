package io.github.dmitryrz.syncview.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "uuid", columnDefinition = "UUID")
    private UUID uuid;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    private String avatarUrl;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Video> uploadedVideos;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Room> createdRooms = new HashSet<>();
}
