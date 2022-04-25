package untutor.domain.user;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
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
private String token;

public Tutor() {
}

public Tutor(String cedula, String correo, String nombre, String clave, String token) {
    this.cedula = cedula;
    this.correo = correo;
    this.nombre = nombre;
    this.clave = clave;
    this.token = token;
}
}
