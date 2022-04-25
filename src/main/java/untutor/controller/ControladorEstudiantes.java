package untutor.controller;

import untutor.domain.user.Student;
import untutor.repository.RepoEstudiante;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/estud")
public class ControladorEstudiantes {
  @Autowired
  private RepoEstudiante repoEstudiante;

  @PostMapping(path = "/addEstud")
  public @ResponseBody String agregarEstudiante(@RequestParam String correo,
      @RequestParam String cedula, @RequestParam String nombre, @RequestParam String clave) {

        Student nuevoEstudiante = new Student(correo, cedula, nombre, clave);

    repoEstudiante.save(nuevoEstudiante);
    return "estudiante agregado satisfactoriamente";

  }

  @GetMapping(path = "/all_estud")
  public @ResponseBody Iterable<Student> getAllEstudiantes() {
    // devuelve un listado con todos los estudiantes
    return repoEstudiante.findAll();
  }
}