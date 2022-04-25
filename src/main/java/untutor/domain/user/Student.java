package untutor.domain.user;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Data
@Entity
@Table(name = "students", uniqueConstraints = @UniqueConstraint(columnNames = { "correo", "cedula" }))
public class Student {

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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public Student() {
    }

    public Student(String correo,
            String nombre, String cedula,
            String clave) {
        this.correo = correo;
        this.cedula = cedula;
        this.nombre = nombre;
        this.clave = clave;
    }

}
