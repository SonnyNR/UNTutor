import React, { Component} from 'react';
import NavBar from '../components/NavBar';
import PersonalData from "./PersonalData";

class Administrator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
        }

        this.setData = this.setData.bind(this);

    }

    setData({name, email, phone}) {
        this.setState({
            name,
            email,
            phone,
        })
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
            </main>
        );
    }

    componentDidMount() {
        window.client.getUser('administrator', this.setData);
    }
}

export default Administrator;
