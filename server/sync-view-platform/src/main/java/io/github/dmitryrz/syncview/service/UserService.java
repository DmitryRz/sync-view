package io.github.dmitryrz.syncview.service;

public interface UserService {
    String getOrCreateUserUuid(String sub, String username, String email);
}
