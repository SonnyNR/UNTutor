package untutor.controller;

import untutor.cargautil.peticiones.PeticionLogin;
import untutor.cargautil.peticiones.PeticionRegistro;
import untutor.cargautil.respuestas.RespuestaJWT;
import untutor.cargautil.respuestas.RespuestaTexto;
import untutor.domain.user.ERole;
import untutor.domain.user.Role;
import untutor.domain.user.Student;
import untutor.domain.user.Tutor;
import untutor.repositorios.RepoEstudiante;
import untutor.repositorios.RepoRoles;
import untutor.repositorios.RepoTutor;
import untutor.seguridad.jwt.JwtUtils;
import untutor.seguridad.servicios.DetallesEstudiante;
import untutor.seguridad.servicios.DetallesTutor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
@CrossOrigin(origins = "*")
public class ControladorLogin {
  @Autowired
  AuthenticationManager authenticationManager;
  @Autowired
  RepoEstudiante repoEstudiantes;
  @Autowired
  RepoTutor repoTutores;
  @Autowired
  RepoRoles roleRepository;
  @Autowired
  PasswordEncoder encoder;
  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/login")
  public ResponseEntity<?> autenticarUsuario(@Valid @RequestBody PeticionLogin cuerpoPeticion) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(cuerpoPeticion.getCorreo(), cuerpoPeticion.getClave()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    DetallesTutor tutDetails = (DetallesTutor) authentication.getPrincipal();
    DetallesEstudiante estudDetails = (DetallesEstudiante) authentication.getPrincipal();

    List<String> roles = tutDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new RespuestaJWT(jwt,
        tutDetails.getUsername(),
        tutDetails.getEmail(),
        roles));
  }

  @PostMapping("/registro")
  public ResponseEntity<?> registerUser(@Valid @RequestBody PeticionRegistro peticionRegistro) {
    if (repoEstudiantes.existsByCorreo(peticionRegistro.getCorreo())) {
      return ResponseEntity
          .badRequest()
          .body(new RespuestaTexto("El correo ya ha sido tomado por un estudiante"));
    }

    if (repoTutores.existsByCorreo(peticionRegistro.getCorreo())) {
      return ResponseEntity
          .badRequest()
          .body(new RespuestaTexto("El correo ya ha sido tomado por un tutor"));
    }

    Set<String> rolesEnPeticion = peticionRegistro.getRole();
    Set<Role> rolesAguardar = new HashSet<>();

    if (rolesEnPeticion == null) {
      Role rolEstudiante = roleRepository.findByName(ERole.ROLE_ESTUDIANTE)
          .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));

      rolesAguardar.add(rolEstudiante);
    } else {
      rolesEnPeticion.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            rolesAguardar.add(adminRole);

            break;
          case "tutor":
            Role tutRole = roleRepository.findByName(ERole.ROLE_TUTOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            rolesAguardar.add(tutRole);

            break;
          default:
            Role userRole = roleRepository.findByName(ERole.ROLE_ESTUDIANTE)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            rolesAguardar.add(userRole);
        }
      });
    }

    
    if (rolesAguardar.contains(roleRepository.findByName(ERole.ROLE_TUTOR))) {
      Tutor t = new Tutor(peticionRegistro.getCorreo(),
          peticionRegistro.getNombre(),
          peticionRegistro.getCedula(),
          encoder.encode(peticionRegistro.getClave()));

      t.setRoles(rolesAguardar);
      repoTutores.save(t);
      return ResponseEntity.ok(new RespuestaTexto("Tutor registered successfully!"));
    } else {
      Student s = new Student(peticionRegistro.getCorreo(),
          peticionRegistro.getNombre(),
          peticionRegistro.getCedula(),
          encoder.encode(peticionRegistro.getClave()));
      s.setRoles(rolesAguardar);
      repoEstudiantes.save(s);
      return ResponseEntity.ok(new RespuestaTexto("Estudiante registered successfully!"));
    }
  }
}