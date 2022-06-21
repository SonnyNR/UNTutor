import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import '../tutor/tutor.css';
import UsuarioChatSesion from './UsuarioChatSesion';
import './SesionTutoria.css';
import board_img from './img/board.jpg';


var counter=0;

var signal1 = {
    userId: null,
    type: null,
    data: null,
    toUid: null,
  };



function loginWebSocketStudent() {
    console.log("login");
    /*let inputName = document.getElementById('myUsername');
    
    startWebSocket();*/
}


/*
function startWebSocket() {

    // ws1 = new WebSocket('ws://localhost:3030/socket1');
    let socketAddr = process.env.REACT_APP_SIGNALLING_SERVER;
    ws1 = new WebSocket(socketAddr);
    ws1.onopen = event => {

        signal1.userId = localStorage.user;
        signal1.type = 'Login';
        signal1.data = '';
        console.log(JSON.stringify(signal1));
        ws1.send(JSON.stringify(signal1));

    }

    ws1.onerror = (error) => {
        toast.error("Error connecting to signalling server, please try login again");
    };

    ws1.onclose = event => {
        document.getElementById('status-offline').style.display = 'block';
        document.getElementById('status-online').style.display = 'none';
        document.getElementById('myUsername').removeAttribute('readOnly');
        let myStatus = document.getElementById('myStatus');
        myStatus.className = 'status orange';

        document.getElementById('h3-myStatus').innerText = 'offline';
        document.getElementById('h3-myStatus').appendChild(myStatus);
        document.getElementById('btnLogin').style.display = 'block';


        document.getElementById('toSend').setAttribute('disabled', 'true');
        document.getElementById('btnSend').setAttribute('disabled', 'true');
    }

    ws1.onmessage = event => {
        var data1 = JSON.parse(event.data);
        console.log(event);
        console.log(data1);
        console.log(data1.type);

        var data2 = null;


        console.log("Data from server:" + JSON.stringify(data1));
        if (data1.userId == userId2 || data1.userId.length < 2) {

            return;
        }
        else if (data1.type == 'NewMember') {
            handleNewMemberAndOffer(data1);
        }
        else if (data1.type == "UserId") {

            setUserId(data1.data);

            userId2 = data1.data;
            document.getElementById('status-offline').style.display = 'none';
            document.getElementById('status-online').style.display = 'block';
            document.getElementById('toSend').removeAttribute('disabled');
            document.getElementById('btnSend').removeAttribute('disabled');
            document.getElementById('btnLogin').style.display = 'none';
            document.getElementById('myUsername').setAttribute('readOnly', 'true');

            let myStatus = document.getElementById('myStatus');
            myStatus.className = 'status green';

            document.getElementById('h3-myStatus').innerText = 'online';
            document.getElementById('h3-myStatus').appendChild(myStatus);
            // document.getElementById('btnShowLogin').click();
            toast.success("Connected to Signalling Server. Please click the Show Login/Chat button");
            newMember(userId2);

            console.log("Set userId2:" + userId2);
            // sendOffer();
        }
        else if (data1.type == "Offer") {

            data2 = JSON.parse(data1.data);
            console.log("Receive offer:" + JSON.stringify(data2));
            handleNewMemberAndOffer(data1);

        }
        else if (data1.type == "Ice") {
            data2 = JSON.parse(data1.data);
            if (data2) {

                let peer1 = rtcPeers.get(data1.userId);

                if (peer1) {
                    console.log("Tambah Ice Candidate");
                    peer1.addIceCandidate(new RTCIceCandidate(data2)).catch(error => {
                        console.log(data2);
                        console.log("Error ICE:" + error);
                    });
                }
            }
        }
        else if (data1.type == "Answer") {
            data2 = JSON.parse(data1.data);
            let peer1 = rtcPeers.get(data1.userId);
            peer1.setRemoteDescription(new RTCSessionDescription(data2));

        }

        // console.log("Message:"+event.data);
    };

}
*/


class SesionTutoria extends Component {

    constructor(props) {
        super(props);

        this.state = {//aqui gaurdamos las listas de los usuarios disponibles para hablar
            users: [],
            messages: [],
            message: '',
            user: '',
            userId: '',

        }

    }



    render() {

        return (
            <div class='wrapper'>
                <NavBar role={localStorage.role}/>
                <main>
                <div class='lienzo-sesion' >
                    <div class='tablero'>

                        <img class="board-background" src={board_img} alt="board" />

                    </div>

                    <div class='columna-chat'>
                        <div class='carrusel-tutores'>
                            <ul id="tutor-list">
                                <li >
                                    <UsuarioChatSesion
                                        nombre="Danny G."
                                        tematica="Matematica" />
                                </li>
                                <li >
                                    <UsuarioChatSesion
                                        nombre="Maria J."
                                        tematica="Programación" />
                                </li>
                                <li >
                                    <UsuarioChatSesion
                                        nombre="Jorge H."
                                        tematica="Correccion de estilo" />
                                </li>
                            </ul>
                        </div>
                        <div class='chat-box'>
                            <div class='chat-box-mensajes'>

                            </div>
                            <div class='chat-box-input'>
                                <input type='text' placeholder='Escribe un mensaje' />
                                <button onClick={() => loginWebSocketStudent()}>Enviar</button>
                            </div>
                        </div>


                    </div>

                </div>
                </main>
            </div>
        );

    }

    componentDidMount() {
        let user = JSON.parse(localStorage.user);
        console.log(user);
        /* this.setState({
            name: user.name,
            email: user.email,
            phone: user.phone,
        }) */
    }
}

export default SesionTutoria;