package untutor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import untutor.domain.Topic;
import untutor.domain.TopicRequest;
import untutor.domain.user.Tutor;
import untutor.repository.TutorRepository;

import java.util.List;

@Service
public class TutorService {

    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
    private TopicService topicService;

    public List<Tutor> getTutorsByTopic(Long topicId) {
        return tutorRepository.findTutorsByTopics(topicService.findTopicById(topicId));
    }

    public List<TopicRequest> getTutorTopicRequestAll(String tutorEmail) {
        return tutorRepository.findByEmail(tutorEmail).getTopicRequests();
    }

    public List<Topic> getTutorTopics(String tutorEmail) {
        return tutorRepository.findByEmail(tutorEmail).getTopics();
    }


}
