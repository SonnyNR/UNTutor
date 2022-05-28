package untutor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import untutor.domain.Topic;
import untutor.domain.TopicRequest;
import untutor.domain.user.Tutor;
import untutor.repository.TopicRepository;
import untutor.repository.TopicRequestRepository;
import java.util.List;

@Service
public class TopicService {

    private TopicRepository        topicRepository;
    private TopicRequestRepository topicRequestRepository;
    private UserService            userService;

    @Autowired
    public TopicService(TopicRepository topicRepository,
                        TopicRequestRepository topicRequestRepository,
                        UserService userService){

        this.topicRepository        = topicRepository;
        this.topicRequestRepository = topicRequestRepository;
        this.userService            = userService;
    }

    public TopicRequest acceptTopicRequest(String tutorEmail, Long topicRId) {

        TopicRequest topicRequest = topicRequestRepository.findById(topicRId).get();
        topicRequest.setStatus(TopicRequest.Status.ACCEPTED);
        topicRequestRepository.save(topicRequest);

        Tutor tutor = (Tutor) userService.findByEmail(tutorEmail);
        tutor.getTopics().add(topicRequest.getTopic());
        userService.save(tutor);

        return topicRequest;
    }

    public TopicRequest createTopicRequest(String tutorEmail, Long topicRId) {
        // verificar que ya no tenga la misma solicitud
        Topic topic = findTopicById(topicRId);
        Tutor tutor = (Tutor) userService.findByEmail(tutorEmail);
        TopicRequest topicRequest = new TopicRequest(tutor.getName(), tutor.getEmail(), topic);
        saveTopicRequest(topicRequest);
        tutor.getTopicRequests().add(topicRequest);
        userService.save(tutor);
        return topicRequest;
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
