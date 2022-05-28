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
    public TopicRequest acceptRequest(@PathVariable("id") Long id, Principal principal) {
       return topicService.acceptTopicRequest(principal.getName(), id);
    }

    @GetMapping("/requests")
    public List<TopicRequest> getTopicRequestList(Principal principal){
        String role = userService.getRoleUser(principal.getName());
        System.out.println(role);
        if(role.equals("administrator")) {
            return topicService.getTopicRequestList();
        } else if(role.equals("tutor"))
            return topicService.getTutorTopicRequestList(principal.getName());
        return null;
    }

    class RequestTopic {
        private String idTopic;
    }
}
