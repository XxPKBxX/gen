var dark = true;
var root = document.documentElement.style;

var havedone = 0;

var doing = 0;

var page = 0;

var times = null;
var clock = null;

var interval = null;
var hour = 0;
var min = 0;
var sec = 0;

window.onload = function() {
    times = document.getElementsByClassName("times");
    clock = document.getElementsByClassName("clock")[0];
    setInterval(function() {
        if (window.innerHeight == screen.height) {
            document.getElementsByClassName("darkCheck")[0].style.transform = "translateY(-100px)";
            if (page == 2) clock.style.transform = "translate(10px,-50%)";
        }
        else {
            document.getElementsByClassName("darkCheck")[0].style.transform = "translateY(0px)";
            if (page == 2) clock.style.transform = "translate(80px,-50%)";
        }
    },1,true);

    window.addEventListener("wheel",gotoSetting,true);
    document.addEventListener("click",fuckit,true);

    for (var i = 0; i < times.length; i++) {
        times[i].addEventListener("change",function() {document.getElementsByClassName("required")[0].style.opacity = "0";},true);
        times[i].addEventListener("scroll",function(e) {e.preventDefault()},true);
    }
}
function darkorlight(){
    var checkbox = document.getElementsByClassName("checkCircle")[0];
    if (dark == true) {
        dark = false
        checkbox.style.transform = "translateX(30px)";
        checkbox.style.backgroundColor = "rgb(255, 64, 64)";
        checkbox.style.boxShadow = "0px 0px 20px -2px rgb(255, 64, 64)";
        root.setProperty("--background-color","white");
        root.setProperty("--text-color","black");
    }
    else if (dark == false) {
        dark = true
        checkbox.style.transform = "translateX(0px)";
        checkbox.style.backgroundColor = "rgb(72, 255, 72)";
        checkbox.style.boxShadow = "0px 0px 20px -2px rgb(72, 255, 72)";
        root.setProperty("--background-color","black");
        root.setProperty("--text-color","white");
    }
}
function gotoSetting(e) {
    var differ = page;

    if (e.deltaY > 0) differ += 1;
    if (e.deltaY <= 0) differ -= 1;

    if (differ < 0 || differ > 2) return;
    page = differ;

    scroll();
}
function scroll() {
    var setting = document.getElementsByClassName("setting")[0];
    if (page == 0) {
        clock.style.fontSize = "20vw";
        clock.style.top = "50%";
        clock.style.left = "50%";
        clock.style.transform = "translate(-50%,-50%)";
        setting.style.top = "100%";
    }
    else if (page == 1) {
        clock.style.fontSize = "150px";
        clock.style.top = "25%";
        clock.style.left = "50%";
        clock.style.transform = "translate(-50%,-50%)";
        setting.style.top = "50%";
    }
    else if (page == 2) {
        clock.style.fontSize = "32px";
        clock.style.top = "24px";
        clock.style.left = "0px";
        if (window.innerHeight == screen.height) clock.style.transform = "translate(10px,-50%)";
        else clock.style.transform = "translate(80px,-50%)";
        setting.style.top = "50px";
    }
}
function removePopup() {
    document.getElementsByClassName("scrolldown")[0].style.top = "-20%";
    setTimeout(function() {document.getElementsByClassName("scrolldown")[0].remove()},300,true);
}
function start() {
    var start = document.getElementById("start");
    var stop = document.getElementById("stop");

    if (doing != 1) stop.disabled = "true";

    if (doing == 0) {
        if (times[0].value == 0 && times[1].value == 0 && times[2].value == 0) {
            document.getElementsByClassName("required")[0].style.opacity = "1";
            return;
        }

        clock.style.animation = "none";
        clock.style.opacity = "1";

        start.innerHTML = "일시정지";
        page = 0;
        doing = 1;
        scroll();

        hour = times[0].value
        min = times[1].value
        sec = times[2].value
        
        havedone += 1;
        count();
        interval = setInterval(count,1000,true);
    }
    else if (doing == 1) {
        start.innerHTML = "계속";
        stop.removeAttribute("disabled")
        doing = 3;
    }
    else if (doing == 2) {
        clock.style.animation = "didntstart 1s infinite";
        clock.style.opacity = "1";
        document.getElementById("start").removeAttribute("disabled");
        start.innerHTML = "시작";
        clearInterval(interval);
        doing = 0;
        clock.innerHTML = "0:00:00";
    }
    else if (doing == 3) {
        start.innerHTML = "일시정지";
        doing = 1;
    }
    else if (doing == 4) {
        document.getElementById("start").disabled = "true";
    }
}
function count() {
    if (doing == 1) {
        if (sec <= 0 && min <= 0 && hour <= 0) {
            clearInterval(interval);
            ended();
        }

        if (min < 10) var m = "0" + min.toString();
        else var m = min.toString();
            
        if (sec < 10) var s = "0" + sec.toString();
        else var s = sec.toString();

        clock.innerHTML = hour + ":" + m + ":" + s;

        sec -= 1;

        if (sec < 0) {
            if (min >= 1) sec += 60;
            else sec = 0;
            min -= 1;
        }
        if (min < 0) {
            if (hour >= 1) min += 60;
            else min = 0;
            hour -= 1;
        }
        if (hour < 0) hour = 0;
    }
}
function ended() {
    setTimeout(function() {
        document.getElementById("alarm").loop = true;
        document.getElementById("alarm").play();
        doing = 4;
        if (havedone == 1) document.getElementsByClassName("clickscreen")[0].style.bottom = "30px";
    },1000,true);
}
function fuckit() {
    if (doing != 4) return;

    doing = 2
    start();
    document.getElementsByClassName("clickscreen")[0].style.bottom = "-50px";
    document.getElementById("alarm").loop = false;
    document.getElementById("alarm").pause();
    document.getElementById("alarm").currentTime = 0;
}