package untutor.domain.user;

import lombok.Data;
import untutor.domain.Topic;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class TopicRequest {

    public TopicRequest() {

    }

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @ManyToOne(targetEntity = Topic.class)
    private Topic topic;

    @ManyToOne(targetEntity = Tutor.class)
    private Tutor tutor;

    private Date date;

    @PrePersist
    void placedAt() {
        this.date = new Date();
    }
}
