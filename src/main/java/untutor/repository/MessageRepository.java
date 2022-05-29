package untutor.repository;

import org.springframework.data.repository.CrudRepository;
import untutor.domain.chat.Message;

public interface MessageRepository extends CrudRepository<Message, Long> {

}
