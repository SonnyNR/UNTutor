import React, {Component} from "react";
import TopicService from "../../services/topic.service"
import Chat from "../components/Chat";


export default class TopicRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
        }

        this.setTopicRequestList = this.setTopicRequestList.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    handleSendMessage() {
        TopicService.getTopicRequestAll(this.setTopicRequestList);
    }



        onButtonClick = (event, id) => {
        const name = event.target.name;
        if(name == 'accept') {
            TopicService.acceptTopic(id);
        } else if(name == 'decline') {
            TopicService.declineTopic(id);
        }

        TopicService.getTopicRequestAll(this.setTopicRequestList);
        event.preventDefault();

    }

    setTopicRequestList(list) {
        this.setState({
            list,
        });
    }

    render() {
        return (
            <div>
                <TopicRequestList
                    handleSendMessage={this.handleSendMessage}
                    topicRequestList={this.state.list}
                    onButtonClick={this.onButtonClick} />

            </div>

        );
    }

    componentDidMount() {
        TopicService.getTopicRequestAll(this.setTopicRequestList);
    }
}

const TopicRequestList = function({handleSendMessage, topicRequestList, onButtonClick}) {

    return (
        <div>
            <h3>Solicitudes tematicas</h3>
            <ul>
                {topicRequestList.map(item =>
                    <li>
                        {item.date.slice(0, item.date.indexOf("T"))}
                        <span> </span>
                        {item.status}
                        <span> </span>
                        {item.topic.name}
                        <span> </span>
                        <strong>Nombre:</strong> {item.tutorName}
                        <span> </span>
                        <Chat
                            handleSendMessage={handleSendMessage}
                            topicRId={item.id}
                            chat={item.chat}/>
                        <br/>

                        {item.status == 'DECLINED' && <button onClick={e => onButtonClick(e, item.id)} name="accept">Aceptar</button>}
                        {item.status == 'ACCEPTED' && <button onClick={e => onButtonClick(e, item.id)} name="decline">Rechazar</button>}
                        {item.status == 'INPROCESS' && <button onClick={e => onButtonClick(e, item.id)} name="accept">Aceptar</button>}
                        {item.status == 'INPROCESS' && <button onClick={e => onButtonClick(e, item.id)} name="decline">Rechazar</button>}

                    </li>
                )}
            </ul>
        </div>
    );
}