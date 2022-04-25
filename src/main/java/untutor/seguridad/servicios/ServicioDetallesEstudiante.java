package untutor.seguridad.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import untutor.domain.user.Student;
import untutor.repositorios.RepoEstudiante;
@Service
public class ServicioDetallesEstudiante implements UserDetailsService {
	@Autowired
	RepoEstudiante repoEstudiante;
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Student user = repoEstudiante.findByCorreo(username)
				.orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado, con el correo: " + username));
		return DetallesEstudiante.build(user);
	}
}