package untutor.domain.form;

import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import untutor.domain.user.User;

@Data
public class RegistrationUserForm {

    private String name;
    private String document;
    private String email;
    private String password;
    private String phone;

    public User toUser(PasswordEncoder encoder)
    {
        User user =  new User
                (getName(), getPhone(), getEmail(), encoder.encode(getPassword()));

        return user;
    }

}