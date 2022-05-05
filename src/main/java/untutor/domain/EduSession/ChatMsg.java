package untutor.domain.EduSession;

import java.util.Date;

import lombok.Data;


@Data
public class ChatMsg {
    private String content;
    private Date sentDate;
    private String sender;
    
}
