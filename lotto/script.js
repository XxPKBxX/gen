var lastScroll = 0
var excludes = [];
var clicking = false;
window.onload = function() {
    window.addEventListener("scroll",scroll, true);
    for (var i = 0; i < 45; i++) {
        var yee = document.createElement("div");
        yee.className = "ex";
        yee.innerHTML = (i + 1).toString();
        yee.style.transform = "translateY(50px)";
        yee.style.opacity = 0;
        document.getElementById("buttons").appendChild(yee);
    }

    setTimeout(function() {
        var d = document.getElementsByClassName("ex");
        for (var i = 0; i < d.length; i++) {
            d[i].style.opacity = 1;
            d[i].style.transform = "translateY(0px)";
        }
    }, 10);
    
    var d = document.getElementsByClassName("ex");
    for (var i = 0; i < d.length; i++) {
        d[i].addEventListener("click",exclude, true);
        d[i].addEventListener("mouseover",dragging, true);
    }
    window.addEventListener("mousedown",function(){clicking = true;}, true);
    window.addEventListener("mouseup",function(){clicking = false;}, true);
}

function dragging() {
    if (clicking == true) {
        var eventt = new Event("click");
        this.dispatchEvent(eventt);
    }
}

function scroll() {
    const nav = document.getElementsByClassName("navbar")[0];
    if (window.scrollY >= 50 && lastScroll <= window.scrollY) nav.style.top = "-50px";
    else nav.style.top = "0px";
    lastScroll = window.scrollY;
}

function exclude() {
    if (excludes.includes(Number(this.innerHTML))) {
        excludes.splice(excludes.indexOf(Number(this.innerHTML)), 1);
        this.style.background = "none";
        this.style.backgroundSize = "none";
        this.style.backgroundColor = "white";
    }
    else {
        if (excludes.length >= 39) return;
        excludes.push(Number(this.innerHTML));
        this.style.background = "linear-gradient(270deg, #4ecfff, #9c61ff)";
        this.style.backgroundSize = "400% 400%";
        this.style.backgroundColor = "white";
    }
}

function reset() {
    var d = document.getElementsByClassName("ex");
    for (var i = 0; i < d.length; i++) {
        if (excludes.includes(i + 1) && (!d[i].style.background.includes("none") || d[i].style.background != "")) {
            var eventt = new Event("click");
            d[i].dispatchEvent(eventt);
        }
    }
    excludes = [];
}

function invert() {
    var d = document.getElementsByClassName("ex");
    for (var i = 0; i < d.length; i++) {
        var eventt = new Event("click");
        d[i].dispatchEvent(eventt);
    }
}

function generate() {
    var numbers = [];
    var randoms = [0];
    for (var i = 0; i < 6; i++) {
        var rand = 0;
        while (randoms.includes(rand) || excludes.includes(rand)) {rand = Math.floor(Math.random() * 45) + 1;}
        numbers.push(rand);
        randoms.push(rand);
    }
    numbers.sort(function(a,b) {return a-b;});

    var parentDiv = document.createElement("div");
    parentDiv.style.width = "auto";
    parentDiv.style.height = "40px";
    parentDiv.className = "ballParent";
    document.getElementsByClassName("lottolist")[0].appendChild(parentDiv);
    for (var i = 0; i < 6; i++) {
        var ball = document.createElement("div");
        ball.className = "ball";
        ball.style.width = "40px";
        ball.style.height = "40px";
        ball.style.borderRadius = "100px";
        ball.style.color = "white";
        ball.innerHTML = numbers[i].toString();
        if (numbers[i] <= 10) {
            ball.style.backgroundColor = "#ffbf02"
            ball.style.color = "black";
        }
        if (numbers[i] >= 11 && numbers[i] <= 20) ball.style.backgroundColor = "#0267ff";
        if (numbers[i] >= 21 && numbers[i] <= 30) ball.style.backgroundColor = "#f93b3b";
        if (numbers[i] >= 31 && numbers[i] <= 40) ball.style.backgroundColor = "#212121";
        if (numbers[i] >= 41) {
            ball.style.backgroundColor = "#94ef4a";
            ball.style.color = "black";
        }
        parentDiv.appendChild(ball);
    }
    var hr = document.createElement("hr");
    hr.style.border = "solid 1px white";
    hr.style.opacity = 0.3;
    hr.style.width = "270px";
    document.getElementsByClassName("lottolist")[0].appendChild(hr);
}
function empty() {
    document.getElementsByClassName("lottolist")[0].remove();
    var lottolist = document.createElement("div");
    lottolist.className = "lottolist";
    document.getElementsByClassName("lottogen")[0].appendChild(lottolist);
}
