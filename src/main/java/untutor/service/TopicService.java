package untutor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.expression.Lists;
import untutor.domain.Topic;
import untutor.domain.TopicRequest;
import untutor.repository.TopicRepository;
import untutor.repository.TopicRequestRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class TopicService {

    private TopicRepository        topicRepository;
    private TopicRequestRepository topicRequestRepository;

    @Autowired
    public TopicService(TopicRepository topicRepository,
                        TopicRequestRepository topicRequestRepository){
        this.topicRepository = topicRepository;
        this.topicRequestRepository = topicRequestRepository;
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

}
