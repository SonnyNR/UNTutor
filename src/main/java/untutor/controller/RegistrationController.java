package untutor.controller;

import untutor.domain.form.RegistrationUserForm;
import untutor.domain.user.User;
import untutor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/register")
@CrossOrigin(origins="*")
public class RegistrationController {

    private UserService userService;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public RegistrationController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService     = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public User processRegistrationUser(@RequestBody RegistrationUserForm registrationUserForm) {
        return userService.save(registrationUserForm.toUser(passwordEncoder));
    }
}
