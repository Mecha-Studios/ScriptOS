/*  Copyright Tyler Ruotolo 2018-2020
    Script OS  Copyright (C) 2018-2020 Tyler Ruotolo
    Resdistribution is allowed under certain conditions,
    See LICENSE file for details.
*/

var scriptosversion = "4.0";
var defaultengine;
var saveddefault = localStorage.getItem("DefaultEngine");
var batterybar = document.getElementById("batteryprogress");

function battLevel(){
    navigator.getBattery()
    .then(function(battery) {
        var batterylevel = Math.floor(battery.level * 100) / 100;
        console.log(battery.level);
        if(batterylevel >= .5){
            batterybar.style.backgroundColor = "limegreen";
        } else if(batterylevel <= .5){
            batterybar.style.backgroundColor = "yellow";
        } else if(batterylevel <= .3){
            batterybar.style.backgroundColor = "red";
        }
        document.getElementById('battlevelthing').innerHTML = "Battery: " + batterylevel*100 + "%";
        batterybar.value = batterylevel*100;
    })
    setTimeout(battLevel, 500);
}

//Time(Clock stuff)
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('datetime').innerHTML = h + ":" + m + " | " + 
    (("0"+(today.getMonth()+1)).slice(-2)) +"/"+ (("0"+today.getDate()).slice(-2)) +"/"+ (today.getFullYear());
    var t = setTimeout(startTime, 500);
}



var savednav = localStorage.getItem("savednav");
var savedesk = localStorage.getItem("savedesk");

function checkTime(i) {
    if (i < 10) { i = "0" + i; }
    return i;
}

var changelog = `Script OS Changelog:
#ScriptOS 4.0[BETA]
-Browser:
    -Search from inputbar(thing you type a URL into)
-ScriptAI:
    -More jokes
    -Redesign
    -Launch apps from ScriptAI(app names are case sensitive)
-ControlPanel added(Press ESC):
    -DarkMode
    -LowPower
    -Brightness
-App UI:
    -App header buttons redesigned
    -App borders removed
    -App shadows removed
#Script OS 3.8
-Happy Birthday Script OS
-New commands and jokes added to ScriptAI
-New backgrounds added
-VisualCode removed
#Script OS 3.7.1
-App UI Improvements
#Script OS 3.7
-More jokes added to ScriptAI
-ScriptAI improvements
-Window's can be brought to front on click
-Launch ScriptAI by pressing TAB
#Script OS 3.6
-Search bug fixes
-Browser bug fixes
-About page bug fixes
-Commands added to ScriptAI
-Responses added to ScriptAI
-ScriptAI can now search the web
#Script OS 3.5
-Files app removed
-Desktop Shortcuts added
#Script OS 3.4.3
-BlazeToUSD added
-StoryFire added
-Battery level bug fixes
#Script OS 3.4.2
-Browser settings added
#Script OS 3.4.1
-New animations added
#Script OS 3.4
-Device verification on boot added
-Boot sequence revamped
-Battery level added
-Battery level color indicator added
#Script OS 3.3.2
-Notifications system being tested
#Script OS 3.3.1
-New animations
-Bug fixes
#Script OS 3.3
-TopNav Customization
-Background Image scaling fixed
-App header buttons redesigned
-Themes added to Personalization settings
-OS font changed
#Script OS 3.2.1
-Bug fixes
#Script OS 3.2
-Shortcuts improvements
-Shortcuts save after closing Script OS
-Timer icon changed
-Zoom feature added to appheader buttons
#Script OS 3.1.1
-Timer app added
#Script OS 3.1
-Bugs fixed
-New commands added to Script AI
#Script OS 3.0.1
-Bugs fixed
-Donate Button Removed
-Terminal Removed
#Script OS 3.0
-DockZoom added
-IconZoom added
-Filesystem remade
-Websearch added
-vmOS added
-About page added to settings
-Background images will now save to localStorage
-Files will now save to localStorage
-Changelog added to About page
-Lockscreen bugs fixed
-Donate button added
-Script AI[ALPHA] added
-Browser issues fixed(websites like google.com and youtube.com now work if you install the iFrame Allow chrome extension)
#Script OS 2.9.6
-Startup screen added
#Script OS 2.9.5
-Files app redesigned
-Fixed file saving issues
-Lock screen added
#Script OS 2.9.4 
-Shortcuts added 
-Bug Fixes 
-HTML Support added 
#Script OS 2.9.3 
-Files app working in demo mode 
-Happy 1 Year of Script OS 
#Script OS 2.9.2
-HTML Editor added
-Themes color opacity increased 
-Mothers Day 
#Script OS 2.9.1
-Themes added
-Subscribe to PewDiePie button removed
-App center redesigned 
#Script OS 2.9
-DarkMode added
-Script OS Redesigned
-App system improved
-Multi app window support
-All apps redesigned`;

var topnav = document.getElementById('topnav');
var savedbackground = localStorage.getItem('background');
var savedtopnav = localStorage.getItem('topnav');
var saveddefault = localStorage.getItem('DefaultEngine');

if(savedbackground){
    document.body.style.backgroundImage = localStorage.getItem('background');
}

if(savedtopnav){
    topnav.style.backgroundImage = localStorage.getItem('topnav');
}

if(saveddefault){
    defaultengine = localStorage.getItem("DefaultEngine");
} else{
    defaultengine = "https://www.google.com";
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

//Start Up UI and Functionality
var textarea = document.createElement("textarea");
var navbar = document.createElement('div');
var desktopbody = document.getElementById('desktopbody');
var startupscreen = document.createElement('img');
startupscreen.style.width = '100%';
startupscreen.style.height = '100%';
startupscreen.src = 'images/Script-OS.gif';
var actioncenter = document.createElement('div');
actioncenter.style = 'position: absolute; z-index: 100; width: 100%; top: 100px; animation: slidetop; animation-duration: 2s; height: 25%;';
var appcenter = document.createElement('div');

function boot(){
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';

    if ((objOffsetVersion=objAgent.indexOf("Chrome"))!=-1) { 
        objbrowserName = "Chrome"; 
        objfullVersion = objAgent.substring(objOffsetVersion+7);
    }else if ((objOffsetVersion=objAgent.indexOf("MSIE"))!=-1) { 
        objbrowserName = "Microsoft Internet Explorer(It is reccomended that you use Chrome)"; 
        objfullVersion = objAgent.substring(objOffsetVersion+5); 
    }else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) { 
        objbrowserName = "Firefox(It is reccomended that you use Chrome)"; 
    }else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) { 
        objbrowserName = "Safari(It is reccomended that you use Chrome)"; 
        objfullVersion = objAgent.substring(objOffsetVersion+7); 
        if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) objfullVersion = objAgent.substring(objOffsetVersion+8); 
    }

    setTimeout(function(){deviceDetection()}, 250);
    setTimeout(function(){desktopbody.innerText+="\n" + objbrowserName + objfullVersion}, 500);
    console.log(objbrowserName + objfullVersion);
    setTimeout(function(){desktopbody.innerText+="\n ScriptOS Version " + scriptosversion}, 750);
    console.log("ScriptOS Version 4.0");
    setTimeout(function(){desktopbody.innerText+="\n Copyright Tyler Ruotolo 2018-2020"; console.log("Copyright Tyler Ruotolo 2018-2020")}, 1000);
    setTimeout(function(){desktopbody.innerText+="\n ScriptOS  Copyright (C) 2018-2020 Tyler Ruotolo"; console.log("ScriptOS Copyright (C) 2018-2020 Tyler Ruotolo")}, 1250);
    setTimeout(function(){desktopbody.innerText+="\n Resdistribution is allowed under certain conditions"; console.log("Redistribution is allowed under certain conditions")}, 1500);
    setTimeout(function(){desktopbody.innerText+="\n See LICENSE file for details"; console.log("See LICENSE file for details")}, 1750);
    setTimeout(function(){desktopbody.innerText+="\n System dependencies loaded successfully"; console.log("System dependencies loaded successfully")}, 2000);
    setTimeout(function(){desktopbody.innerText+="\n TR Kernel loaded successfully"; console.log("TR Kernel loaded successfully")}, 2250);
    setTimeout(function(){desktopbody.innerText+="\n Loading JavaScript APIs"; console.log("Loading JavaScript APIs")}, 2500);
    setTimeout(function(){desktopbody.innerText+="\n Loading programs"; console.log("Loading programs")}, 2750);
    setTimeout(function(){desktopbody.innerText+="\n APIs loaded successfully"; console.log("APIs loaded successfully")}, 3000);
    setTimeout(function(){desktopbody.innerText+="\n Programs loaded successfully"; console.log("Programs loaded successfully")}, 3250);
    setTimeout(function(){desktopbody.innerText+="\n Loading ScriptAI and Chromium web engine"; console.log("Loading ScriptAI and Chromium web engine")}, 7000);
    setTimeout(function(){desktopbody.innerText+="\n ScriptAI successfully loaded"; console.log("ScriptAI successfully loaded")}, 3500);
    setTimeout(function(){desktopbody.innerText+="\n Chromium successfully loaded"; console.log("Chromium successfully laoded")}, 4000);
    setTimeout(function(){desktopbody.innerText+="\n Loading app icons"; console.log("Loading app icons")}, 4250);
    setTimeout(function(){desktopbody.innerText+="\n Loading background images"; console.log("Loading background images")}, 4500);
    setTimeout(function(){desktopbody.innerText+="\n App icons successfully loaded"; console.log("App icons successfully loaded")}, 4750);
    setTimeout(function(){desktopbody.innerText+="\n Background images loaded successfully"}, 5000);
    setTimeout(function(){desktopbody.innerText+="\n See the changelog in the About section of Settings"}, 5250);
    setTimeout(function(){desktopbody.innerText+="\n Starting up ScriptOS..."; console.log("Starting up ScriptOS...")}, 5500);

    setTimeout(startUp, 7000);
}

function startUp(){
    desktopbody.innerHTML = "";
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = 'black';
    desktopbody.appendChild(startupscreen);
    setTimeout(loadDesktop, 2500);
}

//Search UI and Functionality
var websearch = document.createElement('input');
var searchbutt = document.createElement('input');
var exitbutt = document.createElement('input');
websearch.style = 'border-radius: 25px; border-style: none; box-shadow: rgba(0, 0, 0, .5)5px 5px 5px; background: rgba(0,0,0, .25); width: 75%; height: 100px; font-size: 75px; z-index:10; left:0; top:100px; animation:slidetop; animation-duration: 2s; position:absolute; color: white;';
websearch.type = 'text';
websearch.placeholder = 'Search the web';
websearch.onchange = function() { scriptApp("Browser"); desktopbody.removeChild(websearch); desktopbody.removeChild(searchbutt); desktopbody.removeChild(exitbutt); browserview.src = defaultengine + "/search?q=" + websearch.value; }
searchbutt.onclick = function () {scriptApp("Browser"); desktopbody.removeChild(websearch); desktopbody.removeChild(searchbutt); desktopbody.removeChild(exitbutt); browserview.src = defaultengine + "/search?q=" + websearch.value;};
searchbutt.type = 'image';
searchbutt.src = 'https://www.tcwreckersales.com/wp-content/uploads/2017/01/search-icon-white.png';
searchbutt.className = 'appicon';
searchbutt.style = 'width:50px; height:50px; animation:slidetop; z-index:10; animation-duration: 4s; position:absolute; right:0; top: 100px;';
exitbutt.onclick = function () {websearch.value = ''; desktopbody.removeChild(websearch); desktopbody.removeChild(searchbutt); desktopbody.removeChild(exitbutt);};
exitbutt.type = 'button';
exitbutt.value = "X"
exitbutt.className = 'appicon';
exitbutt.style = 'width:50px; height:50px; border-style: none; font-size: 40px; color: white; position:absolute; z-index:10; animation:slidetop; animation-duration: 3s; right:55px; top: 100px;';

var devicesupported = true;

function deviceDetection() {
    if (navigator.userAgent.match(/mobile/i)) {
        console.log('MOBILE DEVICE = NOT SUPPORTED');
        desktopbody.innerHTML = "MOBILE DEVICE = NOT SUPPORTED";
        devicesupported = false;
    } else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
        console.log('TABLET = NOT SUPPORTED');
        desktopbody.innerText += "\n TABLET = NOT SUPPORTED";
        devicesupported = false;
    } else {
        desktopbody.innerText += "\n DESKTOP DEVICE = SUPPORTED";
        console.log('DESKTOP DEVICE = SUPPORTED');
        devicesupported = true;
    }
}

//Desktop Loading Sequence
function loadDesktop(){
    desktopbody.removeChild(startupscreen);
    document.getElementById("topnav").style.display = "block";

    if(savedbackground){
        document.body.style.backgroundImage = localStorage.getItem('background');
    } else{
        document.body.style.backgroundImage = 'url("images/ScriptOSBackground.png")';
    }

    navbar.className = 'navbar';
    navbar.id = 'navbar';
    desktopbody.appendChild(navbar);

    var actionmenuicon = document.createElement('input');
    actionmenuicon.type = 'image';
    actionmenuicon.src = 'images/ScriptOS.png';
    actionmenuicon.setAttribute("onclick", "desktopbody.appendChild(actioncenter);");
    actionmenuicon.title = 'ActionMenu';
    actionmenuicon.className = 'appicon';
    actionmenuicon.style = "width:50px; height:50px; z-index: 100; border-radius: 15px; box-shadow: rgba(0,0,0,.5) 5px 5px 5px; position:absolute; left:0;" ;
    navbar.appendChild(actionmenuicon);

    var searchweb = document.createElement('input');
    searchweb.type = 'image';
    searchweb.className = 'appicon';
    searchweb.src = 'https://www.tcwreckersales.com/wp-content/uploads/2017/01/search-icon-white.png';
    searchweb.setAttribute("onclick", "desktopbody.appendChild(websearch); desktopbody.appendChild(searchbutt); desktopbody.appendChild(exitbutt);");
    searchweb.title = 'Search the Web';
    searchweb.style = "width:50px; height:50px; z-index: 100; position:absolute; right:0;";
    navbar.appendChild(searchweb);

    var appicon1 = document.createElement('input');
    appicon1.type = 'image';
    appicon1.src = 'images/Settings.png';
    appicon1.className = 'appicon';
    appicon1.title = 'Settings';
    appicon1.setAttribute("onclick", "scriptApp('Settings')");
    navbar.appendChild(appicon1);
    
    var appicon2 = document.createElement('input');
    appicon2.type = 'image';
    appicon2.src = 'images/Browser.png';
    appicon2.className = 'appicon';
    appicon2.title = 'S Browser';
    appicon2.setAttribute("onclick", "scriptApp('Browser')");
    navbar.appendChild(appicon2);

    var appicon3 = document.createElement('input');
    appicon3.type = 'image';
    appicon3.src = 'images/Shortcuts.png';
    appicon3.className = 'appicon';
    appicon3.title = 'Shortcuts';
    appicon3.setAttribute("onclick", "scriptApp('Shortcuts')");
    navbar.appendChild(appicon3);
    
    if(savednav){
        navbar.innerHTML = '';
        navbar.innerHTML = localStorage.getItem("savednav");
    }

    if(savedesk){
        desktopbody.innerHTML = '';
        desktopbody.innerHTML = localStorage.getItem("savedesk");
    }

    actioncenter.className = 'app';

    var app1 = document.createElement('input');
    app1.type = 'image';
    app1.src = "images/Settings.png";
    app1.title = 'Settings';
    app1.setAttribute("onclick", "scriptApp('Settings')");
    app1.className = 'appchoice';
    appcenter.appendChild(app1);

    var app2 = document.createElement('input');
    app2.type = 'image';
    app2.src = "images/Browser.png";
    app2.title = 'S Browser';
    app2.setAttribute("onclick", "scriptApp('Browser')");
    app2.className = 'appchoice';
    appcenter.appendChild(app2);

    var app4 = document.createElement("input");
    app4.type = 'image';
    app4.src = 'images/Timer.png';
    app4.title = "Timer";
    app4.setAttribute("onclick", "scriptApp('Timer')");
    app4.className = 'appchoice';
    appcenter.appendChild(app4);

    var app5 = document.createElement('input');
    app5.type = 'image';
    app5.src = "images/Discord.png";
    app5.title = 'Discord';
    app5.setAttribute("onclick", "scriptApp('Discord')");
    app5.className = 'appchoice';
    appcenter.appendChild(app5);

    var app7 = document.createElement('input');
    app7.type = 'image';
    app7.src = "images/Shortcuts.png";
    app7.title = 'Shortcuts';
    app7.setAttribute("onclick", "scriptApp('Shortcuts')");
    app7.className = 'appchoice';
    appcenter.appendChild(app7);

    var app8 = document.createElement('input');
    app8.type = 'image';
    app8.src = "images/vmOS.png";
    app8.title = 'vmOS';
    app8.setAttribute("onclick", "scriptApp('vmOS'); desktopbody.removeChild(actioncenter);");
    app8.className = 'appchoice';
    appcenter.appendChild(app8);

    var app9 = document.createElement('input');
    app9.type = 'image';
    app9.src = 'images/BlazeToUSD.png';
    app9.title = 'BlazeToUSD';
    app9.setAttribute("onclick", "scriptApp('BlazeToUSD')");
    app9.className = 'appchoice';
    appcenter.appendChild(app9);

    var app10 = document.createElement('input');
    app10.type = 'image';
    app10.src = "images/ScriptAI.png";
    app10.title = 'ScriptAI';
    app10.setAttribute("onclick", "scriptApp('ScriptAI')");
    app10.className = 'appchoice';
    appcenter.appendChild(app10);

    var app11 = document.createElement('input');
    app11.type = 'image';
    app11.src = "images/StoryFire.png";
    app11.title = 'StoryFire';
    app11.setAttribute("onclick","scriptApp('StoryFire')");
    app11.className = 'appchoice';
    appcenter.appendChild(app11);

    var actionarea = document.createElement('div');
    actionarea.id = 'actionarea';
    actionarea.appendChild(appcenter);
    actioncenter.appendChild(actionarea);

    var closebutt = document.createElement('button');
    closebutt.innerHTML = 'Close';
    closebutt.onclick = function () { desktopbody.removeChild(actioncenter); };
    actionarea.appendChild(closebutt);

    var reloadbutt = document.createElement('button');
    reloadbutt.innerHTML = 'Restart';
    reloadbutt.onclick = function () { location.reload(); };
    actionarea.appendChild(reloadbutt);

    var signoutbutt = document.createElement('button');
    signoutbutt.innerHTML = 'Sign Out';
    signoutbutt.onclick = function () { signOut(); };
    actionarea.appendChild(signoutbutt);

    var shutdownbutt = document.createElement('button');
    shutdownbutt.innerHTML = 'Shutdown';
    actionarea.appendChild(shutdownbutt);
    
    desktopbody.appendChild(conmenu1);
    
    lightMode();
}

//Sign In
function signIn(){
    desktopbody.removeChild(headertext);
    desktopbody.removeChild(timetxt);
    desktopbody.removeChild(loginbar);
    desktopbody.appendChild(navbar);
    desktopbody.appendChild(conmenu1);
    if(savednav){
        navbar.innerHTML = '';
        navbar.innerHTML = localStorage.getItem("savednav");
    }

    if(savedesk){
        desktopbody.innerHTML = '';
        desktopbody.innerHTML = localStorage.getItem("savedesk");
    }
}

var headertext = document.createElement('h2');
var timetxt = document.createElement('h1');
var loginbar = document.createElement('div');

//Sign Out
function signOut(){
    var soimage = document.createElement('div');
    headertext.innerHTML = 'ScriptOS';
    headertext.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    headertext.style.fontFamily = "Arial";
    headertext.style.fontSize = '100px';
    headertext.style.opacity = '50%';
    timetxt.style.fontSize = '85px';
    timetxt.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    timetxt.style.fontFamily = "Arial";
    timetxt.style.fontSize = '100px';
    timetxt.style.opacity = '50%';
    loginbar.className = 'logbar';
    desktopbody.style.color = 'white';
    desktopbody.style.textAlign = 'center';
    loginbar.onclick = function () { signIn();};
    soimage.className = "bg-image";
    desktopbody.innerHTML = '';
    desktopbody.appendChild(soimage);
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

//Context Menu
var conmenu1 = document.createElement('div');
var conmenu1butt1 = document.createElement('li');
var conmenu1butt2 = document.createElement('li');
var conmenu1butt3 = document.createElement('li');
var conmenu1butt4 = document.createElement('li');
var conmenu1butt5 = document.createElement('li');
var conmenu1butt6 = document.createElement('li');
conmenu1.id = 'menu';
conmenu1butt1.innerHTML = 'Personalization';
conmenu1butt1.onclick = function () { scriptApp('Personalization'); };
conmenu1butt2.innerHTML = 'Settings';
conmenu1butt2.onclick = function () { scriptApp('Settings'); };
conmenu1butt3.innerHTML = 'About';
conmenu1butt3.onclick = function () { scriptApp('About'); };
conmenu1butt4.innerHTML = 'Add Shortcut';
conmenu1butt4.onclick = function () { scriptApp('Shortcuts'); };
conmenu1butt5.innerHTML = 'TopNav';
conmenu1butt5.onclick = function () { scriptApp('TopNav'); };
conmenu1butt6.innerHTML = 'ControlPanel';
conmenu1butt6.onclick = function () { scriptApp('ControlPanel'); };
desktopbody.appendChild(conmenu1);
conmenu1.appendChild(conmenu1butt1);
conmenu1.appendChild(conmenu1butt2);
conmenu1.appendChild(conmenu1butt3);
conmenu1.appendChild(conmenu1butt4);
conmenu1.appendChild(conmenu1butt5);
conmenu1.appendChild(conmenu1butt6);

//DarkMode Toggle
function darkToggle2(){
    var darkmodeon = document.getElementById("darkmodetoggle2").checked;
    if(darkmodeon == true){
        darkMode();
    }else if(darkmodeon == false){
        lightMode();
    }
    console.log(darkmodeon);
}

//Stock apps in Script OS
function scriptApp(appsname){
    var app = document.createElement('div');
    var apphead = document.createElement('div');
    var appheadtext = document.createTextNode(appsname);
    var close = document.createElement('ui');
    var fullscreen = document.createElement('ui');
    var smallscreen = document.createElement('ui');
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
    close.id = "close"
    close.title = 'Close';
    close.innerHTML = " X ";
    close.style.fontFamily = "Arial";
    close.className = "appheadbutt";
    fullscreen.title = 'Fullscreen';
    fullscreen.id = "fullscreen";
    fullscreen.type = 'image';
    fullscreen.innerHTML = " ▇ ";
    fullscreen.style.textAlign = 'right';
    fullscreen.className = "appheadbutt";
    smallscreen.type = 'image';
    smallscreen.title = 'Small';
    smallscreen.id = "smallscreen";
    smallscreen.className = "appheadbutt";
    smallscreen.innerHTML = " ▃ "
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
    app.onload = bringToFront(app.id);
    app.onclick = function () {bringToFront(app.id)};
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
        inputbar.placeholder = 'type something...';
        inputbar.style.width = '75%';
        inputbar.style.borderRadius = '15px';
        inputbar.style.borderStyle = 'none';
        inputbar.style.boxShadow = 'box-shadow: rgba(0, 0, 0, .5)6px 6px 6px;';
        inputbar.style.background = 'rgba(0,0,0, .5)';
        inputbar.style.color = "white";
        inputbar.onchange = function () { 
            var inputvalue = inputbar.value;
            if(inputvalue.includes('.')){
                browserview.src = "https://" + inputvalue;
            } else {
                browserview.src = defaultengine + "/search?q=" + inputvalue;
            }
        };
        app.appendChild(inputbar);
        browserview.id = "browserview" + appnumber;
        browserview.src = defaultengine;
        app.appendChild(browserview);
    } else if(appsname === "ControlPanel"){
        var darkmodel = document.createElement('label');
        var darkmodein = document.createElement('input');
        var darkmodeswitch = document.createElement('span');
        var darkmodetxt = document.createElement('h2');
        var lowpowerl = document.createElement('label');
        var lowpowerin = document.createElement('input');
        var lowpowerswitch = document.createElement('span');
        var lowpowertxt = document.createElement('h2');

        darkmodel.title = "DarkMode";
        darkmodel.className = "switch";
        darkmodein.type = "checkbox";
        darkmodein.id = "darkmodetoggle2";
        darkmodein.onchange = function(){darkToggle2();};
        darkmodeswitch.className = "slider round";
        darkmodetxt.innerHTML = "DarkMode";

        lowpowerl.title = "LowPower";
        lowpowerl.className = "switch";
        lowpowerin.type = "checkbox";
        lowpowerin.id = "lowpowertoggle";
        lowpowerswitch.className = "slider round";
        lowpowertxt.innerHTML = "LowPower"; 

        darkmodel.appendChild(darkmodein);
        darkmodel.appendChild(darkmodeswitch);
        lowpowerl.appendChild(lowpowerin);
        lowpowerl.appendChild(lowpowerswitch);

        app.appendChild(darkmodetxt);
        app.appendChild(darkmodel);
        app.appendChild(lowpowertxt);
        app.appendChild(lowpowerl);
        headbuttdiv.removeChild(smallscreen);
        headbuttdiv.removeChild(fullscreen);
        app.appendChild(headbuttdiv);
        app.removeChild(apphead);
        headbuttdiv.style = "position: absolute; top: 20px; left: 200px;";
        app.style.resize = "none";
        app.style.width = "15%";
        app.style.height = "50%";
        app.style.position = "fixed";
    } else if(appsname === "BlazeToUSD"){
        var btuview = document.createElement('iframe');
        btuview.src = "https://blazetousd.tk";
        btuview.style = 'width: 100%; height: 99%;';
        app.appendChild(btuview);
    } else if(appsname === "StoryFire"){
        var sfview = document.createElement('iframe');
        sfview.src = "https://www.storyfire.com";
        sfview.style = 'width: 100%; height: 90%';
        app.appendChild(sfview);
    } else if (appsname === "Settings") {
        var backgroundsettings = document.createElement('input');
        var about = document.createElement('input');
        var shortcuts = document.createElement('input');
        var browsersett = document.createElement('input');
        browsersett.type = 'image';
        shortcuts.type = 'image';
        backgroundsettings.type = 'image';
        about.type = 'image';
        browsersett.src = 'images/Browser.png';
        shortcuts.src = 'images/Shortcuts.png';
        backgroundsettings.src = 'images/background icon.png';
        about.src = 'images/ScriptOS.png';
        browsersett.style.width = '10%';
        shortcuts.style.width = '10%';
        about.style.width = '10%';
        backgroundsettings.style.width = '10%';
        browsersett.title = 'Browser Settings';
        about.title = 'About';
        shortcuts.title = 'Shortcuts';
        backgroundsettings.title = 'Personalization';
        browsersett.onclick = function () { scriptApp("BrowserSettings"); };
        about.onclick = function () { scriptApp("About"); };
        shortcuts.onclick = function () { scriptApp("Shortcuts"); };
        backgroundsettings.onclick = function () {scriptApp("Personalization"); };
        app.appendChild(browsersett);
        app.appendChild(shortcuts);
        app.appendChild(backgroundsettings);
        app.appendChild(about);
    } else if(appsname === "BrowserSettings"){
        var defaultbrowser = document.createElement("input");
        var savesett = document.createElement('button');
        var resetbutt = document.createElement('button');
        defaultbrowser.type = "text";
        defaultbrowser.placeholder = "Default Search Engine";
        savesett.innerHTML = "Save Settings";
        savesett.onclick = function(){defaultengine = defaultbrowser.value; logcalStorage.setItem("DefaultEngine", defaultbrowser.value)};
        resetbutt.innerHTML = "Reset Default";
        resetbutt.onclick = function(){localStorage.removeItem("DefaultEngine"); location.reload();};
        app.appendChild(defaultbrowser);
        app.appendChild(savesett);
        app.appendChild(resetbutt);
    } else if(appsname === "TopNav"){
        var backgroundtxt = document.createElement("h1");
        backgroundtxt.innerHTML = "TopNav Background";
        app.appendChild(backgroundtxt);
        
        var tchoice1 = document.createElement('input');
        tchoice1.type = 'image';
        tchoice1.src = 'images/landscape.jpg';
        tchoice1.className = 'backgroundoption';
        tchoice1.onclick = function () { topnav.style.backgroundImage = 'url(images/landscape.jpg)'; 
        localStorage.setItem('topnav','url(images/landscape.jpg)'); };
        app.appendChild(tchoice1);
        
        var tchoice2 = document.createElement('input');
        tchoice2.type = 'image';
        tchoice2.src = 'images/imac-pro-wallpaper.jpg';
        tchoice2.className = 'backgroundoption';
        tchoice2.onclick = function () { topnav.style.backgroundImage = 'url(images/imac-pro-wallpaper.jpg)';
        localStorage.setItem('topnav','url(images/imac-pro-wallpaper.jpg)'); };
        app.appendChild(tchoice2);
        
        var choice3 = document.createElement('input');
        choice3.type = 'image';
        choice3.src = 'images/lamborghini ting.png';
        choice3.className = 'backgroundoption';
        choice3.onclick = function () { topnav.style.backgroundImage = 'url("images/lamborghini ting.png")';
        localStorage.setItem('topnav','url("images/lamborghini ting.png")'); };
        app.appendChild(choice3);
        
        var choice4 = document.createElement('input');
        choice4.type = 'image';
        choice4.src = 'images/Script-OS-3.png';
        choice4.className = 'backgroundoption';
        choice4.onclick = function () { topnav.style.backgroundImage = 'url(images/Script-OS-3.png)';
        localStorage.setItem('topnav','url(Script-OS-3.png)');};
        app.appendChild(choice4);
        
        var choice5 = document.createElement('input');
        choice5.type = 'image';
        choice5.src = 'images/pewds-pattern.jpg';
        choice5.className = 'backgroundoption';
        choice5.onclick = function () { topnav.style.backgroundImage = 'url(images/pewds-pattern.jpg)';
        localStorage.setItem('topnav','url(images/pewds-pattern.jpg)');};
        app.appendChild(choice5);
        
        var choice6 = document.createElement('input');
        choice6.type = 'image';
        choice6.src = 'images/animals_hero_giraffe_1_0.jpg';
        choice6.className = 'backgroundoption';
        choice6.onclick = function () { topnav.style.backgroundImage = 'url(images/animals_hero_giraffe_1_0.jpg)';
        localStorage.setItem('topnav','url(images/animals_hero_giraffe_1_0.jpg)');};
        app.appendChild(choice6);
        
        var choice7 = document.createElement('input');
        choice7.type = 'image';
        choice7.src = 'images/hbd-script-os.png';
        choice7.className = 'backgroundoption';
        choice7.onclick = function () { topnav.style.backgroundImage = 'url(images/hbd-script-os.png)';
        localStorage.setItem('topnav','url(images/hbd-script-os.png)');};
        app.appendChild(choice7);

        var choice8 = document.createElement('input');
        choice8.type = 'image';
        choice8.src = 'images/Iron-Trump.png';
        choice8.className = 'backgroundoption';
        choice8.onclick = function () {topnav.style.backgroundImage = 'url(images/Iron-Trump.png)';
        localStorage.setItem('topnav','url(images/Iron-Trump.png)');};
        app.appendChild(choice8);

    } else if (appsname === "Personalization"){
        var backgroundtxt = document.createElement("h1");
        backgroundtxt.innerHTML = "Background";
        app.appendChild(backgroundtxt);
        
        var choice0 = document.createElement('input');
        choice0.type = 'image';
        choice0.src = 'images/ScriptOSBackground.png';
        choice0.className = 'backgroundoption';
        choice0.onclick = function () { document.body.style.backgroundImage = 'url(images/ScriptOSBackground.png)'; 
        localStorage.setItem('background','url(images/ScriptOSBackground.png)'); };
        app.appendChild(choice0);

        var choice1 = document.createElement('input');
        choice1.type = 'image';
        choice1.src = 'images/landscape.jpg';
        choice1.className = 'backgroundoption';
        choice1.onclick = function () { document.body.style.backgroundImage = 'url(images/landscape.jpg)'; 
        localStorage.setItem('background','url(images/landscape.jpg)'); };
        app.appendChild(choice1);
        
        var choice2 = document.createElement('input');
        choice2.type = 'image';
        choice2.src = 'images/imac-pro-wallpaper.jpg';
        choice2.className = 'backgroundoption';
        choice2.onclick = function () { document.body.style.backgroundImage = 'url(images/imac-pro-wallpaper.jpg)';
        localStorage.setItem('background','url(images/imac-pro-wallpaper.jpg)'); };
        app.appendChild(choice2);
        
        var choice3 = document.createElement('input');
        choice3.type = 'image';
        choice3.src = 'images/lamborghini ting.png';
        choice3.className = 'backgroundoption';
        choice3.onclick = function () { document.body.style.backgroundImage = 'url("images/lamborghini ting.png")';
        localStorage.setItem('background','url("images/lamborghini ting.png")'); };
        app.appendChild(choice3);
        
        var choice4 = document.createElement('input');
        choice4.type = 'image';
        choice4.src = 'images/Script-OS-3.png';
        choice4.className = 'backgroundoption';
        choice4.onclick = function () { document.body.style.backgroundImage = 'url(images/Script-OS-3.png)';
        localStorage.setItem('background','url(Script-OS-3.png)');};
        app.appendChild(choice4);
        
        var choice5 = document.createElement('input');
        choice5.type = 'image';
        choice5.src = 'images/pewds-pattern.jpg';
        choice5.className = 'backgroundoption';
        choice5.onclick = function () { document.body.style.backgroundImage = 'url(images/pewds-pattern.jpg)';
        localStorage.setItem('background','url(images/pewds-pattern.jpg)');};
        app.appendChild(choice5);
        
        var choice6 = document.createElement('input');
        choice6.type = 'image';
        choice6.src = 'images/animals_hero_giraffe_1_0.jpg';
        choice6.className = 'backgroundoption';
        choice6.onclick = function () { document.body.style.backgroundImage = 'url(images/animals_hero_giraffe_1_0.jpg)';
        localStorage.setItem('background','url(images/animals_hero_giraffe_1_0.jpg)');};
        app.appendChild(choice6);
        
        var choice7 = document.createElement('input');
        choice7.type = 'image';
        choice7.src = 'images/hbd-script-os.png';
        choice7.className = 'backgroundoption';
        choice7.onclick = function () { document.body.style.backgroundImage = 'url(images/hbd-script-os.png)';
        localStorage.setItem('background','url(images/hbd-script-os.png)');};
        app.appendChild(choice7);

        var choice8 = document.createElement('input');
        choice8.type = 'image';
        choice8.src = 'images/Iron-Trump.png';
        choice8.className = 'backgroundoption';
        choice8.onclick = function () { 
            document.body.style.backgroundImage = 'url(images/Iron-Trump.png)';
            localStorage.setItem('background','url(images/Iron-Trump.png)');
        };
        app.appendChild(choice8);

        var choice9 = document.createElement('input');
        choice9.type = 'image';
        choice9.src = 'images/tr-software.png';
        choice9.className = 'backgroundoption';
        choice9.onclick = function () {
            document.body.style.backgroundImage = 'url(images/tr-software.png)';
            localStorage.setItem('background','url(images/tr-software.png)');
        };
        app.appendChild(choice9);

        var choice10 = document.createElement('input');
        choice10.type = 'image';
        choice10.src = 'images/2nd_birthday_script_os.png';
        choice10.className = 'backgroundoption';
        choice10.onclick = function () {
            document.body.style.backgroundImage = 'url(images/2nd_birthday_script_os.png)';
            localStorage.setItem('background','url(images/2nd_birthday_script_os.png)');
        };
        app.appendChild(choice10);

        var choice11 = document.createElement('input');
        choice11.type = 'image';
        choice11.src = 'images/bridge_background.jpg';
        choice11.className = 'backgroundoption';
        choice11.onclick = function () {
            document.body.style.backgroundImage = 'url(images/bridge_background.jpg)';
            localStorage.setItem('background','url(images/bridge_background.jpg)');
        };
        app.appendChild(choice11);

        var choice12 = document.createElement('input');
        choice12.type = 'image';
        choice12.src = 'images/city_bridge_background.jpg';
        choice12.className = 'backgroundoption';
        choice12.onclick = function () {
            document.body.style.backgroundImage = 'url(images/city_bridge_background.jpg';
            localStorage.setItem('background','url(images/city_bridge_background.jpg)');
        };
        app.appendChild(choice12);


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
            custombackground.onclick = function () { document.body.style.backgroundImage = "url('" +  backgroundinput.value + "')";
            localStorage.setItem('background',"url('" +  backgroundinput.value + "')");};
            app.appendChild(custombackground);
        };
        app.appendChild(backgroundinput);
        app.appendChild(backgroundaddbutt);
        
        var apptranstext = document.createElement("h1");
        apptranstext.innerHTML = "App Transparency";
        
        var transtogglelabel = document.createElement("label");
        var transtoggle = document.createElement("input");
        var transtogglespan = document.createElement("span");
        transtogglelabel.className = "switch";
        transtoggle.type = "checkbox";
        transtoggle.checked = true;
        transtoggle.onchange = function (){
            var ttoggle = transtoggle.checked;
            var appclass = document.getElementsByClassName("app");
            if(ttoggle == true){
                for(var i = 0; i< appclass.length; i++){
                    appclass[i].style.background = 'rgba(0,0,0,0.75)';
                }
            } else if(ttoggle == false){
                for(var i = 0; i< appclass.length; i++){
                    appclass[i].style.background = 'rgba(0,0,0,1)';
                }
            }
        }
        transtogglespan.className = "slider round";
        app.appendChild(apptranstext);
        app.appendChild(transtogglelabel);
        transtogglelabel.appendChild(transtoggle);
        transtogglelabel.appendChild(transtogglespan);

        var themetxt = document.createElement("h1");
        var theme1 = document.createElement("button");
        var theme2 = document.createElement("button");
        var theme3 = document.createElement("button");
        var theme4 = document.createElement("button");
        var theme5 = document.createElement("button");
        var theme6 = document.createElement("button");

        themetxt.innerHTML = "Themes";
        
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
        app.style.overflow = "scroll";
        app.appendChild(themetxt);
        app.appendChild(theme1);
        app.appendChild(theme2);
        app.appendChild(theme3);
    } else if(appsname === "Discord"){
        var disframe = document.createElement('iframe');
        disframe.src = 'https://discordapp.com/';
        app.appendChild(disframe);
    } else if(appsname === "About"){
        var scriptostxt = document.createElement('h1');
        var browserversion = document.createElement('h1');
        var copyright = document.createElement('h1');
        var logoimg = document.createElement('img');
        var changelogbutt = document.createElement('button');
        changelogbutt.innerHTML = 'Changelog';
        changelogbutt.onclick = function() {scriptApp("Changelog");};
        app.style.color = 'white';
        browserversion.innerHTML = objbrowserName + ": " + objfullVersion;
        scriptostxt.innerHTML = "ScriptOS " + scriptosversion;
        copyright.innerHTML = "© Tyler Ruotolo 2018-2020";
        logoimg.src = 'images/ScriptOS.png';
        logoimg.style = 'width: 150px; height: 150px';
        app.appendChild(scriptostxt);
        app.appendChild(logoimg);
        app.appendChild(copyright);
        app.appendChild(browserversion);
        app.appendChild(changelogbutt);
    }else if(appsname === "Changelog"){
        var changelogtext = document.createElement('textarea');
        changelogtext.value = changelog;
        changelogtext.style.width = '100%';
        changelogtext.style.height = '92.5%';
        changelogtext.readOnly = true;
        changelogtext.style.resize = 'none';
        app.appendChild(changelogtext);
    }else if(appsname === "Timer"){
        var timeleft = document.createElement('h1');
        var timeset = document.createElement('input');
        var setbutton = document.createElement('button');
        var stopbutton = document.createElement('button');
        var resetbutton = document.createElement('button');
        var timesuptext = document.createElement('h1');
        var timing;
        var alarm = new Audio('analog-watch-alarm_daniel-simion.mp3');
        timesuptext.innerHTML = "TIMES UP!!!";
        timeset.placeholder = "Time(in seconds)";
        timeset.type = "number";
        setbutton.innerHTML = "Set & Start Timer";
        setbutton.onclick = function () {
            timing = timeset.value;
            let timerint = setInterval(function(){
                timeleft.innerHTML = "Time: " + timing--;
                if(timing < 0){
                    clearInterval(timerint);
                    app.style.backgroundColor = "red";
                    app.appendChild(timesuptext);
                    alarm.play();
                }
            }, 1000);
            resetbutton.onclick = function(){
                timeleft.innerHTML = "";
                clearInterval(timerint);
                alarm.pause();
            };
            stopbutton.innerHTML = "Stop";
            stopbutton.onclick = function(){
                clearInterval(timerint);
                alarm.pause();
            };
            app.appendChild(stopbutton);
            app.appendChild(resetbutton)
        };
        app.appendChild(timeleft);
        app.appendChild(timeset);
        app.appendChild(setbutton);
        
    } else if(appsname === "Shortcuts"){
        var appnameshort = document.createElement('input');
        var shortaddnav = document.createElement('button');
        var shortadddesk = document.createElement('button');
        var newshortcut = document.createElement('input');
        var navbar = document.getElementById("navbar");
        var noticetxt = document.createElement("h3");
        var resetsc = document.createElement("button");
        newshortcut.type = 'image';
        newshortcut.style.width = '50px';
        newshortcut.style.height = '50px';
        newshortcut.style.textAlign = 'center';
        appnameshort.type = 'text';
        shortaddnav.innerHTML = 'Add to NavBar';
        shortadddesk.innerHTML = 'Add to Desktop';
        noticetxt.innerHTML = "***NAMES ARE CASE SENSITIVE***"
        resetsc.innerHTML = "Reset Shortcuts";
        resetsc.title = "This will remove all added shortcuts";
        resetsc.onclick = function () {localStorage.removeItem("savednav"); localStorage.removeItem("savedesk"); window.location.reload();};
        app.appendChild(appnameshort);
        app.appendChild(shortaddnav);
        app.appendChild(shortadddesk);
        app.appendChild(resetsc);
        app.appendChild(noticetxt);
        shortaddnav.onclick = function () {
            newshortcut.title = appnameshort.value;
            newshortcut.innerHTML = appnameshort.value;
            newshortcut.src = "images/" + appnameshort.value + ".png";
            newshortcut.className = 'appicon'
            newshortcut.setAttribute("onclick", "scriptApp('" + appnameshort.value + "');");
            navbar.appendChild(newshortcut);
            localStorage.setItem("savednav", navbar.innerHTML);
            desktopbody.removeChild(app);
        };
        shortadddesk.onclick = function () {
            newshortcut.title = appnameshort.value;
            newshortcut.innerHTML = appnameshort.value;
            newshortcut.src = "images/" + appnameshort.value + ".png";
            newshortcut.className = 'desktopicon';
            newshortcut.id = appnameshort.value + "Short";
            newshortcut.style = 'width: 75px; height: 75px';
            newshortcut.setAttribute("onclick", "scriptApp('" + appnameshort.value + "');");
            desktopbody.appendChild(newshortcut);
            desktopbody.removeChild(app);
            localStorage.setItem("savedesk", desktopbody.innerHTML);
            
        };
    } else if(appsname === "vmOS"){
        var osview = document.createElement('iframe');
        var oschoice1 = document.createElement('button');
        var oschoice2 = document.createElement('button');
        var oschoice3 = document.createElement('button');
        var oschoice4 = document.createElement('button');
        osview.style.width = '98%';
        osview.style.height = '92.5%';
        oschoice1.innerHTML = 'Script OS[LEGACY]';
        oschoice1.onclick = function () {osview.src = 'https://tenzeinc.github.io/Script-OS-Dev/';};
        oschoice2.innerHTML = 'Windows 93';
        oschoice2.onclick = function () {osview.src = 'https://windows93.net';};
        oschoice3.innerHTML = 'Script OS';
        oschoice3.onclick = function () {osview.src = 'https://scriptos.ml/';};
        oschoice4.innerHTML = 'eyeOS';
        oschoice4.onclick = function () {osview.src = 'https://s2.demo.opensourcecms.com/eyeOS/';};
        app.appendChild(oschoice1);
        app.appendChild(oschoice2);
        app.appendChild(oschoice3);
        app.appendChild(oschoice4);
        app.appendChild(osview);
    } else if(appsname === "ScriptAI"){
        commandinput = document.createElement('input');
        commandoutput = document.createElement('textarea');
        var micbutton = document.createElement('input');
        var sendbutt = document.createElement("button");
        apphead.style.background = "rgba(0,0,0,0)";
        commandinput.placeholder = 'Type a message';
        commandinput.style = 'height:15%; border-style: none; box-shadow: rgba(0,0,0,.5) 5px 5px 5px; width:75%; font-size: 75px; border-radius: 15px; background: rgba(0,0,0,0.7); color: white; outline: none;border-top-style: hidden; border-right-style: hidden; border-left-style: hidden; border-bottom-style: groove;';
        commandinput.type = "text";
        commandoutput.style = 'height:75%; text-shadow: 2.5px 2.5px 2.5px black; width:100%; font-size: 65px; border-style: none; resize: none; color:white; background: rgba(0,0,0,0)';
        commandoutput.readOnly = true;
        micbutton.type = 'button';
        micbutton.style.background = "rgba(0,0,0,.5)";
        sendbutt.innerHTML = "Send";
        sendbutt.className = "appchoice";
        micbutton.value = "🎤"
        micbutton.onclick = function () {
            startDictation();
        };
        commandinput.onkeydown = function (e){
            if(e.keyCode == 13){
                scriptAI();
                micbutton.src = 'https://png.pngtree.com/svg/20151101/76e68d5d8b.svg';
            }
        };
        micbutton.className = 'appchoice';
        //micbutton.onclick = function () {
            //recognizer.start();
        //};
        app.appendChild(commandoutput);
        app.appendChild(commandinput);
        app.appendChild(micbutton);
        //app.appendChild(sendbutt);
    } else {
        var unavailableapp = document.createElement('h1');
        unavailableapp.innerHTML = "Currently Unavailable";
        app.appendChild(unavailableapp);
    }
}

function startDictation() {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

        var recognition = new webkitSpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function (e) {
            commandinput.value
                = e.results[0][0].transcript;
            recognition.stop();
        };

        recognition.onerror = function (e) {
            recognition.stop();
        }

    }
}

document.onkeyup = function (e){
    document.onkeyup=function(e){
        var e = e || window.event;
        if(e.which == 9) {
                scriptApp("ScriptAI");
        }
        if(e.which == 27){
            scriptApp("ControlPanel");
        }
      }
    //if(e.keyCode == 83 && e.keyCode == 32){
    //      scriptApp("ScriptAI");
    //}
}

var top_z = 10;

function bringToFront(appname){
    document.getElementById(appname).style.zIndex = ++top_z
}

function scriptAI(){
    var jokes = [
        "What's the difference between a Lamborghini and a garbage can of dead babies? I don't have a Lamborghini in my garage",
        "Nancy Pelosi",
        "Hillary Clinton being president",
        "Liberals using facts",
        "If video games make kids more violent, why are they so easy to beat the shit out of?",
        "How many dead babies does it take to paint a wall? It depends how hard you throw them",
        "Gun free zones being effective",
        "Trump losing in 2020",
        "69, nice",
        "Biden forming a coherent sentence",
        "Obama is the best president ever",
        "Biden would be a good president",
        "Liberal logic making sense"
    ];
    
    var greetingreplies = [
        "Hi",
        "Hello",
        "What's up",
        "Hi there",
        "Hello, friend",
        "Whats up my diggity dogs?"
    ];

    var hrureplies = [
        "I'm doing pretty good",
        "I'm great",
        "Amazing",
        "Fantastic",
        "Not too bad",
        "I'm alright",
        "I'm doing alright",
        "Not great, but I'm okay"
    ];

    var swearreplies = [
        "Fuck you",
        "Fuck off",
        "Shut the fuck up",
        "Don't say that to me",
        "I'm telling your mother",
        "That isn't very nice",
        "Shut up",
        "Okay",
        "...",
        "I thought we were friends",
        "What the fuck",
        "You're a bitch",
        "You cunt",
        "Motherfucker",
        "No",
        "You're a cunt"
    ];

    repliestoyes = [
        "Okay",
        "Yes received",
        "Yes",
        "Alright",
        "No"
    ];

    if(commandinput.value == "hey"){
        commandoutput.value = greetingreplies[Math.floor(Math.random() * greetingreplies.length)];
    }else if(commandinput.value == "hi"){
        commandoutput.value = greetingreplies[Math.floor(Math.random() * greetingreplies.length)];
    } else if(commandinput.value == "whats up"){
        commandoutput.value = greetingreplies[Math.floor(Math.random() * greetingreplies.length)];
    } else if(commandinput.value == "what's up"){
        commandoutput.value = greetingreplies[Math.floor(Math.random() * greetingreplies.length)];
    } else if(commandinput.value == "how are you"){
        commandoutput.value = hrureplies[Math.floor(Math.random() * hrureplies.length)];
    } else if(commandinput.value == "fuck you"){
        commandoutput.value = swearreplies[Math.floor(Math.random() * swearreplies.length)];
    } else if(commandinput.value == "you're stupid"){
        commandoutput.value = swearreplies[Math.floor(Math.random() * swearreplies.length)];
    } else if(commandinput.value == "fuck"){
        commandoutput.value = swearreplies[Math.floor(Math.random() * swearreplies.length)];
    } else if(commandinput.value == "bitch"){
        commandoutput.value = swearreplies[Math.floor(Math.random() * swearreplies.length)];
    } else if(commandinput.value == "you're a bitch"){
        commandoutput.value = swearreplies[Math.floor(Math.random() * swearreplies.length)];
    } else if(commandinput.value == "you cunt"){
        commandoutput.value = swearreplies[Math.floor(Math.random() * swearreplies.length)];
    } else if(commandinput.value == "tell me a joke"){
        commandoutput.value = jokes[Math.floor(Math.random() * jokes.length)];
    } else if (commandinput.value == "say something funny"){
        commandoutput.value = jokes[Math.floor(Math.random() * jokes.length)];
    } else if(commandinput.value == "do you work on macs"){
        commandoutput.value = "Yes, as long as you don't use Safari.";
    } else if(commandinput.value == "donate"){
        commandoutput.value = "...";
        scriptApp("Browser");
        browserview.src = "https://paypal.me/tylerruotolo";
    } else if(commandinput.value == ""){
        commandoutput.value = "";
    } else if(commandinput.value == "yes"){
        commandoutput.value = repliestoyes[Math.floor(Math.random() * repliestoyes.length)];
    } else if(commandinput.value == "no"){
        commandoutput.value = "Okay.";
    } else if(commandinput.value == "lock my computer"){
        commandoutput.value = "Locking your computer.";
        signOut();
    } else if(commandinput.value == "what is your name"){
        commandoutput.value = "My name is Script AI, I'm here to help!";
    } else if(commandinput.value == "whats the weather"){
        commandoutput.value = "Loading weather...";
        scriptApp("Browser");
        browserview.src = "https://www.google.com/search?q=weather";
    } else if(commandinput.value == "what's the weather"){
        commandoutput.value = "Loading weather...";
        scriptApp("Browser");
        browserview.src = "https://www.google.com/search?q=weather";
    } else if(commandinput.value.includes("how")){
        commandoutput.value = "Searching the web for '" + commandinput.value + "'";
        scriptApp("Browser");
        browserview.src = defaultengine + "/search?q=" + commandinput.value;
    } else if(commandinput.value.includes("launch")){
        commandoutput.value = "Launching " + commandinput.value.split("launch ").join("");
        scriptApp(commandinput.value.split("launch ").join(""));
    } else if(commandinput.value.includes("what")){
        commandoutput.value = "Searching the web for '" + commandinput.value + "'";
        scriptApp("Browser");
        browserview.src = defaultengine + "/search?q=" + commandinput.value;
    } else if(commandinput.value.includes("who")){
        commandoutput.value = "Searching the web for '" + commandinput.value + "'";
        scriptApp("Browser");
        browserview.src = defaultengine + "/search?q=" + commandinput.value;
    } else if(commandinput.value.includes("search")){
        commandoutput.value = "Searching " + commandinput.value.split("search");
        scriptApp("Browser");
        browserview.src = defaultengine + "/search?q=" + commandinput.value;
    } else{
        commandoutput.value = "Sorry, I didn't get that.";
    }

    var available_voices = window.speechSynthesis.getVoices();
    
    var english_voice = '';

    for(var i=0; i<available_voices.length; i++) {
        if(available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    if(english_voice === ''){
        english_voice = available_voices[0];
    }
    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = commandoutput.value;
    utter.voice = english_voice;

    window.speechSynthesis.speak(utter);
}

var apps = document.getElementsByClassName("app");

//Browser Version
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
    objbrowserName = "Microsoft Internet Explorer(It is reccomended that you use Chrome)"; 
    objfullVersion = objAgent.substring(objOffsetVersion+5); 
}else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) { 
    objbrowserName = "Firefox(It is reccomended that you use Chrome)"; 
}else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) { 
    objbrowserName = "Safari(It is reccomended that you use Chrome)"; 
    objfullVersion = objAgent.substring(objOffsetVersion+7); 
    if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) objfullVersion = objAgent.substring(objOffsetVersion+8); 
}

var menucon = document.getElementById("menu");

//Dark and Light Mode
function darkMode(){
    document.getElementById('navbar').style.background = 'rgba(0,0,0,0.25)';
    document.getElementById('topnav').style.background = 'rgba(0,0,0,0.25)';
    menucon.style.color = 'white';
    menucon.style.background = 'rgba(0,0,0,0.5)';
}

function lightMode(){
    document.getElementById('navbar').style.background = 'rgba(255,255,255,0.25)';
    document.getElementById('topnav').style.background = 'rgba(255,255,255,0.25)';
    menucon.style.color = 'black';
    menucon.style.background = 'rgba(255,255,255,0.5)';
}