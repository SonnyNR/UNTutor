package untutor.seguridad.servicios;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import untutor.domain.user.Student;

import com.fasterxml.jackson.annotation.JsonIgnore;


public class DetallesEstudiante implements UserDetails{
    private static final long serialVersionUID = 1L;
	private String cedula;
	private String nombre;
	private String correo;
	@JsonIgnore
	private String clave;
	private Collection<? extends GrantedAuthority> autorizacion;

	public DetallesEstudiante(String id, String username, String email, String password,
	Collection<? extends GrantedAuthority> authorities) {
		this.cedula = id;
		this.nombre = username;
		this.correo = email;
		this.clave = password;
		this.autorizacion = authorities;
	}


	public static DetallesEstudiante build(Student student) {
		List<GrantedAuthority> authorities = student.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

		return new DetallesEstudiante(
				student.getCedula(), 
				student.getNombre(), 
				student.getCorreo(),
				student.getClave(), 
				authorities);
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return autorizacion;
	}
	public String getId() {
		return cedula;
	}
	public String getEmail() {
		return correo;
	}
	@Override
	public String getPassword() {
		return clave;
	}
	@Override
	public String getUsername() {
		return nombre;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
            DetallesEstudiante user = (DetallesEstudiante) o;
		return Objects.equals(correo, user.correo);
	}
    
}
