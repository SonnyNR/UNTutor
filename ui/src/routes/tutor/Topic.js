import React, {Component} from "react";
import TopicService from "../../services/topic.service"
import AuthService from "../../services/auth.service"


export default class Topic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicList: [],
            passTopicList: [],
            topicRequestList: [],
            request: false,
        }

        this.handleClickTopicRequest = this.handleClickTopicRequest.bind(this);
        this.handleSubmitTopicRequest = this.handleSubmitTopicRequest.bind(this);
        this.setTopics = this.setTopics.bind(this);
        this.setTopicRequests = this.setTopicRequests.bind(this);
    }

    setTopicRequests(topicRequests) {
        this.setState({
            topicRequestList: topicRequests,
        });
    }

    setTopics(topics) {
        localStorage.setItem("topicList", topics);
        this.setState({
            topicList: topics,
        });
    }

    handleClickTopicRequest(event) {

        this.setState({
           request: !this.state.request
        });

        event.preventDefault();

    }

    handleSubmitTopicRequest() {

        this.setState({
            request: !this.state.request
        });

        TopicService.getTopicRequestList(this.setTopicRequests);
    }

    render() {
        console.log(this.state.topicRequestList)
        return (
            <div>
                <h3>Temáticas aprobadas</h3>
                {!this.state.request
                    ? <PassTopic handleClickTopicRequest={this.handleClickTopicRequest}/>
                    : <FormTopicRequest
                        handleSubmitTopicRequest={this.handleSubmitTopicRequest}
                        topicList={this.state.topicList}/>
                }
                <TopicRequestList topicRequestList={this.state.topicRequestList}/>

            </div>
        );
    }

    componentDidMount() {

        this.setTopicRequests(AuthService.getCurrentUser().topicRequests);
        TopicService.getTopicList(this.setTopics);


    }
}

class PassTopic extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                Aqui va la lista de tematicas aprobadas
                <PassTopicList />
                <button onClick={e => this.props.handleClickTopicRequest(e)}> Solicitar tematica</button>
            </div>
        );
    }
}

const PassTopicList = function ({list}) {

    return (
        <div>
            <ul>
                {/*Listar usando <li></li> con map*/}
            </ul>
        </div>
    );

}


class FormTopicRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            idTopic: null,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    handleSubmit(event) {

        window.client.sendTopicRequest(this.state.idTopic);
        this.props.handleSubmitTopicRequest();
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="topic">Tematica: </label>
                <select name="idTopic" onChange={e => this.handleInputChange(e)}>
                    {this.props.topicList.map(item =>
                        <option value={item.id}>{item.knowledgeArea + ': ' + item.name}</option>
                    )}
                </select>
                <br/>
                <br/>
                <input type="submit" value="Enviar"/>
            </form>
        );
    }
}

const TopicRequestList = function ({topicRequestList}) {
    return (
        <div>
            <h3>Solicitudes temáticas</h3>
            <ul>
                {topicRequestList.map(item =>
                    <li>
                        {item.date.slice(0, item.date.indexOf("T"))}
                        <span> </span>
                        {item.status}
                        <span> </span>
                        {item.topic.name}
                    </li>
                )}
            </ul>

        </div>
    );
}


