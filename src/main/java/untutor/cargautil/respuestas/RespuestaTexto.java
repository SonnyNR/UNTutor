package untutor.cargautil.respuestas;

import lombok.Data;

@Data
public class RespuestaTexto {
    private String message;
  
    public RespuestaTexto(String message) {
      this.message = message;
    }
  }
