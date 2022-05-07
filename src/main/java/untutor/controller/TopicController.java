package untutor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import untutor.domain.Topic;
import untutor.domain.TopicRequest;
import untutor.domain.user.Tutor;
import untutor.service.TopicService;
import untutor.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path="/api/topic", produces = "application/json")
public class TopicController {


    private TopicService topicService;
    private UserService userService;

    @Autowired
    public TopicController(TopicService topicService, UserService userService) {
        this.topicService = topicService;
        this.userService  = userService;
    }

    @GetMapping
    public List<Topic> getTopics() {
        return topicService.getTopicsAll();
    }

    @PostMapping("/request/{id}")
    public TopicRequest createRequest(@PathVariable("id") Long id, Principal principal) {
        System.out.println("llego");
        Topic topic = topicService.findTopicById(id);
        Tutor tutor = (Tutor) userService.findByEmail(principal.getName());
        TopicRequest topicRequest = new TopicRequest(tutor, topic);
        topicService.saveTopicRequest(topicRequest);
        tutor.getTopicRequests().add(topicRequest);
        userService.save(tutor);
        return topicRequest;
    }

    @GetMapping("/requests")
    public List<TopicRequest> getTopicRequestList(){
        return topicService.getTopicRequestList();
    }

    class RequestTopic {
        private String idTopic;
    }

}
