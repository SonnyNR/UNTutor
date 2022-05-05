package untutor.domain.form;

import untutor.domain.user.Administrator;
import org.springframework.security.crypto.password.PasswordEncoder;

public class RegistrationAdministratorForm extends RegistrationUserForm {

    public Administrator toAdministrator(PasswordEncoder encoder)
    {
        Administrator administrator =  new Administrator
                (getEmail(), getName(),   encoder.encode(getPassword()));

        return administrator;
    }

}
