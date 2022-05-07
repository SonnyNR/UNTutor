package untutor.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import untutor.domain.form.RegistrationStudentForm;
import untutor.domain.user.Student;
import untutor.domain.user.User;
import untutor.service.UserService;

import java.security.Principal;
import java.util.HashMap;

@RestController
@CrossOrigin("*")
@RequestMapping("api/student")
public class StudentController {

    private UserService     userService;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public StudentController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public Student profile(Principal principal) {

        return (Student) userService.findByEmail(principal.getName());

    }

    @PostMapping(path = "/register", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public User processRegistrationStudent(@RequestBody RegistrationStudentForm registrationStudentForm) {
        return userService.save(registrationStudentForm.toStudent(passwordEncoder));
    }

}