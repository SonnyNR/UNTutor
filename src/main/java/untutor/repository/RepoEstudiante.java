package untutor.repository;
import untutor.domain.user.Student;

import org.springframework.data.repository.CrudRepository;

//esto será auto implementado por spring en un "bean" llamado repoEstudiante para
//los eventos CRUD: Create, Read, Update, Delete
public interface RepoEstudiante extends CrudRepository<Student, String> {

    Student findByCorreo(String correo);
   
}