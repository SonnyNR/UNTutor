package untutor.domain.user;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.Entity;
import java.util.Arrays;
import java.util.Collection;

@Data
@Entity
public class Administrator extends User {

    public Administrator() {
    }

    public Administrator(String name, String document, String email, String password, String token) {
        super(name, document, email, password, token);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMINISTRATOR"));
    }

}
