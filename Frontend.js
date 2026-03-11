// Botón de emergencia WebRTC
document.getElementById('btn-emergencia').onclick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: true 
    });
    
    const peerConnection = new RTCPeerConnection(configuracion);
    stream.getTracks().forEach(track => 
        peerConnection.addTrack(track, stream)
    );
    
    // Enviar ubicación
    navigator.geolocation.getCurrentPosition(pos => {
        peerConnection.createDataChannel('geolocalizacion');
        enviarUbicacion(pos.coords);
    });
    
    // Iniciar llamada con el 911
    iniciarLlamadaEmergencia(peerConnection);
};