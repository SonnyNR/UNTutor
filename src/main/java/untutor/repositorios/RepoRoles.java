package untutor.repositorios;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import untutor.domain.user.ERole;
import untutor.domain.user.Role;


@Repository
public interface RepoRoles extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
