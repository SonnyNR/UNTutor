package untutor.repository;

import untutor.domain.user.Tutor;
import untutor.domain.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, String>
{
    User findByEmail(String email);
    List<Tutor> getUserByRole(String role);

}