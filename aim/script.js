var doing = false;
var sdf = -1;
var how = 0;
var ggambbak = [];
var circle = null;

var lastClick = new Date();
var nowClick = new Date();

function setting() {
    document.addEventListener("click", clicked, true);
    circle = document.getElementsByClassName("circle")[0];
}

async function start(obj) {
    var countdown = document.getElementsByClassName("count")[0];
    countdown.style.transform = "translateY(-100px)";

    how = 0;
    sdf = -1;
    ggambbak = [];
    obj.style.transform = "translateY(-50px)";

    var now = 3;
    const count = setInterval(function() {
        if (now == 3) countdown.style.transform = "translateY(-50px)";
        if (now > 0) countdown.innerHTML = now.toString() + "초 후 시작";
        now -= 1;
        if (now < 0){
            clearInterval(count);
            countdown.style.transform = "translateY(-100px)";
            doing = true;
            clicked();
        }
    }, 1000);
    setTimeout(function() {
        var howmany = 0;
        var margin = 0;
        document.getElementsByClassName("timer")[0].style.marginLeft = "0%";
        const loading = setInterval(function() {
            howmany += 1;
            margin -= 10;
            document.getElementsByClassName("timer")[0].style.marginLeft = margin.toString() + "%";
            if (howmany > 10) {clearInterval(loading);doing = false;end();}
        }, 1000);
    }, 4000);
}

function end() {
    circle.style.transform = "translate(0px, -100px)";
    document.getElementsByClassName("start")[0].style.transform = "translateY(0px)";
    document.getElementsByClassName('result')[0].removeAttribute("hidden");

    var sum = 0;
    ggambbak.forEach(element => {sum += element});
    var average = Math.round(sum / ggambbak.length * 10) / 10;

    document.getElementsByClassName('result_text')[0].innerHTML = "평균 반응 속도: " + average.toString() + "초<br>정확도: " + Math.floor(how / sdf * 100).toString() + "% (" + sdf.toString() + "개 중 " + how.toString() + "개)";
}

function clicked() {
    if (doing == true) {
        if (sdf >= 1) lastClick = nowClick;
        nowClick = new Date();
        if (sdf >= 1) ggambbak.push((nowClick - lastClick) / 1000);
        sdf += 1;
        circle.style.transform = "translate(" + (Math.floor(Math.random() * window.innerWidth - 30)).toString() + "px, " + (Math.floor(Math.random() * window.innerHeight)).toString() + "px)";
    }
}

function shot() {
    how += 1;
}