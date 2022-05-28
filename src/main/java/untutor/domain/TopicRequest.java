package untutor.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import untutor.domain.Topic;
import untutor.domain.user.Tutor;

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

    @Enumerated(EnumType.STRING)
    private Status status;

    @PrePersist
    void placedAt() {
        this.date = new Date();
    }


    public TopicRequest() {

    }

    public TopicRequest(String tutorName, String tutorEmail, Topic topic) {
        this.tutorName  = tutorName;
        this.tutorEmail = tutorEmail;
        this.topic      = topic;
        this.status     = Status.INPROCESS;
    }

    public enum Status {
        INPROCESS, ACCEPTED, DECLINED,
    }
}
