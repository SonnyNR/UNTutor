import React, {Component} from "react";
import default_profile from "../components/img/default_profile.png";
import pencil from "../components/img/pencil-solid.svg";
import "./PersonalData.css";

export default class PersonalData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modify: false,
        }

        this.handleClickModify = this.handleClickModify.bind(this);
        this.handleSubmitModify = this.handleSubmitModify.bind(this);

    }

    handleSubmitModify(e, props) {
        console.log('modificado');
        this.setState({modify: !this.state.modify});
        e.preventDefault();
    }

    handleClickModify(e) {
        this.setState({modify: !this.state.modify});
        e.preventDefault();
    }

    render() {
        const {name, email, phone, handleSubmitModify} = this.props;
        if (!this.state.modify)
            return(
                <PersonalDataText
                    name={name}
                    email={email}
                    phone={phone}
                    handleClickModify={this.handleClickModify} />
            );
        else
            return (
                <PersonalDataModifyForm
                    name={name}
                    email={email}
                    phone={phone}
                    handleSubmitModify={this.handleSubmitModify} />
            );

    }

}


const PersonalDataText = ({name, email, phone, handleClickModify}) => {

    return (
        <div>
            <div>
                <img src={default_profile} className="default-profile" />
            </div>
            <div>
            <table>
                <tr>
                    <td>Nombre:</td>
                    <td>{name}</td>
                </tr>
                <tr>
                    <td>Correo:</td>
                    <td>{email}</td>
                </tr>
                <tr>
                    <td>Telefono:</td>
                    <td>{phone}</td>
                </tr>
                <tr><br/></tr>
                <tr>
                    <button onClick={e => handleClickModify(e)} className="btn-mod">
                        <img src={pencil} className="pencilSVG" /> Modificar
                    </button>
                </tr>
            </table>
            </div>
        </div>
    );
}

class PersonalDataModifyForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            email: props.email,
            phone: props.phone,
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
            <form onSubmit={this.props.handleSubmitModify}>
                <table>
                    <tr>
                        <td><label htmlFor="name">Nombre: </label></td>
                        <td><input type="text" name="name" onChange={this.handleInputChange} value={this.state.name}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="email">Correo: </label></td>
                        <td><input type="text" name="email" onChange={this.handleInputChange} value={this.state.email}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="phone">Telefono: </label></td>
                        <td><input type="text" name="phone" onChange={this.handleInputChange} value={this.state.phone}/></td>
                    </tr>
                    <tr><br/></tr>
                    <tr>
                        <td> <input type="submit" value="Confirmar"/> </td>
                    </tr>
                </table>
            </form>
        );
    }

}












