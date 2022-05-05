package untutor.domain.form;

import untutor.domain.user.Student;
import org.springframework.security.crypto.password.PasswordEncoder;

public class RegistrationStudentForm extends RegistrationUserForm {

    public Student toStudent(PasswordEncoder encoder)
    {
        Student student =  new Student
                (getEmail(), getName(), encoder.encode(getPassword()));

        return student;
    }

}
