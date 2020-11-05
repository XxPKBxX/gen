window.onload = function() {
    setInterval(function() {
        var now = new Date();
        var min = now.getMinutes();
        if (min.toString().length == 1) min = "0" + min.toString();
        var sec = now.getSeconds();
        if (sec.toString().length == 1) sec = "0" + sec.toString();
        document.getElementById("clock").innerHTML = now.getHours() + ":" + min + ":" + sec;
    },1,true);
    var fullscreen = setInterval(function() {
        if (window.innerHeight == screen.height) {
            document.getElementById("fullscreen").remove();
            clearInterval(fullscreen);
        }
    },1,true);
}
