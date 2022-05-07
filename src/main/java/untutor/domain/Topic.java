package untutor.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    @Enumerated(EnumType.STRING)
    private KnowledgeArea knowledgeArea;

    public Topic() {

    }

    public enum KnowledgeArea {
        MATH, SCIENCE, HISTORY, ART
    }

}
