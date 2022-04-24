package untutor.domain.form;

import lombok.Data;

@Data
public class RegistrationUserForm {

    private String name;
    private String document;
    private String email;
    private String password;
    private String token;

}