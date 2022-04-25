package untutor.repositorios;
import untutor.domain.user.Student;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

//esto será auto implementado por spring en un "bean" llamado repoEstudiante para
//los eventos CRUD: Create, Read, Update, Delete, también podemos verla como el DAO, que accede a la base de datos
public interface RepoEstudiante extends CrudRepository<Student, String> {
    Optional<Student> findByCorreo( String correo);
    Boolean existsByCorreo(String correo);
}