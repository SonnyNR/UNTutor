package untutor.websocket;

import lombok.Data;

@Data
public class SignalData {
    private String userId,type,data,toUid;
}
