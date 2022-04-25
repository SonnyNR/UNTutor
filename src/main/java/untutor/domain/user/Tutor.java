package untutor.domain.user;

import lombok.Data;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Data
@Entity
@Table(name = "tutors",
     uniqueConstraints = @UniqueConstraint(columnNames = { "correo", "cedula" }))
public class Tutor {

       /*-cedula						string
-correo							string
-nombre						string
-contraseña					string
-TOKEN						string
 */ 
@Id
private String correo;
private String cedula;
private String nombre;
private String clave;

@ManyToMany(fetch = FetchType.LAZY)
@JoinTable(  name = "tutor_roles", 
      joinColumns = @JoinColumn(name = "tutor_id"), 
      inverseJoinColumns = @JoinColumn(name = "role_id"))
private Set<Role> roles = new HashSet<>();
public Tutor() {
}

public Tutor( String correo, String nombre,String cedula, String clave) {
    this.cedula = cedula;
    this.correo = correo;
    this.nombre = nombre;
    this.clave = clave;
}
}
