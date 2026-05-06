package io.github.dmitryrz.syncview.service;

import java.util.UUID;

public interface UserService {
    UUID getOrCreateUserUuid(UUID sub, String username, String email);
}
