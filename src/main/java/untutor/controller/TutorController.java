package untutor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import untutor.domain.form.RegistrationTutorForm;
import untutor.domain.user.Tutor;
import untutor.domain.user.User;
import untutor.service.UserService;

import java.security.Principal;

@RestController
@CrossOrigin("*")
@RequestMapping("api/tutor")
public class TutorController {

    private UserService     userService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public TutorController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
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