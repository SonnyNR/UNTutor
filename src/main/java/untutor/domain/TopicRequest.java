package untutor.domain;


import lombok.Data;
import untutor.domain.chat.Chat;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class TopicRequest {


    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @ManyToOne(targetEntity = Topic.class)
    private Topic topic;

    private String tutorName;
    private String tutorEmail;

    private Date date;

    @OneToOne
    private Chat chat;

    @Enumerated(EnumType.STRING)
    private Status status;

    @PrePersist
    void placedAt() {
        this.date = new Date();
    }


    public TopicRequest() {

    }

    public TopicRequest(String tutorName, String tutorEmail, Topic topic, Chat chat) {
        this.tutorName  = tutorName;
        this.tutorEmail = tutorEmail;
        this.topic      = topic;
        this.chat       = chat;
        this.status     = Status.INPROCESS;
    }

    public enum Status {
        INPROCESS, ACCEPTED, DECLINED,
    }
}
