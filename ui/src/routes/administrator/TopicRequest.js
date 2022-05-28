import React, {Component} from "react";
import TopicService from "../../services/topic.service"


export default class TopicRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
        }

        this.setTopicRequestList = this.setTopicRequestList.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick = (event, id) => {
        const name = event.target.name;
        if(name == 'accept') {
            TopicService.acceptTopic(id);
        } else if(name == 'decline') {
            TopicService.declineTopic(id);
        }

        TopicService.getTopicRequestAllAdmin(this.setTopicRequestList);
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
                    topicRequestList={this.state.list}
                    onButtonClick={this.onButtonClick} />

            </div>

        );
    }

    componentDidMount() {
        TopicService.getTopicRequestAllAdmin(this.setTopicRequestList);
    }
}

const TopicRequestList = function({topicRequestList, onButtonClick}) {

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

                        <br/>

                        {item.status == 'DECLINED' && <button onClick={e => onButtonClick(e, item.id)} name="accept">Aceptar</button>}
                        {item.status == 'ACCEPTED' && <button onClick={e => onButtonClick(e, item.id)} name="decline">Rechazar</button>}
                        {item.status == 'INPROCESS' && <button onClick={e => onButtonClick(e, item.id)} name="accept">Aceptar</button>}
                        {item.status == 'INPROCESS' && <button onClick={e => onButtonClick(e, item.id)} name="decline">Rechazar</button>}

                        <button onClick={e => onButtonClick(e)} name="send_m">Enviar mensaje</button>

                    </li>
                )}
            </ul>
        </div>
    );
}