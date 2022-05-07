package untutor.repository;

import org.springframework.data.repository.CrudRepository;
import untutor.domain.Topic;

import java.util.List;

public interface TopicRepository extends CrudRepository<Topic, Long> {

    List<Topic> findAll();

}
