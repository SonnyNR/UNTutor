package untutor.seguridad.servicios;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import untutor.domain.user.Tutor;

import com.fasterxml.jackson.annotation.JsonIgnore;


public class DetallesTutor implements UserDetails{
    private static final long serialVersionUID = 1L;
	private String cedula;
	private String nombre;
	private String correo;
	@JsonIgnore
	private String clave;
	private Collection<? extends GrantedAuthority> authorities;

	public DetallesTutor(String id, String username, String email, String password,
    Collection<? extends GrantedAuthority> authorities) {
		this.cedula = id;
		this.nombre = username;
		this.correo = email;
		this.clave = password;
		this.authorities = authorities;
	}


	public static DetallesTutor build(Tutor tutor) {
		List<GrantedAuthority> autoridad = tutor.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

		return new DetallesTutor(
            tutor.getCedula(), 
            tutor.getNombre(), 
            tutor.getCorreo(),
            tutor.getClave(), 
				autoridad);
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
        return authorities;
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
            DetallesTutor user = (DetallesTutor) o;
		return Objects.equals(correo, user.correo);
	}
    
}
