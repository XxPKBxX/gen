document.getElementById("generate").disabled = "";
document.getElementById("generateReverse").disabled = "";

function generate(obj, reversed) {
    document.getElementById("generate").disabled = "true";
    document.getElementById("generateReverse").disabled = "true";

    var sentence = document.getElementById("sentence").value;
    var prefix = document.getElementById("prefix").value;
    var suffix = document.getElementById("suffix").value;

    document.getElementById("generated").innerText = "";

    for (var i = 0; i < sentence.length; i++) {
        var answer = ""
        var toAdd = sentence.substring(0, i + 1);

        if (sentence.substring(i, i + 1) != " ") {
            if (prefix != "") answer += prefix;

            answer += toAdd;

            if (suffix != "") answer += suffix;

            document.getElementById("generated").innerText += answer + "\n";
        }
    }
    if (reversed == true) {
        for (var i = sentence.length; i >= 0; i--) {
            var answer = ""
            var toAdd = sentence.substring(0, i + 1);

            if (sentence.substring(i, i + 1) != " " && toAdd != sentence) {
                if (prefix != "") answer += prefix;

                answer += toAdd;

                if (suffix != "") answer += suffix;

                document.getElementById("generated").innerText += answer + "\n";
            }
        }
    }

    document.getElementById("generate").disabled = "";
    document.getElementById("generateReverse").disabled = "";
}
