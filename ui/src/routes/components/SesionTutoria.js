import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import '../tutor/tutor.css';
import UsuarioChatSesion from './UsuarioChatSesion';
import './SesionTutoria.css';
import board_img from './img/board.jpg';

import { useEffect, useState } from 'react';


var channels = [];
var channelUsers = new Map();
var friendToName = new Map();


var rtcPeers = new Map();
var ws1;

function SesionTutoria() {


    const [userId, setUserId] = useState("");
    const [rtcPeers2, setRtcPeers2] = useState("");

    var signal1 = {
        userId: null,
        type: null,
        data: null,
        toUid: null,
    };

    var chatData = {
        userId: null,
        data: null,
        type: null,
    }

let minom = JSON.parse(localStorage.user).name.split(' ')[0];
    var userId2 = "";



    useEffect(() => {//al enviar un mensaje por chat    
        document.getElementById('mensajeAenviar').onkeydown = (event) => {


            if (event.key == 'Enter') {
                event.preventDefault();
                sendChat();
            }

            if (event.key == '*') {
                event.preventDefault();
                agregaLineaChat("conectando", "aviso");
                login();
            }

            
        };
       


    }, []);

    function addUserOnChat(educando, enSesion) {
        if (enSesion) {
            agregaLineaChat(educando + " se ha unido", "aviso");
        }
        else {
            agregaLineaChat(educando + " se ha desconectado", "aviso");
        }

    }


    function login() {
        console.log("login");

        startWebSocket();
    }

    function startWebSocket() {

        ws1 = new WebSocket('ws://localhost:8080/socket1');
        ws1.onopen = event => {

            signal1.userId = JSON.parse(localStorage.user).email;
            signal1.type = 'Login';
            signal1.data = '';
            console.log(JSON.stringify(signal1));
            ws1.send(JSON.stringify(signal1));

        }

        ws1.onerror = (error) => {
            console.log("Error connecting to signalling server, please try login again");
        };

        ws1.onclose = event => {
            console.log("Connection websocket closed");
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

    function handleNewMemberAndOffer(data1) {
        let data3 = JSON.parse(data1.data);
        let peerId = data1.userId;
        let rtcPeer = new RTCPeerConnection({
            iceServers: [{
                urls: "stun:openrelay.metered.ca:80",
            },
            {
                urls: "turn:openrelay.metered.ca:80",
                username: "openrelayproject",
                credential: "openrelayproject",
            },
            {
                urls: "turn:openrelay.metered.ca:443",
                username: "openrelayproject",
                credential: "openrelayproject",
            },
            ]
        });
        console.log('Add peer:' + peerId + "-" + JSON.stringify(rtcPeer));

        setRtcPeers2(rtcPeers2);



        if (data1.type == "NewMember") {
            let channel1 = rtcPeer.createDataChannel(Math.floor(Math.random() * 10000000000));
            channelConfig(channel1);

            //create offer
            rtcPeer.createOffer().then(a => {
                console.log('Sending offer');
                // console.log('UserId:' + userId2);
                console.log('UserId:' + userId);
                signal1.userId = userId2;
                signal1.type = 'Offer';
                signal1.data = JSON.stringify(a);
                signal1.toUid = data1.userId;
                console.log(JSON.stringify(signal1));
                ws1.send(JSON.stringify(signal1));
                rtcPeer.setLocalDescription(a);
                // rtcPeer.currentLocalDescription=offer;
            }).then(() => {

            }).
                catch(err => {
                    console.log('Error Offer:' + err);
                });


        }
        //not new member
        else {
            let data2 = JSON.parse(data1.data);
            console.log('Sending answer');
            rtcPeer.setRemoteDescription(data2).then(() => {

                rtcPeer.createAnswer().then(a => {

                    signal1.userId = userId2;
                    signal1.type = 'Answer';
                    signal1.data = JSON.stringify(a);
                    signal1.toUid = data1.userId;
                    rtcPeer.setLocalDescription(a);
                    ws1.send(JSON.stringify(signal1));
                    console.log('answer:' + JSON.stringify(a));
                });
            });

        }
        rtcPeer.ondatachannel = event => {
            let channel2 = event.channel;
            channelConfig(channel2);
        }


        rtcPeer.onicecandidate = event => {
            console.log('Got ice candidate');
            if (event.candidate) {
                console.log('ice candidate:' + JSON.stringify(event.candidate));
                signal1.userId = userId2;
                signal1.type = 'Ice';
                signal1.data = JSON.stringify(event.candidate);
                signal1.toUid = data1.userId;
            }
            console.log('ice candidate2:' + JSON.stringify(event));
            if (event.candidate) {

                if (Object.keys(event.candidate.candidate).length > 1) {
                    console.log("Kirim candidate ke server");
                    ws1.send(JSON.stringify(signal1));
                }
            }
        };
        rtcPeer.onicecandidateerror = event => {
            console.log('ice candidate error');
            // ws1.send(JSON.stringify(event));
        };

        rtcPeer.onicegatheringstatechange = event => {
            console.log('ice gathering');

            console.log('Ice gathering:' + JSON.stringify(event));
            // ws1.send(JSON.stringify(event));
        };

        rtcPeer.oniceconnectionstatechange = event => {
            console.log('ice connection change');
            // ws1.send(JSON.stringify(event));
        };

        rtcPeers.set(peerId, rtcPeer);

    }


    function channelConfig(channel1) {
        channel1.onclose = event => {
            console.log("Close channel:");
            let friendId = channelUsers.get(channel1);
            document.getElementById(friendId).remove();

            addUserOnChat(friendToName.get(friendId), false);
            friendToName.delete(friendId);
        }//aqui llegan los mensajes de chat
        channel1.onmessage = event => {
            console.log("Receive msg datachannel:" + event.data);
            let dataChat1 = JSON.parse(event.data);


            if (dataChat1.type == 'message') {
                agregaLineaChat(dataChat1.data, "recibido");
            }
            else {
                friendToName.set(dataChat1.userId, dataChat1.data);
                addUser(dataChat1.data, dataChat1.userId);
                channelUsers.set(channel1, dataChat1.userId);
            }



        };

        channel1.onopen = () => {
            console.log("Now it's open");
            chatData.userId = userId2;
            chatData.type = 'handshake';
            chatData.data = document.getElementById('myUsername').value;
            channel1.send(JSON.stringify(chatData));
        }
        channels.push(channel1);


    }


    function addUser(data1, friendId) {//agregamos al tutor carrusel

        /*<li class="usuario-chat" >
            <h4 >Danny G.</h4>
            <h4 >Matematica</h4>
        </li> */
        let lista=document.getElementById("tutor-list");
        let newUser = document.createElement("li");        
        newUser.classList = "usuario-chat";
        newUser.id = friendId;
        let h41 = document.createElement('h4');
        let h42 = document.createElement('h4');
        h41.innerText = data1;
        h42.innerText = "Tutor..."
        newUser.appendChild(h41);
        newUser.appendChild(h42);
        lista.appendChild(newUser);
        addUserOnChat(friendToName.get(friendId), true);
    }


    function newMember(data1) {
        signal1.userId = data1;
        signal1.type = 'NewMember';
        signal1.toUid = 'signaling';
        signal1.data = 'Join';
        ws1.send(JSON.stringify(signal1));
    }


    function sendChat() {
        channels.forEach(a => {
          let dataToSend = document.getElementById('mensajeAenviar').value;
          chatData.userId = minom;
          chatData.type = 'message';
          chatData.data = dataToSend;
          console.log("Send chat:" + JSON.stringify(chatData));
          if (a.readyState == 'open') {
            a.send(JSON.stringify(chatData));
          }
    
        });
        agregaLineaChat(document.getElementById('mensajeAenviar').value, "enviado");
        
      }

    function agregaLineaChat(chatmsg = "", fuente = "enviado") {
        let chatdiv = document.getElementById("chat-box-mensajes");
        let newdiv = document.createElement('div');
        newdiv.className = "msg " + fuente;
        newdiv.innerText = chatmsg == "" ? document.getElementById("mensajeAenviar").value : chatmsg;
        document.getElementById("mensajeAenviar").value = "";
        chatdiv.appendChild(newdiv);
        chatdiv.scrollTop = chatdiv.scrollHeight;
    }

    //renderizado
    
    return (
        <div class='wrapper'>
            <NavBar role={localStorage.role} />
            <main>
                <div class='lienzo-sesion' >
                    <div class='tablero'>

                        <img class="board-background" src={board_img} alt="board" />

                    </div>

                    <div class='columna-chat'>
                        <div class='carrusel-tutores'>
                            <ul id="tutor-list">
                                <li class="usuario-chat" >
                                    <h4 >Danny G.</h4>
                                    <h4 >Matematica</h4>
                                </li>
                            </ul>
                        </div>
                        <div class='chat-box'>
                            <div id='chat-box-mensajes'>
                               
                                <div class="msg aviso">
                                    El tutor se ha conectado
                                </div>


                            </div>
                            <div class='chat-box-input'>
                                <input id="mensajeAenviar" type='text' placeholder='Escribe un mensaje'/>
                                <button onClick={() => sendChat()}>Enviar</button>
                            </div>
                        </div>


                    </div>

                </div>
            </main>
        </div>
    );
}

export default SesionTutoria;