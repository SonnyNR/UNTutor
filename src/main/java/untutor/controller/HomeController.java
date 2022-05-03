package untutor.controller;
import untutor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(path = "api")
@CrossOrigin("*")
public class HomeController {

    private UserService userService;

    @Autowired
    public HomeController(UserService userService) {
        this.userService     = userService;
    }

    @GetMapping("/role")
    public String home(Principal principal)
    {
        String role = null;
        if (principal != null)
            role = userService.getRoleUser(principal.getName());

        return role;
    }

}
