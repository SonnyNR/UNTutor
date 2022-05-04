package untutor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import untutor.domain.form.RegistrationAdministratorForm;
import untutor.domain.user.Administrator;
import untutor.domain.user.Tutor;
import untutor.domain.user.User;
import untutor.service.UserService;

import java.security.Principal;

@RestController
@CrossOrigin("*")
@RequestMapping("api/administrator")
public class AdministratorController {

    private UserService userService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AdministratorController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public Administrator profile(Principal principal) {

        return (Administrator) userService.findByEmail(principal.getName());

    }

    @PostMapping(path = "/register", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public User processRegistrationAdministrator(@RequestBody RegistrationAdministratorForm registrationAdministratorForm) {
        return userService.save(registrationAdministratorForm.toAdministrator(passwordEncoder));
    }
}