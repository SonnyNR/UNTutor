package untutor.repository;

import org.springframework.data.repository.CrudRepository;
import untutor.domain.user.Administrator;

public interface AdministratorRepository extends CrudRepository<Administrator, Long> {

}
