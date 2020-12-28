var started = false;
var clicks = 0;
var acCheck = 0;
var stopwatch = 0;

window.onload = function() {
    window.addEventListener("mousedown", function(e) {
        if (started == true) {
            clicks++;
            countdown.innerHTML = "클릭 수: " + clicks;
            e.preventDefault();
        }
    }, true);
}

async function cd() {
    const progress = document.getElementsByClassName("progress")[0];
    window.addEventListener("contextmenu", norightclick, true);
    document.getElementById("acWarn").style.opacity = 0;
    progress.style.transition = "left 2.5s linear";
    progress.style.left = "0%";
    const countdown = document.getElementById("countdown");
    const obj = document.getElementById("start");
    const sw = document.getElementById("stopwatch");
    obj.disabled = true;
    countdown.removeAttribute("hidden");
    for (var i = 2; i >= 0; i--) {
        countdown.innerHTML = (i + 1) + "초 후 측정 시작";
        await sleep(1000);
    }
    started = true;
    progress.style.transition = "left 9.0s linear";
    progress.style.left = "-100%";
    stopwatch = 0;
    acCheck = 0;
    clicks = 0;
    countdown.innerHTML = "클릭 수: 0";
    while (stopwatch <= 9000) {
        stopwatch += 5;

        if (stopwatch / 1000 == parseInt(stopwatch / 1000)) {
            if (clicks - acCheck >= 40) {
                document.getElementById("acWarn").style.opacity = 1;
            }
            acCheck = clicks;
        }

        var remain = (10000 - stopwatch) / 1000;
        if (remain != Math.round(remain)) sw.innerHTML = parseInt(remain).toString() + "." + (remain).toString().split(".")[1].substr(0, 1);
        else sw.innerHTML = parseInt(remain).toString() + ".0";
        await sleep(1);
    }
    sw.innerHTML = "";
    started = false;
    window.removeEventListener("contextmenu", norightclick, true);
    if (clicks >= 1) countdown.innerHTML = (clicks / 10) + " CPS";
    else countdown.innerHTML = "0 CPS";
    obj.removeAttribute("disabled");
}
function norightclick(e) {e.preventDefault();}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
