import React, {Component} from "react";
import TopicService from "../../services/topic.service"
import TutorService from "../../services/tutor.service"
import Chat from "../components/Chat";
import "./Tutor.css";


export default class Topic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicList: [],
            passTopicList: [],
            topicRequestList: [],
            request: false,
        }

        this.handleClickTopicRequest  = this.handleClickTopicRequest.bind(this);
        this.handleSubmitTopicRequest = this.handleSubmitTopicRequest.bind(this);
        this.handleSendMessage        = this.handleSendMessage.bind(this);
        this.setTopics                = this.setTopics.bind(this);
        this.setTopicRequests         = this.setTopicRequests.bind(this);
        this.setPassTopicList         = this.setPassTopicList.bind(this);
    }

    async handleSendMessage() {
        await TutorService.getTutorTopicRequestAll(this.setTopicRequests)
    }

    setPassTopicList(passTopicList) {
        this.setState({
           passTopicList,
        });
    }

    setTopicRequests(topicRequests) {
        console.log(topicRequests);
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
            request: !this.state.request,
        });

        TutorService.getTutorTopicRequestAll(this.setTopicRequests)
    }

    render() {
        return (
            <div>
                <h3>Temáticas aprobadas</h3>
                {!this.state.request
                    ? <PassTopic passTopicList={this.state.passTopicList}
                                 handleClickTopicRequest={this.handleClickTopicRequest}/>
                    : <FormTopicRequest
                        handleSubmitTopicRequest={this.handleSubmitTopicRequest}
                        topicList={this.state.topicList}/>
                }
                <TopicRequestList
                    handleSendMessage={this.handleSendMessage}
                    topicRequestList={this.state.topicRequestList}/>

            </div>
        );
    }

    componentDidMount() {

        TutorService.getTutorTopicRequestAll(this.setTopicRequests)
        TutorService.getTutorTopicAll(this.setPassTopicList);
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
                <PassTopicList list={this.props.passTopicList}/>
                <button onClick={e => this.props.handleClickTopicRequest(e)} className="soli-btn"> Solicitar tematica</button>
            </div>
        );
    }
}

const PassTopicList = function ({list}) {

    return (
        <div>
            <ul>
                {list.map(item =>
                    <li>
                        {item.name}
                    </li>
                )}
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

    async handleSubmit(event) {
        await TopicService.sendTopicRequest(this.state.idTopic);
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

const TopicRequestList = function ({handleSendMessage, topicRequestList}) {
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
                        <span> </span>
                        <Chat
                            handleSendMessage={handleSendMessage}
                            topicRId={item.id}
                            chat={item.chat}/>
                    </li>
                )}
            </ul>

        </div>
    );
}


