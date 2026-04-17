package io.github.dmitryrz.syncview.domain.repository;

import io.github.dmitryrz.syncview.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
