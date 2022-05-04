package untutor.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private KnowledgeArea knowledgeArea;

    public Topic() {

    }

    public enum KnowledgeArea {
        MATH, SCIENCE, HISTORY, ART
    }




}
