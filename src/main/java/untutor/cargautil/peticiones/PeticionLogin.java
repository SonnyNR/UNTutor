package untutor.cargautil.peticiones;


import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class PeticionLogin {
	@NotBlank
    private String correo;

	@NotBlank
	private String clave;
}
