package io.github.dmitryrz.syncview.domain.model;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.UUID;

public record UserPrincipal(UUID uuid, String username, String email,
                            Collection<? extends GrantedAuthority> authorities) {
}
