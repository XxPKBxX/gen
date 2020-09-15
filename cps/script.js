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
    document.getElementById("acWarn").style.opacity = 0;
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
    if (clicks >= 1) countdown.innerHTML = (clicks / 10) + " CPS";
    else countdown.innerHTML = "0 CPS";
    obj.removeAttribute("disabled");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
