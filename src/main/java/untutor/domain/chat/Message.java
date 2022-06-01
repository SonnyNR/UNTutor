package untutor.domain.chat;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Message {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    private String from_;
    private String content;

    private Date date;

    public Message() {

    }

    public Message(String from_, String content) {
        this.from_    = from_;
        this.content = content;
    }

    @PrePersist
    void placedAt() {
        this.date = new Date();
    }


}
