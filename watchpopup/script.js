window.onload = function() {
    document.getElementById("typeUrl").addEventListener("focusin", function() {
        document.getElementById("wrongUrl").style.opacity = 0;
    }, true);
    document.getElementById("typeUrl").addEventListener("focusout", checkURL, true);
}

function checkURL() {
    if (document.getElementById("typeUrl").value.replace(" ", "") == "") return;
    var check = RegExp(/(https:\/\/|http:\/\/)?(www\.)?youtube\.com\/watch_popup\?v=[a-z|A-Z|0-9]{11}(&feature=youtu\.be)?/);
    var checked = check.test(document.getElementById("typeUrl").value);
    if (checked == false) document.getElementById("wrongUrl").style.opacity = 1;
    else {
        var url = document.getElementById("typeUrl").value;
        url = url.replace(/(https:\/\/|http:\/\/)?(www\.)?youtube\.com\/watch_popup\?v=/, "");
        url = url.replace("&feature=youtu\.be", "");
        location.href = "https://youtube.com/embed/" + url;
    }
}
