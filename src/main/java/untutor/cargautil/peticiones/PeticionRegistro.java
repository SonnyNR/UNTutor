package untutor.cargautil.peticiones;

import java.util.Set;

import javax.validation.constraints.*;

import lombok.Data;

@Data
public class PeticionRegistro {

    @NotBlank
    @Email
    private String correo;

    @NotBlank
    private String nombre;
    private String cedula;
    private Set<String> role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String clave;
}
