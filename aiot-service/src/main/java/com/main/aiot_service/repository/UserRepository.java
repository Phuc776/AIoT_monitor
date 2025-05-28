package com.main.aiot_service.repository;

import com.main.aiot_service.model.entity.Role;
import com.main.aiot_service.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

//    Page<User> findAll(Pageable pageable);

    boolean existsByUsername(String username);

    Page<User> findByRole(Role role, Pageable pageable);

    List<User> findAllByAssignedProfiles_Id(Long profileId);
}
