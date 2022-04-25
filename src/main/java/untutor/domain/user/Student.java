package untutor.domain.user;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Student{

    /*
     * crea los siguientes campos:
     * -correo string
     * -cedula string
     * -nombre string
     * -contraseña string
     * -TOKEN string
     */

    @Id
    private String correo;
    private String cedula;
    private String nombre;
    private String clave;
    private String token;

    public Student() {
    }

    public Student(String correo,
            String cedula, String nombre,
            String pass) {
        this.correo = correo;
        this.cedula = cedula;
        this.nombre = nombre;
        this.clave = pass;
    }

}
