package untutor.domain.user;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;

@Data
@Entity
public class User implements UserDetails
{
    private String name;
    private String phone;
    private String role;

    @Id
    private String email;
    private String password;

    public User() {

    }

    public User(String role, String name, String phone, String email, String password) {
        this.role     = role;
        this.name     = name;
        this.email    = email;
        this.password = password;
        this.phone    = phone;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }

}