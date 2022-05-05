package untutor.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Topic {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private KnowledgeArea knowledgeArea;

    public Topic() {

    }

    
    public enum KnowledgeArea {
        MATH, HISTORY, ENGLISH, GEOGRAPHY, LITERATURE, PHYSICS, CHEMISTRY, BIOLOGY
    }




}
