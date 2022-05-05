package untutor.domain.EduSession;

import lombok.Data;
import untutor.domain.user.Student;
import untutor.domain.user.Tutor;

import java.util.ArrayList;
import java.util.Date;

@Data
public class EduSession {
    private Student educando;
    private Tutor tutor;
    private String id;
    private Date startingTime;
    private Date endingTime;
    private ArrayList<ChatMsg> chatHistory;
}
