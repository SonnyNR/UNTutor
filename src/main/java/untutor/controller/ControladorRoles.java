package untutor.controller;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/home")
public class ControladorRoles {
	@GetMapping("/all")
	public String accesoPublico() {
		return "Public Content.";
	}
	@GetMapping("/estudiante")
	@PreAuthorize("hasRole('ESTUDIANTE')")
	public String accesoEstudiante() {
		return "User Content.";
	}
    @GetMapping("/tutor")
	@PreAuthorize("hasRole('TUTOR')")
	public String accesoTutor() {
		return "Tutor Board.";
	}
	@GetMapping("/mentor")
	@PreAuthorize("hasRole('MENTOR')")
	public String accesoMentor() {
		return "Mentor Board.";
	}
	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String accesoAdmin() {
		return "Admin Board.";
	}
}
