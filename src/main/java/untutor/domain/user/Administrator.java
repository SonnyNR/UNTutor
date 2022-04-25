package untutor.domain.user;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Administrator{

    @Id
    private String name;
    private String clave;
    private String token;

    public Administrator() {
    }

    public Administrator(String name, String clave, String token) {
        this.name = name;
        this.clave = clave;
        this.token = token;
    }

}
