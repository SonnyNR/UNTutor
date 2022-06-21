import React, { Component } from 'react';
import './UsuarioChatSesion.css';
class UsuarioChatSesion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nombre: props.nombre,
            tematica: props.tematica,
            
        }

    }


    render() {
        return (
            <div class="usuario-chat" >
                <h4 >{this.state.nombre}</h4>
                <h4 >{this.state.tematica}</h4>
            </div>
        );
    }

    componentDidMount() {

    }
}

export default UsuarioChatSesion;