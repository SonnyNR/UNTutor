package untutor.domain.form;

import untutor.domain.user.Tutor;
import org.springframework.security.crypto.password.PasswordEncoder;

public class RegistrationTutorForm extends RegistrationUserForm {

    public Tutor toTutor(PasswordEncoder encoder)
    {
        Tutor tutor =  new Tutor
                (getName(), getPhone(), getEmail(), encoder.encode(getPassword()));

        return tutor;
    }

}
