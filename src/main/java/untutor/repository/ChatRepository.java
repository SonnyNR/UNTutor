package untutor.repository;

import org.springframework.data.repository.CrudRepository;
import untutor.domain.chat.Chat;

public interface ChatRepository extends CrudRepository<Chat, Long> {

}
