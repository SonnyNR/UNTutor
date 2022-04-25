package untutor.seguridad.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import untutor.domain.user.Tutor;
import untutor.repositorios.RepoTutor;
@Service
public class ServicioDetallesTutor implements UserDetailsService {
	@Autowired
	RepoTutor repoTutor;
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Tutor user = repoTutor.findByCorreo(username)
				.orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado, con el correo: " + username));
		return DetallesTutor.build(user);
	}
}