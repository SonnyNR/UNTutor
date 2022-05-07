package untutor.controller;
import untutor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "api")
@CrossOrigin("*")
public class HomeController {

    private UserService userService;

    @Autowired
    public HomeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/account")
    public Map<String, Object> home(Principal principal) {
        Map<String, Object> map = new HashMap<>();

        if (principal != null) {
            map.put("role", userService.getRoleUser(principal.getName()));
            map.put("user", userService.findByEmail(principal.getName()));
        }

        return map;
    }

    @GetMapping("/role")
    public String role(Principal principal) {
        return userService.getRoleUser(principal.getName());
    }

}
