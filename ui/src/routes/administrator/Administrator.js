import React, { Component} from 'react';
import NavBar from '../components/NavBar';
import PersonalData from "./PersonalData";
import TopicRequest from "./TopicRequest";
import AuthService from '../../services/auth.service';


class Administrator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            phone: "",
        }

    }

    render() {

        return (
            <main>
                <NavBar role='administrator' />

                <h2>Area Administrator</h2>
                <h3>Información personal</h3>
                <PersonalData
                    name={this.state.name}
                    email={this.state.email}
                    phone={this.state.phone}
                />
                <TopicRequest />
            </main>
        );
    }

    componentDidMount() {
        let user = AuthService.getCurrentUser();
        this.setState({
            name: user.name,
            email: user.email,
            phone: user.phone,
        })
    }
}

export default Administrator;
