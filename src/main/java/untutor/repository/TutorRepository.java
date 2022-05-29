package untutor.repository;

import org.springframework.data.repository.CrudRepository;
import untutor.domain.Topic;
import untutor.domain.user.Tutor;

import java.util.List;

public interface TutorRepository extends CrudRepository<Tutor, Long> {

    List<Tutor> findTutorsByTopics(Topic topic);

    Tutor findByEmail(String email);

}
