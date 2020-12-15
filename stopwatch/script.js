window.onload = function() {
    if (document.cookie.split(";").includes("joined=1") || document.cookie.split(";").includes(" joined=1")) {
        document.getElementsByClassName("howtoback")[0].remove();
        endtuto();
    }
    else {
        window.addEventListener("click", howtouseend, true);
        window.addEventListener("touchstart", howtouseend, true);
    }
    
    document.cookie = "joined=1";
}

function howtouseend() {
    const howtouse = document.getElementsByClassName("howtouse")[0];
    if (howtouse.classList.contains("animationing")) return;
    howtouse.classList.add("animationing");
    
    howtouse.style.animation = "0.4s ease-in forwards end";
    
    document.getElementsByClassName("howtoback")[0].style.opacity = "0";
    setTimeout(function() {document.getElementsByClassName("howtoback")[0].remove();}, 400, true);
    
    window.removeEventListener("click", howtouseend, true);
    window.removeEventListener("touchstart", howtouseend, true);

    endtuto();
}

function endtuto() {
    window.addEventListener("click", stopwatch, true);
    window.addEventListener("touchstart", stopwatch, true);
    document.getElementsByClassName("reset")[0].addEventListener("click", function() {
        hour = 0;
        min = 0;
        sec = 0;
        document.getElementsByClassName("clock")[0].innerHTML = "0:00:00";
    }, true);
    document.getElementsByClassName("reset")[0].style.transform = "translate(-50%, -20px)";
}

var hour = 0;
var min = 0;
var sec = 0;

var interval = null;
function stopwatch() {
    if (document.querySelectorAll(".reset:hover").length >= 1) return;

    const clock = document.getElementsByClassName("clock")[0];
    const resetornot = document.getElementsByClassName("reset")[0];

    if (clock.classList.contains("updating")) {
        clock.classList.remove("updating");
        clearInterval(interval);

        resetornot.style.transform = "translate(-50%, -20px)";
    }
    else if (!clock.classList.contains("updating")) {
        resetornot.style.transform = "translate(-50%, 50px)";

        clock.classList.add("updating");
        interval = setInterval(function() {
            sec += 1;

            if (sec >= 60) {
                sec = 0;
                min += 1;
            }
            if (min >= 60) {
                min = 0;
                hour += 1;
            }

            var minn = min.toString();
            if (minn.length <= 1) minn = "0" + minn;

            var seco = sec.toString();
            if (seco.length <= 1) seco = "0" + seco;

            document.getElementsByClassName("clock")[0].innerHTML = hour.toString() + ":" + minn + ":" + seco;
        }, 1000, true);
    }
}