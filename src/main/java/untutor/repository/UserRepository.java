package untutor.repository;

import untutor.domain.user.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String>
{
    User findByEmail(String email);
}