package untutor.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/verify_login/")
public class LoginController {

    @GetMapping("/success")
    public Boolean login(){
        return true;
    }

    @GetMapping("/err")
    public Boolean loginerr(){
        return false;
    }
}
