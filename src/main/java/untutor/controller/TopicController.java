package untutor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import untutor.domain.Topic;
import untutor.domain.TopicRequest;
import untutor.service.TopicService;
import untutor.service.UserService;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path="/api/topic", produces = "application/json")
public class TopicController {


    private TopicService topicService;
    private UserService  userService;

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
        return topicService.createTopicRequest(principal.getName(), id);
    }

    @PostMapping("request/accept/{id}")
    public TopicRequest acceptRequest(@PathVariable("id") Long id) {
       return topicService.acceptTopicRequest(id);
    }

    @PostMapping("request/decline/{id}")
    public TopicRequest declineRequest(@PathVariable("id") Long id) {
        return topicService.declineTopicRequest(id);
    }

    @GetMapping("/requests/admin")
    public List<TopicRequest> getTopicRequestAllAdmin(){
        return topicService.getTopicRequestList();
    }

    @GetMapping("/requests/tutor")
    public List<TopicRequest> getTopicRequestAllTutor(Principal principal){
        return topicService.getTopicRequestsAllTutor(principal.getName());
    }

}
