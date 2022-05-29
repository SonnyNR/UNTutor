package untutor.repository;

import org.springframework.data.repository.CrudRepository;
import untutor.domain.user.Student;


public interface StudentRepository extends CrudRepository<Student, Long> {

}

