package io.github.dmitryrz.syncview.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "uuid")
    private String uuid;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;
}
