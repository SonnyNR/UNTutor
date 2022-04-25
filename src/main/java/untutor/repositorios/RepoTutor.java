package untutor.repositorios;
import untutor.domain.user.Tutor;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

//esto será auto implementado por spring en un "bean" llamado repoTutor para
//los eventos CRUD: Create, Read, Update, Delete, también podemos verla como el DAO, que accede a la base de datos
public interface RepoTutor extends CrudRepository<Tutor, String> {
    Optional<Tutor> findByCorreo( String correo);
    Boolean existsByCorreo(String correo);
}