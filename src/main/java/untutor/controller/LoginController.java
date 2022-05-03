package untutor.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
