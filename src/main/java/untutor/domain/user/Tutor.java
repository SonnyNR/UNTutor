package untutor.domain.user;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import untutor.domain.Topic;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Data
@Entity
public class Tutor extends User {

    /*
    @ManyToMany
    private List<Topic> topics;
    @ManyToOne
    private List<TopicRequest> topicRequests;
    */

    public Tutor() {
    }

    public Tutor(String name, String phone, String email, String password) {
        super(name, phone, email, password);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_TUTOR"));
    }

}
