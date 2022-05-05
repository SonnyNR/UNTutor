package untutor.domain.form;

import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import untutor.domain.user.User;

@Data
public class RegistrationUserForm {

    private String name;
    private String email;
    private String password;

    public User toUser(PasswordEncoder encoder)
    {
        User user =  new User
                ( getEmail(), getName(), encoder.encode(getPassword()));

        return user;
    }

}