package untutor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import untutor.domain.Topic;
import untutor.domain.TopicRequest;
import untutor.domain.chat.Chat;
import untutor.domain.chat.Message;
import untutor.domain.user.Tutor;
import untutor.domain.user.User;
import untutor.repository.ChatRepository;
import untutor.repository.MessageRepository;
import untutor.repository.TopicRepository;
import untutor.repository.TopicRequestRepository;
import java.util.List;

@Service
public class TopicService {

    private TopicRepository        topicRepository;
    private TopicRequestRepository topicRequestRepository;
    private UserService            userService;
    private ChatRepository         chatRepository;
    private MessageRepository      messageRepository;

    @Autowired
    public TopicService(TopicRepository topicRepository,
                        TopicRequestRepository topicRequestRepository,
                        ChatRepository chatRepository,
                        MessageRepository messageRepository,
                        UserService userService){

        this.topicRepository        = topicRepository;
        this.topicRequestRepository = topicRequestRepository;
        this.chatRepository         = chatRepository;
        this.messageRepository      = messageRepository;
        this.userService            = userService;
    }

    public boolean receiveMessage(Long topicRId, String contentMessage, String userEmail) {

        TopicRequest topicRequest = topicRequestRepository.findById(topicRId).get();
        Chat chat = topicRequest.getChat();
        User user = userService.findByEmail(userEmail);
        Message message = new Message(user.getName(), contentMessage);
        messageRepository.save(message);
        chat.getMessages().add(message);
        chatRepository.save(chat);
        return true;
    }

    public TopicRequest acceptTopicRequest(Long topicRId) {

        TopicRequest topicRequest = topicRequestRepository.findById(topicRId).get();
        topicRequest.setStatus(TopicRequest.Status.ACCEPTED);
        topicRequestRepository.save(topicRequest);

        Tutor tutor = (Tutor) userService.findByEmail(topicRequest.getTutorEmail());
        tutor.getTopics().add(topicRequest.getTopic());
        userService.save(tutor);

        return topicRequest;
    }

    public TopicRequest declineTopicRequest(Long topicRId) {

        // verificar si ya estaba aceptada
        TopicRequest topicRequest = topicRequestRepository.findById(topicRId).get();
        topicRequest.setStatus(TopicRequest.Status.DECLINED);
        topicRequestRepository.save(topicRequest);

        return topicRequest;
    }

    public TopicRequest createTopicRequest(String tutorEmail, Long topicRId) {
        // verificar que ya no tenga la misma solicitud

        Chat chat = new Chat();
        chatRepository.save(chat);
        Topic topic = findTopicById(topicRId);
        Tutor tutor = (Tutor) userService.findByEmail(tutorEmail);
        TopicRequest topicRequest = new TopicRequest(tutor.getName(), tutor.getEmail(), topic, chat);
        saveTopicRequest(topicRequest);
        tutor.getTopicRequests().add(topicRequest);
        userService.save(tutor);
        return topicRequest;
    }

    public List<TopicRequest> getTopicRequestsAllTutor(String tutorEmail){
        Tutor tutor  = (Tutor) userService.findByEmail(tutorEmail);
        return tutor.getTopicRequests();
    }



    public Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public TopicRequest saveTopicRequest(TopicRequest topicRequest) {
        return topicRequestRepository.save(topicRequest);
    }

    public List<Topic> getTopicsAll(){
        return topicRepository.findAll();
    }

    public List<TopicRequest> getTopicRequestList() {
        return topicRequestRepository.findAll();
    }

    public Topic findTopicById(Long id) {
        return topicRepository.findById(id).get();
    }

    public List<TopicRequest> getTutorTopicRequestList(String tutorEmail) {
        Tutor tutor = (Tutor) userService.findByEmail(tutorEmail);
        return tutor.getTopicRequests();
    }

}
