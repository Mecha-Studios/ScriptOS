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
        var uh1 = document.createElement('h1');
        var unavailable = document.createElement('p');
        uh1.innerHTML = "Currently Unavailable";
        uh1.style.color = 'white';
        app.appendChild(uh1);
        unavailable.innerHTML = "The Script OS file system is currently being worked on";
        unavailable.style.color = 'white';
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
        var backgroundsettings = document.createElement('input');
        var about = document.createElement('input');
        backgroundsettings.type = 'image';
        about.type = 'image';
        backgroundsettings.src = 'images/background icon.png';
        about.src = 'images/Script OS Logo.png';
        about.style.width = '20%';
        backgroundsettings.style.width = '20%';
        about.title = 'About';
        backgroundsettings.title = 'Background Settings';
        about.onclick = function () { scriptApp("About"); };
        backgroundsettings.onclick = function () {scriptApp("Background"); };
        app.appendChild(backgroundsettings);
        app.appendChild(about);
    } else if (appsname === "Terminal") {
        var terminput = document.createElement('textarea');
        terminput.style.width = '98%';
        terminput.style.height = '98%';
        terminput.style.backgroundColor = 'black';
        terminput.style.color = 'white';
        terminput.append("Currently disabled...");
        terminput.append("Terminal will be activated this fall.");
        terminput.disabled;
        app.appendChild(terminput);
    } else if (appsname === "Background"){
        var choice1 = document.createElement('input');
        choice1.type = 'image';
        choice1.src = 'images/landscape.jpg';
        choice1.className = 'backgroundoption';
        choice1.onclick = function () { document.body.style.backgroundImage = 'url(images/landscape.jpg)'; };
        app.appendChild(choice1);
        var choice2 = document.createElement('input');
        choice2.type = 'image';
        choice2.src = 'images/imac-pro-wallpaper.jpg';
        choice2.className = 'backgroundoption';
        choice2.onclick = function () { document.body.style.backgroundImage = 'url(images/imac-pro-wallpaper.jpg)'; };
        app.appendChild(choice2);
        var choice3 = document.createElement('input');
        choice3.type = 'image';
        choice3.src = 'images/Tron-Lamborghini-Aventador-4.jpg';
        choice3.className = 'backgroundoption';
        choice3.onclick = function () { document.body.style.backgroundImage = 'url(images/Tron-Lamborghini-Aventador-4.jpg)'; };
        app.appendChild(choice3);
        var choice4 = document.createElement('input');
        choice4.type = 'image';
        choice4.src = 'images/2-wallpaper.png';
        choice4.className = 'backgroundoption';
        choice4.onclick = function () { document.body.style.backgroundImage = 'url(images/2-wallpaper.png)'; };
        app.appendChild(choice4);
        var choice5 = document.createElement('input');
        choice5.type = 'image';
    } else {
        var unavailableapp = document.createElement('h1');
        unavailableapp.innerHTML = "Currently Unavailable";
        app.appendChild(unavailableapp);
    }
}

dragWindow(document.getElementById('AppCenter'));