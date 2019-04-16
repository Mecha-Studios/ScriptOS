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

function saveAs(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function closeText() {
    var save = confirm("Do you want to save?");
    if (save === true) {
        document.getElementById('savearea').style.display = 'inline';
    } else {
        document.getElementById('textapp').style.display = 'none';
        document.getElementById('text-box').value = "";
        input.value = "";
    }
}

function newTextFile() {
    var save = confirm("Do you want to save?");
    if (save === true) {
        document.getElementById('savearea').style.display = 'inline';
    } else {
        document.getElementById('text-box').value = "";
        input.value = "";
    }
}

const menu = document.querySelector(".menu");
let menuVisible = false;

const toggleMenu = command => {
    menu.style.display = command === "show" ? "block" : "none";
    menuVisible = !menuVisible;
};

const setPosition = ({ top, left }) => {
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    toggleMenu("show");
};

window.addEventListener("click", e => {
    if (menuVisible) toggleMenu("hide");
});

window.addEventListener("contextmenu", e => {
    e.preventDefault();
    const origin = {
        left: e.pageX,
        top: e.pageY
    };
    setPosition(origin);
    return false;
});

function openApp(appname, url) {
    var newdiv = document.createElement('div');
    var newdivhead = document.createElement('div');
    var headtext = document.createTextNode(appname);
    var newiframe = document.createElement('iframe');
    var closebutton = document.createElement('button');
    var appbutton = document.createElement('input');
    var apps = document.getElementById('apps');
    appbutton.type = 'button';
    appbutton.value = appname;
    appbutton.onclick = function () { document.getElementById(appname).style.display = 'inline'; };
    apps.appendChild(appbutton);
    closebutton.innerHTML = "X";
    closebutton.onclick = function () { document.getElementById(appname).style.display = 'none'; };
    document.body.appendChild(newdiv);
    newdiv.appendChild(newdivhead);
    newdivhead.appendChild(headtext);
    newdivhead.appendChild(closebutton);
    newdiv.appendChild(newiframe);
    newiframe.src = url;
    newdiv.className = 'app';
    newdivhead.className = 'appheader';
    newdivhead.id = appname + "header";
    newdiv.id = appname;
    dragWindow(document.getElementById(appname));

}

function scriptApp(appsname){
    var app = document.createElement('div');
    var apphead = document.createElement('div');
    var appheadtext = document.createTextNode(appsname);
    var close = document.createElement('button');
    var fullscreen = document.createElement('button');
    var desktopbody = document.getElementById('desktopbody');
    var appnumber = Math.floor((Math.random() * 100) + 1);
    var appicon = document.getElementsByClassName('appicon');
    var appchoice = document.getElementsByClassName('appchoice');
    appicon.title = appsname;
    appicon.title = appsname;
    app.className = 'app';
    apphead.className = 'appheader';
    close.innerHTML = 'X';
    fullscreen.innerHTML = '[]';
    apphead.appendChild(appheadtext);
    apphead.appendChild(close);
    apphead.appendChild(fullscreen);
    app.appendChild(apphead);
    desktopbody.appendChild(app);
    app.id = appsname + appnumber;
    apphead.id = app.id + "header";
    dragWindow(document.getElementById(app.id));
    close.onclick = function () { desktopbody.removeChild(app); };
    fullscreen.onclick = function () { app.style.width = '100%'; app.style.height = '92.5%'; };
    if (appsname === "Browser") {
        var inputbar = document.createElement("input");
        var browserview = document.createElement('iframe');
        var backbutton = document.createElement('button');
        var forwardbutton = document.createElement('button');
        backbutton.innerHTML = '<';
        backbutton.onclick = function () { window.history.back(); };
        forwardbutton.innerHTML = '>';
        forwardbutton.onclick = function () { window.history.forward(); };
        app.appendChild(backbutton);
        app.appendChild(forwardbutton);
        inputbar.type = 'text';
        inputbar.placeholder = 'Website';
        inputbar.style.width = '75%';
        inputbar.onchange = function () { browserview.src = inputbar.value; };
        app.appendChild(inputbar);
        browserview.src = 'newtab.html';
        app.appendChild(browserview);
    } else if (appsname === "Files") {
        var fs = fileSytemObject.getFolder('./Script OS FS');
	var listfiles = [fs];
	for(var i = 0; i < listfiles.length; i++){
		var p = document.createElement('p');
		p.innerHTML = listfiles[i];
		app.appendChild(p);
	}
        app.appendChild(unavailable);
    } else if (appsname === "TextEdit") {
        var savebutton = document.createElement('button');
        var openbutton = document.createElement('input');
        var filenameinput = document.createElement('input');
        var textarea = document.createElement('textarea');
        filenameinput.type = 'text';
        openbutton.type = 'file';
        openbutton.id = 'fileopen';
        savebutton.innerHTML = 'Save';
        savebutton.onclick = function () { saveAs(filenameinput.value, textarea.value); };
        app.appendChild(openbutton);
        app.appendChild(filenameinput);
        app.appendChild(savebutton);
        app.appendChild(textarea);
        textarea.id = 'text-box';
        textarea.style.width = '99%';
        textarea.style.height = '90%';
        var input = document.getElementById("fileopen");
        var output = document.getElementById("text-box");
        input.addEventListener("change", function () {
            if (this.files && this.files[0]) {
                var myFile = this.files[0];
                var reader = new FileReader();

                reader.addEventListener('load', function (e) {
                    output.value = e.target.result;
                });

                reader.readAsBinaryString(myFile);
            }
        });

    } else if (appsname === "Settings") {
        var uh12 = document.createElement('h1');
        var unavailable2 = document.createElement('p');
        uh12.innerHTML = "Currently Disabled";
        unavailable2.innerHTML = "The Settings app is currently not available";
        app.appendChild(uh1);
        app.appendChild(unavailable);
    } else if(appsname === "Terminal"){
	var inputcom = document.createElement('textarea');
	inputcom.innerHTML = "Welcome to the Script OS Terminal. It is currently unavailable at this time!";
	inputcom.style.background = "black";
	inputcom.style.color = "white";
	inputcom.style.width = "98%";
	inputcom.style.height = "98%";
	inputcom.disabled = true;
	app.appendChild(inputcom);
    }
}

dragWindow(document.getElementById('AppCenter'));

