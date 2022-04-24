package untutor.domain.form;

import untutor.domain.user.Tutor;
import org.springframework.security.crypto.password.PasswordEncoder;

public class RegistrationTutorForm extends RegistrationUserForm {

    public Tutor toTutor(PasswordEncoder encoder)
    {
        Tutor tutor =  new Tutor
                (getName(), getDocument(), getEmail(), encoder.encode(getPassword()), getToken());

        return tutor;
    }

}
