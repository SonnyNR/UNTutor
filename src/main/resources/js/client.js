

var conexion = new WebSocket('ws://localhost:8080/socket');
configuracion = null
var conexionPeer = new RTCPeerConnection(configuracion);
var canalDatos = conexionPeer.createDataChannel("canalDatosP2P", { reliable: true });

canalDatos.onerror = function (error) {
    console.log("Error:", error);
};
canalDatos.onclose = function () {
    console.log("se ha cerrado el canal de datos");
};

function enviarMensajeSeñalizacion(msg) {
    conexion.send(JSON.stringify(msg));
}

conexionPeer.createOffer().then(
    function (offer) {
        send({ event: "offer", data: offer });
        conexionPeer.setLocalDescription(offer);
    }
).catch(function (error) {
    // Handle error here
});


conexionPeer.onicecandidate = function(event) {
    if (event.candidate) {
        send({
            event : "candidate",
            data : event.candidate
        });
    }
};

conexionPeer.addIceCandidate(new RTCIceCandidate(candidate));

conexionPeer.setRemoteDescription(new RTCSessionDescription(offer));
conexionPeer.createAnswer(function(answer) {
    peerConnection.setLocalDescription(answer);
        send({
            event : "answer",
            data : answer
        });
}, function(error) {
    // Handle error here
});

function handleAnswer(answer){
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}
//hasta aqui termina la configuracion de la conexion y el canal de datos
//para enviar un mensaje, usamos el canal de datos y su funcion send
//canalDatos.send("aqui va el mensaje");

//para recibir un mensaje, usamos el canal de datos y su funcion onmessage
canalDatos.onmessage = function(event) {
    console.log("Llegó un mensaje: ", event.data);
};
//adicionalmente para recibir el mensaje en el canal de datos, agregamos una funcion callback
conexionPeer.ondatachannel = function (event) {
    canalDatos = event.channel;
};