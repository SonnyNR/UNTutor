import React, {Component} from "react";
import TopicService from "../../services/topic.service";

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createAt: "",
            messages: [],
            chat: false,
        }

        this.setChat         = this.setChat.bind(this);
        this.handleClick     = this.handleClick.bind(this);
        this.handleClickChat = this.handleClickChat.bind(this);
    }

    handleClickChat(event) {
        this.setState({
           chat: !this.state.chat,
        });

        event.preventDefault();
    }

    async handleClick(event, message) {
        let res = await TopicService.sendMessage(this.props.topicRId, message);
        this.setState({
            chat: !this.state.chat,
        });
        this.props.handleSendMessage();
        console.log(this.state.messages);
        event.preventDefault();
    }

    setChat(createAt, messages) {
        this.setState({
           createAt,
           messages,
        });
    }

    render() {
        let numMessages = this.state.messages.length;

        return (
            <div>
                {!this.state.chat
                    ? <div>
                        <span onClick={this.handleClickChat}>Mensajes ({numMessages})</span>
                      </div>
                    : <div>
                        <ListMessages messages={this.state.messages}/>
                        <SendMessage handleClick={this.handleClick}/>
                      </div>
                }
            </div>

        );
    }

    componentDidMount() {

        this.setChat(this.props.chat.date, this.props.chat.messages);
    }

}

function ListMessages({messages}) {
    return (
        <div>
            {messages.map(item =>
                <div>
                    <strong>{item.from_}</strong>:
                    <span> </span>
                    <span>{item.content}</span>
                </div>
            )}
        </div>
    );
}

class SendMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        let message = event.target.value;
        this.setState({
           message,
        });
    }

    render() {
        return (
            <div>
                <textarea onChange={this.handleInputChange} value={this.state.message}/>
                <br />
                <button onClick={e => this.props.handleClick(e, this.state.message)}>Enviar</button>
            </div>
        );
    }
}

export default Chat;