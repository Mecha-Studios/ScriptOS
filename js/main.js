function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('datetime').innerHTML = h + ":" + m + " | " + 
    (("0"+(today.getMonth()+1)).slice(-2)) +"/"+ (("0"+today.getDate()).slice(-2)) +"/"+ (today.getFullYear());
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i; }
    return i;
}

var codearea = document.createElement('textarea');
var filecontainer = document.createElement('div');
var filesapp = localStorage.getItem("Files");

if(filesapp){
    filecontainer.innerHTML = localStorage.getItem("Files");
}

function saveFileAs(filename, innercontents){
    localStorage.setItem(filename, innercontents);
    fileobj.innerHTML = filename;
    filecontainer.appendChild(fileobj);
}

function openFile(filesname){
    scriptApp('VisualCode');
    var filecontent = localStorage.getItem(filesname);
    codearea.value = filecontent; 
}

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

function appInstall(appnamed, urll){
    var appbutton = document.createElement('button');
    appbutton.innerHTML = appnamed;
    appbutton.onclick = function () { openApp(appnamed, urll); };
    appcenter.appendChild(appbutton);
}

var textarea = document.createElement("textarea");
var navbar = document.createElement('div');
var desktopbody = document.getElementById('desktopbody');
var startupscreen = document.createElement('img');
startupscreen.style.width = '100%';
startupscreen.style.height = '100%';
startupscreen.src = 'images/Script-OS.gif';
var actioncenter = document.createElement('div');
actioncenter.style = 'position: absolute; width: 100%; top: 100px; animation: slidetop; animation-duration: 2s; height: 25%;';
var appcenter = document.createElement('div');

function startUp(){
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = 'black';
    desktopbody.appendChild(startupscreen);
    setTimeout(loadDesktop, 2500);
}

var websearch = document.createElement('input');
var searchbutt = document.createElement('input');
var exitbutt = document.createElement('input');
websearch.style = 'border-radius: 25px; width: 75%; height: 100px; font-size: 75px; z-index:10; left:0; top:100px; animation:slidetop; animation-duration: 2s; position:absolute; background: rgba(255,255,255,0.5)';
websearch.type = 'text';
websearch.placeholder = 'Search the web';
websearch.onchange = function() { scriptApp("Browser"); browserview.src = "https://www.bing.com/search?q=" + websearch.value; }
searchbutt.onclick = function () {scriptApp("Browser"); browserview.src = "https://www.bing.com/search?q=" + websearch.value;};
searchbutt.type = 'image';
searchbutt.src = 'https://www.tcwreckersales.com/wp-content/uploads/2017/01/search-icon-white.png';
searchbutt.className = 'appicon';
searchbutt.style = 'width:50px; height:50px; animation:slidetop; z-index:10; animation-duration: 4s; position:absolute; right:0; top: 100px;';
exitbutt.onclick = function () {websearch.value = ''; desktopbody.removeChild(websearch); desktopbody.removeChild(searchbutt); desktopbody.removeChild(exitbutt);};
exitbutt.type = 'image';
exitbutt.src = 'images/exit button.png';
exitbutt.className = 'appicon';
exitbutt.style = 'width:50px; height:50px; position:absolute; z-index:10; animation:slidetop; animation-duration: 3s; right:55px; top: 100px;';

function loadDesktop(){
    desktopbody.removeChild(startupscreen);
    document.body.style.backgroundImage = 'url("images/Script OS 3.0 .png")';
    navbar.className = 'navbar';
    navbar.id = 'navbar';
    desktopbody.appendChild(navbar);
    document.body.style.backgroundImage = 'url';

    var actionmenuicon = document.createElement('input');
    actionmenuicon.type = 'image';
    actionmenuicon.src = 'images/Script OS logo 3.png';
    actionmenuicon.onclick = function () {desktopbody.appendChild(actioncenter); };
    actionmenuicon.title = 'ActionMenu';
    actionmenuicon.className = 'appicon';
    actionmenuicon.style = "width:50px; height:50px; z-index: 100; position:absolute; left:0;" ;
    navbar.appendChild(actionmenuicon);

    var searchweb = document.createElement('input');
    searchweb.type = 'image';
    searchweb.src = 'https://www.tcwreckersales.com/wp-content/uploads/2017/01/search-icon-white.png';
    searchweb.onclick = function () {desktopbody.appendChild(websearch); desktopbody.appendChild(searchbutt); desktopbody.appendChild(exitbutt);};
    searchweb.title = 'Search the Web';
    searchweb.className = 'appicon';
    searchweb.style = "width:50px; height:50px; z-index: 100; position:absolute; right:0;";
    navbar.appendChild(searchweb);

    var appicon1 = document.createElement('input');
    appicon1.type = 'image';
    appicon1.src = 'images/Settings-icon.png';
    appicon1.className = 'appicon';
    appicon1.title = 'Settings';
    appicon1.onclick = function () { scriptApp('Settings'); };
    navbar.appendChild(appicon1);
    
    var appicon2 = document.createElement('input');
    appicon2.type = 'image';
    appicon2.src = 'images/script os S Browser icon.png';
    appicon2.className = 'appicon';
    appicon2.title = 'S Browser';
    appicon2.onclick = function () { scriptApp('Browser')}
    navbar.appendChild(appicon2);

    var appicon3 = document.createElement('input');
    appicon3.type = 'image';
    appicon3.src = 'images/script os files icon.png';
    appicon3.className = 'appicon';
    appicon3.title = 'Files';
    appicon3.onclick = function () { scriptApp('Files')}
    navbar.appendChild(appicon3);

    actioncenter.className = 'app';

    var app1 = document.createElement('input');
    app1.type = 'image';
    app1.src = "images/Settings-icon.png";
    app1.title = 'Settings';
    app1.onclick = function () {scriptApp('Settings');};
    app1.className = 'appchoice';
    appcenter.appendChild(app1);

    var app2 = document.createElement('input');
    app2.type = 'image';
    app2.src = "images/script os S Browser icon.png";
    app2.title = 'S Browser';
    app2.onclick = function () {scriptApp('Browser');};
    app2.className = 'appchoice';
    appcenter.appendChild(app2);

    var app3 = document.createElement('input');
    app3.type = 'image';
    app3.src = "images/script os files icon.png";
    app3.title = 'Files';
    app3.onclick = function () {scriptApp('Files');};
    app3.className = 'appchoice';
    appcenter.appendChild(app3);

    var app4 = document.createElement('input');
    app4.type = 'image';
    app4.src = "images/com.JellyBeanUser.apk.app.editor.png";
    app4.title = 'TextEdit';
    app4.onclick = function () {scriptApp('TextEdit');};
    app4.className = 'appchoice';
    appcenter.appendChild(app4);

    var app5 = document.createElement('input');
    app5.type = 'image';
    app5.src = "images/terminal icon.png";
    app5.title = 'Terminal';
    app5.onclick = function () {scriptApp('Terminal');};
    app5.className = 'appchoice';
    appcenter.appendChild(app5);

    var app6 = document.createElement('input');
    app6.type = 'image';
    app6.src = "https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-512.png";
    app6.title = 'Discord[BETA]';
    app6.onclick = function () {scriptApp('Discord');};
    app6.className = 'appchoice';
    appcenter.appendChild(app6);

    var app7 = document.createElement('input');
    app7.type = 'image';
    app7.src = "images/VisualCode logo.png";
    app7.title = 'VisualCode';
    app7.onclick = function () {scriptApp('VisualCode');};
    app7.className = 'appchoice';
    appcenter.appendChild(app7);

    var app8 = document.createElement('input');
    app8.type = 'image';
    app8.src = "images/script os shortcuts logo.png";
    app8.title = 'Shortcuts';
    app8.onclick = function () {scriptApp('Shortcuts');};
    app8.className = 'appchoice';
    appcenter.appendChild(app8);

    var app9 = document.createElement('input');
    app9.type = 'image';
    app9.src = "images/vmOS.png";
    app9.title = 'vmOS';
    app9.onclick = function () {scriptApp('vmOS');};
    app9.className = 'appchoice';
    appcenter.appendChild(app9);

    var app10 = document.createElement('input');
    app10.type = 'image';
    app10.src = "images/appstore logo.png";
    app10.title = 'AppStore';
    app10.onclick = function () {scriptApp('AppStore');};
    app10.className = 'appchoice';
    appcenter.appendChild(app10);

    var actionarea = document.createElement('div');
    actionarea.id = 'actionarea';
    actionarea.appendChild(appcenter);
    actioncenter.appendChild(actionarea);

    var closebutt = document.createElement('button');
    closebutt.innerHTML = 'Close';
    closebutt.onclick = function () { desktopbody.removeChild(actioncenter); };
    actionarea.appendChild(closebutt);

    var reloadbutt = document.createElement('button');
    reloadbutt.innerHTML = 'Reload';
    reloadbutt.onclick = function () { location.reload(); };
    actionarea.appendChild(reloadbutt);

    var signoutbutt = document.createElement('button');
    signoutbutt.innerHTML = 'Sign Out';
    signoutbutt.onclick = function () { signOut(actioncenter); };
    actionarea.appendChild(signoutbutt);

    var shutdownbutt = document.createElement('button');
    shutdownbutt.innerHTML = 'Shutdown';
    actionarea.appendChild(shutdownbutt);

}

function signIn(){
    desktopbody.removeChild(headertext);
    desktopbody.removeChild(timetxt);
    loginbar.removeChild(logintxt);
    desktopbody.removeChild(loginbar);
    desktopbody.appendChild(navbar);
}

var headertext = document.createElement('h2');
var timetxt = document.createElement('h1');
var loginbar = document.createElement('div');
var logintxt = document.createElement('hp');

function signOut(childthing){
    headertext.innerHTML = 'Script OS';
    headertext.style.fontSize = '100px';
    timetxt.style.fontSize = '85px';
    logintxt.innerHTML = 'Login';
    loginbar.className = 'navbar';
    logintxt.style.fontSize = '50px';
    headertext.style.animation = 'rgb';
    headertext.style.animationDuration = '6s';
    timetxt.style.animation = 'rgb';
    timetxt.style.animationDuration = '6s';
    desktopbody.style.color = 'white';
    desktopbody.style.textAlign = 'center';
    loginbar.onclick = function () { signIn(); };
    loginbar.appendChild(logintxt);
    desktopbody.removeChild(navbar);
    desktopbody.removeChild(childthing);
    desktopbody.appendChild(headertext);
    desktopbody.appendChild(timetxt);
    desktopbody.appendChild(loginbar);
    startLockTime();
    function startLockTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        m = checkLockTime(m);
        timetxt.innerHTML = h + ":" + m;
        var t = setTimeout(startLockTime, 500);
    }

    function checkLockTime(i) {
        if (i < 10) { i = "0" + i; }
        return i;
    }
}

var conmenu1 = document.createElement('div');
var conmenu1butt1 = document.createElement('li');
var conmenu1butt2 = document.createElement('li');
var conmenu1butt3 = document.createElement('li');
var copybutton = document.createElement('li');
conmenu1.style.color = 'white';
conmenu1.className = 'menu';
conmenu1butt1.innerHTML = 'Customize';
conmenu1butt1.onclick = function () { scriptApp('Background'); };
conmenu1butt2.innerHTML = 'Settings';
conmenu1butt2.onclick = function () { scriptApp('Settings'); };
copybutton.onclick = function () { document.execCommand('Copy'); };
copybutton.innerHTML = 'Copy';
desktopbody.appendChild(conmenu1);
conmenu1.appendChild(conmenu1butt1);
conmenu1.appendChild(conmenu1butt2);

function scriptApp(appsname){
    var app = document.createElement('div');
    var apphead = document.createElement('div');
    var appheadtext = document.createTextNode(appsname);
    var close = document.createElement('input');
    var fullscreen = document.createElement('input');
    var smallscreen = document.createElement('input');
    var headbuttdiv = document.createElement('div');
    var headtextdiv = document.createElement('div');
    var appnumber = Math.random();
    headtextdiv.style.textAlign = 'left';
    headtextdiv.style.width = '50%';
    headtextdiv.style.cssFloat = 'left';
    headbuttdiv.style.textAlign = 'right';
    headbuttdiv.style.width = '50%';
    headbuttdiv.style.cssFloat = 'right';
    appnumber++;
    app.className = 'app';
    apphead.className = 'appheader';
    close.type = 'image';
    close.title = 'Close';
    close.style.width = '20px';
    close.src = 'images/exit button.png';
    fullscreen.title = 'Fullscreen';
    fullscreen.type = 'image';
    fullscreen.style.width = '20px';
    fullscreen.src = 'images/fullscreen button.png';
    fullscreen.style.textAlign = 'right';
    smallscreen.type = 'image';
    smallscreen.title = 'Small';
    smallscreen.style.width = '20px';
    smallscreen.src = 'images/small screen button.png';
    headtextdiv.append(appheadtext);
    apphead.append(headtextdiv);
    apphead.append(headbuttdiv);
    headbuttdiv.append(close);
    headbuttdiv.append(fullscreen);
    headbuttdiv.append(smallscreen);
    app.appendChild(apphead);
    desktopbody.appendChild(app);
    app.id = appsname + appnumber;
    apphead.id = app.id + "header";
    dragWindow(document.getElementById(appsname + appnumber));
    close.onclick = function () { desktopbody.removeChild(app); };
    fullscreen.onclick = function () { app.style.width = '100%'; app.style.height = '92.5%'; app.style.top = '20px'; app.style.left = '0px'; };
    smallscreen.onclick = function () { app.style.width = '50%'; app.style.height = '50%'; };
    if (appsname === "Browser") {
        var inputbar = document.createElement("input");
        browserview = document.createElement('iframe');
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
        browserview.id = "browserview" + appnumber;
        browserview.src = 'newtab.html';
        app.appendChild(browserview);
        app.appendChild(browserview);
    } else if (appsname === "TextEdit") {
        var newbutton = document.createElement('button');
        var savebutton = document.createElement('button');
        var openbutton = document.createElement('input');
        close.onclick = function () { desktopbody.removeChild(app); conmenu1.removeChild(copybutton);};
        newbutton.innerHTML = 'New';
        newbutton.onclick = function () { scriptApp("NewFile"); };
        openbutton.type = 'file';
        openbutton.id = 'fileopen';
        savebutton.innerHTML = 'Save';
        savebutton.onclick = function () { scriptApp("SaveTxt"); };
        app.appendChild(newbutton);
        app.appendChild(savebutton);
        app.appendChild(openbutton);
        app.appendChild(textarea);
        conmenu1.appendChild(copybutton);
        textarea.id = 'textarea' + app.id;
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
        about.src = 'images/Script OS Logo 3.png';
        shortcuts.style.width = '10%';
        about.style.width = '10%';
        themesettings.style.width = '10%';
        backgroundsettings.style.width = '10%';
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
        choice3.onclick = function () { document.body.style.backgroundImage = 'url("images/lamborghini ting.png")'; };
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
        var choice7 = document.createElement('input');
        choice7.type = 'image';
        choice7.src = 'images/hbd-script-os.png';
        choice7.className = 'backgroundoption';
        choice7.onclick = function () { document.body.style.backgroundImage = 'url(images/hbd-script-os.png)';};
        app.appendChild(choice7);
        var backgroundinput = document.createElement('input');
        var backgroundaddbutt = document.createElement('button');
        backgroundaddbutt.innerHTML = 'Add';
        backgroundinput.placeholder = "Background URL";
        backgroundaddbutt.onclick = function () {
            document.body.style.backgroundImage = "url('" +  backgroundinput.value + "')"; 
            custombackground = document.createElement('input');
            custombackground.type = 'image';
            custombackground.src = backgroundinput.value;
            custombackground.className = 'backgroundoption';
            custombackground.onclick = function () { document.body.style.backgroundImage = "url('" +  backgroundinput.value + "')";};
            app.appendChild(custombackground);
        };
        app.appendChild(backgroundinput);
        app.appendChild(backgroundaddbutt);
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
            saveFileAs(namefile.value, codearea.value);
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
        browserversion.innerHTML = objbrowserName + ": " + objfullVersion;
        scriptosversion.innerHTML = "Script OS 3.0[BETA]";
        copyright.innerHTML = "© Tyler Ruotolo 2018-2019";
        app.appendChild(scriptosversion);
        app.appendChild(copyright);
        app.appendChild(browserversion);
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
        var codeviewer = document.createElement("iframe");
        var openvbutton = document.createElement("input");
        var savecode = document.createElement('button');
        openvbutton.type = 'file';
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
        savecode.innerHTML = 'Save';
        conmenu1.appendChild(copybutton);
        savecode.onclick = function () {
            scriptApp('SaveAs');
        };
        openvbutton.addEventListener("change", function () {
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
        app.appendChild(savecode);
        app.appendChild(openvbutton);
        app.appendChild(codearea);
        app.appendChild(codeviewer);
    } else if(appsname === "Files"){
        fileobj = document.createElement('button');
        localStorage.setItem("Files", filecontainer.innerHTML);
        fileobj.onclick = function(){ openFile(fileobj.innerHTML);};
        app.appendChild(filecontainer);
    } else if(appsname === "Shortcuts"){
        var appnameshort = document.createElement('input');
        var shortadd = document.createElement('button');
        var newshortcut = document.createElement('input');
        var navbar = document.getElementById("navbar");
        newshortcut.type = 'image';
        newshortcut.src = 'images/script os shortcuts logo.png';
        newshortcut.style.width = '50px';
        newshortcut.style.height = '50px';
        newshortcut.style.textAlign = 'center';
        appnameshort.type = 'text';
        shortadd.innerHTML = 'Add';
        app.appendChild(appnameshort);
        app.appendChild(shortadd);
        shortadd.onclick = function () {
            newshortcut.title = appnameshort.value;
            newshortcut.innerHTML = appnameshort.value;
            newshortcut.onclick = function () {
                scriptApp(appnameshort.value);
            };
            navbar.appendChild(newshortcut);
        };
    } else if(appsname === "vmOS"){
        var osview = document.createElement('iframe');
        var oschoice1 = document.createElement('button');
        var oschoice2 = document.createElement('button');
        var oschoice3 = document.createElement('button');
        var oschoice4 = document.createElement('button');
        osview.style.width = '98%';
        osview.style.height = '92.5%';
        oschoice1.innerHTML = 'lineOS';
        oschoice1.onclick = function () {osview.src = 'https://os.davecode.me';};
        oschoice2.innerHTML = 'Windows 93';
        oschoice2.onclick = function () {osview.src = 'https://windows93.net';};
        oschoice3.innerHTML = 'Script OS';
        oschoice3.onclick = function () {osview.src = 'https://scriptos.tk/';};
        oschoice4.innerHTML = 'eyeOS';
        oschoice4.onclick = function () {osview.src = 'https://s2.demo.opensourcecms.com/eyeOS/';};
        app.appendChild(oschoice1);
        app.appendChild(oschoice2);
        app.appendChild(oschoice3);
        app.appendChild(oschoice4);
        app.appendChild(osview);
    } else if(appsname === "AppStore"){
        var appstoretxt = document.createElement('h1');
        appstoretxt.innerHTML = 'Coming September 2019';
        app.appendChild(appstoretxt);
    } else {
        var unavailableapp = document.createElement('h1');
        unavailableapp.innerHTML = "Currently Unavailable";
        app.appendChild(unavailableapp);
    }
}


var objappVersion = navigator.appVersion;
var objAgent = navigator.userAgent; 
var objbrowserName = navigator.appName; 
var objfullVersion = ''+parseFloat(navigator.appVersion); 
var objBrMajorVersion = parseInt(navigator.appVersion,10); 
var objOffsetName,objOffsetVersion,ix; 
if ((objOffsetVersion=objAgent.indexOf("Chrome"))!=-1) { 
    objbrowserName = "Chrome"; 
    objfullVersion = objAgent.substring(objOffsetVersion+7); 
}else if ((objOffsetVersion=objAgent.indexOf("MSIE"))!=-1) { 
    objbrowserName = "Microsoft Internet Explorer"; 
    objfullVersion = objAgent.substring(objOffsetVersion+5); 
}else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) { 
    objbrowserName = "Firefox"; 
}else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) { 
    objbrowserName = "Safari"; 
    objfullVersion = objAgent.substring(objOffsetVersion+7); 
    if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) objfullVersion = objAgent.substring(objOffsetVersion+8); 
}

function darkMode(){
    navbar.style.background = 'rgba(0,0,0,0.5)';
    document.getElementById('topnav').style.background = 'rgba(0,0,0,0.5)';
    websearch.style.background = 'rgba(0,0,0,0.5)';
    websearch.style.color = 'white';
}

function lightMode(){
    navbar.style.background = 'rgba(255,255,255,0.5)';
    document.getElementById('topnav').style.background = 'rgba(255,255,255,0.5)';
    websearch.style.background = 'rgba(255,255,255,0.5)';
    websearch.style.color = 'black';
}