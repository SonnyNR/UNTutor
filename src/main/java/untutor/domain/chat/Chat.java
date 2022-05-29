package untutor.domain.chat;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Chat {


    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @OneToMany
    private List<Message> messages;

    private Date date;

    public Chat() {

    }

    @PrePersist
    void placedAt() {
        this.date = new Date();
    }
}
