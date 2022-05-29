package untutor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import untutor.domain.Topic;
import untutor.domain.TopicRequest;
import untutor.domain.form.RegistrationTutorForm;
import untutor.domain.user.Tutor;
import untutor.domain.user.User;
import untutor.service.TutorService;
import untutor.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/tutor")
public class TutorController {

    private UserService     userService;
    private TutorService    tutorService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public TutorController(UserService userService, TutorService tutorService, PasswordEncoder passwordEncoder) {
        this.userService     = userService;
        this.tutorService    = tutorService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/requests")
    public List<TopicRequest> getTutorTopicRequestAll(Principal principal){
        return tutorService.getTutorTopicRequestAll(principal.getName());
    }

    @GetMapping("/topics")
    public List<Topic> getTutorTopics(Principal principal){
        return tutorService.getTutorTopics(principal.getName());
    }

    @GetMapping("/topic/{id}")
    public List<Tutor> getTutorsByTopic(@PathVariable("id") Long topicId, Principal principal) {
        return tutorService.getTutorsByTopic(topicId);
    }

    @GetMapping
    public Tutor profile(Principal principal) {

        return (Tutor) userService.findByEmail(principal.getName());
    }

    @PostMapping(path = "/register", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public User processRegistrationTutor(@RequestBody RegistrationTutorForm registrationTutorForm) {
        return userService.save(registrationTutorForm.toTutor(passwordEncoder));
    }
}