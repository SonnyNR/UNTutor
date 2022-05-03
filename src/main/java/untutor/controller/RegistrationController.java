package untutor.controller;

import untutor.domain.form.RegistrationStudentForm;
import untutor.domain.form.RegistrationTutorForm;
import untutor.domain.user.User;
import untutor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/register")
@CrossOrigin("*")
public class RegistrationController {

    private UserService userService;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public RegistrationController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService     = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(path = "/student", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public User processRegistrationStudent(@RequestBody RegistrationStudentForm registrationStudentForm) {
        return userService.save(registrationStudentForm.toStudent(passwordEncoder));
    }

    @PostMapping(path = "/tutor", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public User processRegistrationTutor(@RequestBody RegistrationTutorForm registrationTutorForm) {
        return userService.save(registrationTutorForm.toTutor(passwordEncoder));
    }
}
