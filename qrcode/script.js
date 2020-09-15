function generate(){
    if (document.getElementById("inputtt").value == "") alert("값 또는 크기가 비어있습니다.")
    else document.getElementById("qr").src = "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" + document.getElementById("inputtt").value;
}

function enterKey(){
    if (window.event.keyCode == 13) generate();
}
