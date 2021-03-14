var latest = new Date();

function load() {
    setInterval(function() {
        var time = new Date();
        if (latest.getSeconds() != time.getSeconds()) {
            var hour = time.getHours();
            var pam = "AM";
            if (hour > 12) hour -= 12;
            if (hour >= 12) pam = "PM";
            var change = [filldigit(hour), filldigit(time.getMinutes()), filldigit(time.getSeconds())];
            document.getElementsByClassName("clock")[0].innerHTML = "<span class=\"cl\">" + change.join("</span><span>:</span><span class=\"cl\">");
            document.getElementsByClassName("pam")[0].innerHTML = pam;
        }
        latest = time;
    }, 10, true);
}

function filldigit(thing) {
    return ("0".repeat(2 - thing.toString().length) + thing.toString()).split("").join("</span><span class=\"cl\">");
}

window.addEventListener("load", load, true);