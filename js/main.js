function dragWindow(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

dragWindow(document.getElementById("mydiv"));
dragWindow(document.getElementById("settings"));
dragWindow(document.getElementById("backgroundsettings"));
dragWindow(document.getElementById("usersettings"));
dragWindow(document.getElementById("browser"));
dragWindow(document.getElementById("filesapp"));
dragWindow(document.getElementById("apps"));
dragWindow(document.getElementById("textapp"));
dragWindow(document.getElementById("htmlview"));

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('txt').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

var input = document.getElementById("fileopen");
var output = document.getElementById("text-box");


input.addEventListener("change", function () {
    if (this.files && this.files[0]) {
        var myFile = this.files[0];
        var reader = new FileReader();

        reader.addEventListener('load', function (e) {
            output.textContent = e.target.result;
        });

        reader.readAsBinaryString(myFile);
    }
});

var htmlinput = document.getElementById("openhtml").value;
document.getElementById('htmlviewer').src = htmlinput;