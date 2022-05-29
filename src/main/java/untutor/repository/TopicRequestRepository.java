package untutor.repository;

import org.springframework.data.repository.CrudRepository;
import untutor.domain.TopicRequest;

import java.util.List;

public interface TopicRequestRepository extends CrudRepository<TopicRequest, Long> {

    List<TopicRequest> findAll();

}
