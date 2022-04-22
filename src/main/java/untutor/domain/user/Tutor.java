package untutor.domain.user;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.Entity;
import java.util.Arrays;
import java.util.Collection;

@Data
@Entity
public class Tutor extends User {

    public Tutor() {
    }

    public Tutor(String name, String address, String city, String phone, String email, String password) {
        super(name, address, city, phone, email, password);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_TUTOR"));
    }

}
