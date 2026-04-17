package io.github.dmitryrz.syncview.service.impl;

import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.domain.repository.UserRepository;
import io.github.dmitryrz.syncview.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final TransactionTemplate transactionTemplate;

    @Override
    @Cacheable(value = "users_uuid", key = "#sub")
    public String getOrCreateUserUuid(String sub, String username, String email) {
        return userRepository.findById(sub)
                .map(User::getUuid)
                .orElseGet(() -> transactionTemplate.execute(status -> {
                    User newUser = User.builder()
                            .uuid(sub)
                            .username(username)
                            .email(email)
                            .build();
                    return userRepository.save(newUser).getUuid();
                }));
    }
}