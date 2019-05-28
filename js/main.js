document.body.style.backgroundImage = "url('images/hbd-script-os.png')";

var filesyee = {
    //["testing.txt"] : "hi there",
    //["yee yee.txt"] : "YEE YEE",
    //["Hi there.txt"] : "dahsdjashd",
    ["changelog.txt"] : "Script OS Change Log: #Script OS 2.9.3 -Files app working in demo mode -Happy 1 Year of Script OS #Script OS 2.9.2   -HTML Editor added   -Themes color opacity increased   -Mothers Day #Script OS 2.9.1   -Themes added   -Subscribe to PewDiePie button removed   -About app added   -App center redesigned #Script OS 2.9   -DarkMode added  -Script OS Redesigned   -App system improved   -Multi app window support   -All apps redesigned"
};

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

function saveAs(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    window.localStorage.setItem(filename, text);
    

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
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
    var appbutton = document.createElement('button');
    var apps = document.getElementById('ActionMenu');
    appbutton.innerHTML = appname;
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
    newiframe.style.height = "90%";
    newdiv.className = 'app';
    newdivhead.className = 'appheader';
    newdivhead.id = appname + "header";
    newdiv.id = appname;
    dragWindow(document.getElementById(appname));

}

var textarea;

function scriptApp(appsname){
    var app = document.createElement('div');
    var apphead = document.createElement('div');
    var appheadtext = document.createTextNode(appsname);
    var close = document.createElement('button');
    var fullscreen = document.createElement('button');
    var smallscreen = document.createElement('button');
    var desktopbody = document.getElementById('desktopbody');
    var appnumber = 0;
    var appicon = document.getElementsByClassName('appicon');
    var appchoice = document.getElementsByClassName('appchoice');
    appnumber++;
    app.tagName = appsname;
    appicon.title = appsname;
    appchoice.title = appsname;
    app.className = 'app';
    apphead.className = 'appheader';
    close.innerHTML = 'X';
    fullscreen.innerHTML = '<>';
    smallscreen.innerHTML = '><';
    apphead.appendChild(appheadtext);
    apphead.appendChild(close);
    apphead.appendChild(fullscreen);
    apphead.appendChild(smallscreen);
    app.appendChild(apphead);
    desktopbody.appendChild(app);
    app.id = appsname + appnumber;
    apphead.id = app.id + "header";
    dragWindow(document.getElementById(app.id));
    close.onclick = function () { desktopbody.removeChild(app); };
    fullscreen.onclick = function () { app.style.width = '100%'; app.style.height = '92.5%'; };
    smallscreen.onclick = function () { app.style.width = '50%'; app.style.height = '50%'; };
    if (appsname === "Browser") {
        var inputbar = document.createElement("input");
        var browserview = document.createElement('iframe');
        var backbutton = document.createElement('button');
        var forwardbutton = document.createElement('button');
        backbutton.innerHTML = '<';
        backbutton.style.borderRadius = '15px';
        backbutton.onclick = function () { window.history.back(); };
        forwardbutton.innerHTML = '>';
        forwardbutton.style.borderRadius = '15px';
        forwardbutton.onclick = function () { window.history.forward(); };
        app.appendChild(backbutton);
        app.appendChild(forwardbutton);
        inputbar.type = 'text';
        inputbar.placeholder = 'Website';
        inputbar.style.width = '75%';
        inputbar.style.borderRadius = '15px';
        inputbar.onchange = function () { browserview.src = "https://" + inputbar.value; };
        app.appendChild(inputbar);
        browserview.src = 'newtab.html';
        app.appendChild(browserview);
    } else if (appsname === "TextEdit") {
        var newbutton = document.createElement('button');
        var savebutton = document.createElement('button');
        var openbutton = document.createElement('input');
        textarea = document.createElement('textarea');
        newbutton.innerHTML = 'New';
        newbutton.onclick = function () { scriptApp("NewFile"); };
        openbutton.type = 'file';
        openbutton.id = 'fileopen';
        savebutton.innerHTML = 'Save';
        savebutton.onclick = function () { scriptApp("SaveAs"); };
        app.appendChild(newbutton);
        app.appendChild(savebutton);
        app.appendChild(openbutton);
        app.appendChild(textarea);
        textarea.id = 'textarea' + appnumber;
        textarea.style.width = '99%';
        textarea.style.height = '90%';
        var input = document.getElementById("fileopen");
        var output = document.getElementById("textarea");
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
        var themesettings = document.createElement('input');
        var about = document.createElement('input');
        var shortcuts = document.createElement('input');
        shortcuts.type = 'image';
        themesettings.type = 'image';
        backgroundsettings.type = 'image';
        about.type = 'image';
        shortcuts.src = 'images/script os shortcuts logo.png';
        themesettings.src = 'images/photosappicon.png';
        backgroundsettings.src = 'images/background icon.png';
        about.src = 'images/Script OS Logo.png';
        shortcuts.style.width = '20%';
        about.style.width = '20%';
        themesettings.style.width = '20%';
        backgroundsettings.style.width = '20%';
        about.title = 'About';
        shortcuts.title = 'Shortcuts';
        themesettings.title = "Theme Settings";
        backgroundsettings.title = 'Background Settings';
        about.onclick = function () { scriptApp("About"); };
        shortcuts.onclick = function () { scriptApp("Shortcuts"); };
        themesettings.onclick = function () { scriptApp("Themes"); };
        backgroundsettings.onclick = function () {scriptApp("Background"); };
        app.appendChild(shortcuts);
        app.appendChild(backgroundsettings);
        app.appendChild(themesettings);
        app.appendChild(about);
    } else if (appsname === "Terminal") {
        var terminput = document.createElement('input');
        var termoutput = document.createElement('textarea');
        terminput.style.width = '75%';
        terminput.style.backgroundColor = 'black';
        terminput.style.color = 'white';
        terminput.placeholder = 'Terminal Input';
        termoutput.style.width = '98%';
        termoutput.style.height = '85%';
        termoutput.style.resize = 'none';
        termoutput.style.backgroundColor = 'black';
        termoutput.style.color = 'white';
        termoutput.append("Currently disabled...");
        termoutput.append("Terminal will be activated this fall.");
        termoutput.disabled = true;
        app.appendChild(termoutput);
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
        choice4.onclick = function () { document.body.style.backgroundImage = 'url(images/2-wallpaper.png)';};
        app.appendChild(choice4);
        var choice5 = document.createElement('input');
        choice5.type = 'image';
        choice5.src = 'images/pewds-pattern.jpg';
        choice5.className = 'backgroundoption';
        choice5.onclick = function () { document.body.style.backgroundImage = 'url(images/pewds-pattern.jpg)';};
        app.appendChild(choice5);
        var choice6 = document.createElement('input');
        choice6.type = 'image';
        choice6.src = 'images/animals_hero_giraffe_1_0.jpg';
        choice6.className = 'backgroundoption';
        choice6.onclick = function () { document.body.style.backgroundImage = 'url(images/animals_hero_giraffe_1_0.jpg)';};
        app.appendChild(choice6);
        var backgroundinput = document.createElement('input');
        backgroundinput.placeholder = "Background URL";
        backgroundinput.onchange = function () {document.body.style.backgroundImage = "url('" +  backgroundinput.value; + "')"; };
        app.appendChild(backgroundinput);
    } else if(appsname === "Discord"){
        var disframe = document.createElement('iframe');
        disframe.src = 'https://discordapp.com/widget?id=499007727696084993&theme=dark';
        app.appendChild(disframe);
    } else if(appsname === "NewFile"){
        var savetext = document.createElement('h1');
        var yesbutton = document.createElement('button');
        var nobutton = document.createElement('button');
        var cancelbutton = document.createElement('button');
        savetext.innerHTML = "Do you want to save?";
        yesbutton.innerHTML = "Yes";
        yesbutton.onclick = function () { scriptApp("SaveAs"); };
        nobutton.innerHTML = "No";
        nobutton.onclick = function() { document.getElementById('text-box').value = null; };
        cancelbutton.innerHTML = "Cancel";
        cancelbutton.onclick = function() { desktopbody.removeChild(app); };
        app.appendChild(savetext);
        app.appendChild(yesbutton);
        app.appendChild(nobutton);
        app.appendChild(cancelbutton);
    } else if(appsname === "SaveAs"){
        var textsave = document.createElement('h1');
        var namefile = document.createElement('input');
        var save = document.createElement('button');
        var cancel = document.createElement('button');
        textsave.innerHTML = "Save your file!";
        namefile.placeholder = "File Name";
        save.innerHTML = "Save";
        save.onclick = function () { 
            saveAs(namefile.value, document.getElementById('textarea').value);
            filesyee[namefile.value] = document.getElementById('textarea').value;
        };
        cancel.innerHTML = "Cancel";
        cancel.onclick = function () { desktopbody.removeChild(app); };
        app.appendChild(textsave);
        app.appendChild(namefile);
        app.appendChild(save);
        app.appendChild(cancel);
    } else if(appsname === "About"){
        var scriptosversion = document.createElement('h1');
        var browserversion = document.createElement('h1');
        var copyright = document.createElement('h1');
        app.style.color = 'white';
        scriptosversion.innerHTML = "Script OS 2.9.2";
        copyright.innerHTML = "© Tyler Ruotolo 2018-2019";
        app.appendChild(scriptosversion);
        app.appendChild(copyright);
    }else if(appsname === "Themes"){
        var theme1 = document.createElement("button");
        var theme2 = document.createElement("button");
        var theme3 = document.createElement("button");
        var theme4 = document.createElement("button");
        var theme5 = document.createElement("button");
        var theme6 = document.createElement("button");
        theme1.innerHTML = "Red";
        theme1.style.backgroundColor = "red";
        theme1.onclick = function () {
            document.getElementById('navbar').style.background = 'rgba(255,0,0,0.9)'; 
            document.getElementById('topnav').style.background = 'rgba(255,0,0,0.9)'; 
        };
        theme2.innerHTML = "Orange";
        theme2.style.backgroundColor = 'orange';
        theme2.onclick = function () {
            document.getElementById('navbar').style.background = 'rgba(255,165,0,0.9)'; 
            document.getElementById('topnav').style.background = 'rgba(255,165,0,0.9)'; 
        };
        theme3.innerHTML = "Yellow";
        theme3.style.backgroundColor = 'yellow';
        theme3.onclick = function () {
            document.getElementById('navbar').style.background = 'rgba(255,255,0,0.9)'; 
            document.getElementById('topnav').style.background = 'rgba(255,255,0,0.9)';
        };
        app.appendChild(theme1);
        app.appendChild(theme2);
        app.appendChild(theme3);
    } else if(appsname === "VisualCode"){
        var codearea = document.createElement("textarea");
        var codeviewer = document.createElement("iframe");
        var openbutton = document.createElement("input");
        openbutton.type = 'file';
        const defaultText = `<!DOCTYPE html> 
            <html lang="en"> 
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                </head>
                <body>
                    <h1>Hello, World</h1>
                </body>
            </html>`;
        codearea.value = defaultText;
        openbutton.addEventListener("change", function () {
            if (this.files && this.files[0]) {
                var myFile = this.files[0];
                var reader = new FileReader();
                reader.addEventListener('load', function (e) {
                    codearea.value = e.target.result;
                });

                reader.readAsBinaryString(myFile);
            }
        });
        codearea.addEventListener('input', () => {
            codeviewer.srcdoc = codearea.value;
        });
        codeviewer.srcdoc = codearea.value;
        codearea.onkeydown = function () {
            if(event.keyCode === 9){
                var v = this.value, s = this.selectionStart,e = this.selectionEnd;
                this.value = v.substring(0, s) + '\t' + v.substring(e);
                this.selectionStart = this.selectionEnd = s + 1;
                return false;
            }
        };
        codearea.style.resize = 'none';
        codeviewer.style.resize = 'none';
        codeviewer.style.backgroundColor = 'white';
        codearea.style.height = '48%';
        codearea.style.width = '100%';
        codearea.style.display = 'block';
        codeviewer.style.height = '48%';
        codeviewer.style.width = '100%';
        codeviewer.style.display = 'block';
        apphead.appendChild(openbutton);
        app.appendChild(codearea);
        app.appendChild(codeviewer);
    } else if(appsname === "Files"){
        for (var name in filesyee) {
            var fbutt = document.createElement("button");
            fbutt.innerHTML = name;
            fbutt.onclick = function () { openSFile(filesyee, name); };
            app.appendChild(fbutt);
        }
    } else {
        var unavailableapp = document.createElement('h1');
        unavailableapp.innerHTML = "Currently Unavailable";
        app.appendChild(unavailableapp);
    }
}

function openSFile(storage,filename){
    var innercontents = storage[filename];
    scriptApp("TextEdit");
    textarea.value = innercontents;
}

function darkMode(){
    document.getElementById('navbar').style.background = 'rgba(0,0,0,0.5)';
    document.getElementById('topnav').style.background = 'rgba(0,0,0,0.5)';
}

function lightMode(){
    document.getElementById('navbar').style.background = 'rgba(255,255,255,0.5)';
    document.getElementById('topnav').style.background = 'rgba(255,255,255,0.5)';
}