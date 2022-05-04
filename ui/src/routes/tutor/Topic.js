import React, {Component} from "react";

export default class Topic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicList: null,
            passTopicList: null,
            request: false,
        }

        this.handleClickTopicRequest = this.handleClickTopicRequest.bind(this);
        this.handleSubmitTopicRequest = this.handleSubmitTopicRequest.bind(this);
    }

    handleClickTopicRequest(event) {

        this.setState({
           request: !this.state.request
        });

        event.preventDefault();

    }

    handleSubmitTopicRequest(event) {

        this.setState({
            request: !this.state.request
        });

        console.log('Solicitud hecha');
        event.preventDefault();

        // client.topicRequest(); info tutor y tematica

    }

    render() {
        return (
            <div>
                <h3>Temáticas aprobadas</h3>
                {!this.state.request
                    ? <PassTopic handleClickTopicRequest={this.handleClickTopicRequest}/>
                    : <FormTopicRequest handleSubmitTopicRequest={this.handleSubmitTopicRequest}/>
                }
            </div>
        );
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
            topic: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmitTopicRequest}>
                <label htmlFor="topic">Tematica: </label>
                <select name="topic" onChange={this.handleInputChange}>
                    {/*listar tematicas con option*/}
                    {/*<option value="tutor">Tutor</option>*/}
                    <option value="math<">Matematicas</option>
                    <option value="science<">Ciencia</option>
                    <option value="art<">Arte</option>
                    <option value="history<">Historia</option>
                </select>
                <br/>
                <input type="submit" value="Enviar"/>
            </form>
        );
    }
}


