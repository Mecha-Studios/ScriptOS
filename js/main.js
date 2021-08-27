/*  Copyright TR 2021
    Script OS  Copyright (C) 2021 TR
    Resdistribution is allowed under certain conditions,
    See LICENSE file for details.
*/

var scriptosversion = "5.0[DEVELOPMENT]";
var defaultengine;
var saveddefault = localStorage.getItem("DefaultEngine");
var batterybar = document.getElementById("batteryprogress");
var errorsound = new Audio("so4error.mp3");
var chargesound = new Audio("so4chargesound.mp3");
var rsod = false;

//Time(Clock stuff)
/*function startTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var midday = "AM";
    midday = (hour >= 12) ? "PM" : "AM";
    hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour);
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("datetime").innerHTML = hour + ":" + min + ":" + sec + " " + midday;
      var t = setTimeout(startTime, 1000);
  }
  
  function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }*/
  
  //startTime();

var savednav = localStorage.getItem("savednav");
var savedesk = localStorage.getItem("savedesk");

var changelog = `ScriptOS Changelog:
.ScriptOS 5.0
-System:
    -Battery charging indicator
    -Bug fixes
    -Speed improvements
    -Task manager added
-Tasks:
    -App added
-Timer:
    -Design improvements
    -Functionality improvements
-Notifications:
    -Notifications redesigned
-ControlPanel:
    -App panel redesigned
    -Design made simpler
-ScriptAI:
    -Design improvements
    -New commands added
    -New responses added
    -Can now remember information(ex: your name/username);
-Navbar:
    -Redesigned
    -Websearch made simpler
-ScriptEdit:
    -Added
-Topnav:
    -Removed
.ScriptOS 4.2.1
-ScriptInjector[BETA]:
    -Users can now inject scripts from GitHub using a permalink
.ScriptOS 4.2
-ScriptInjector[BETA]:
    -Added
    -Allows users to inject any scripts they or someone else has created
    -Allows for third party app development(go to the ScriptOS website if you need help with app development)
-Topnav:
    -Slight design changes
    -Positioning adjustments
-BlazeToUSD:
    -Updated icon
-Startup:
    -Startup icon updated
.ScriptOS 4.1.2
-vmOS:
    -Legacy ScriptOS versions removed
-System:
    -Errors made less intrusive(even though they're rare)
.ScriptOS 4.1.1
-System:
    -Bug fixes
    -Cosmetic improvements
-ScriptAI:
    -New commands
        -Create new StickyNotes by saying "new sticky", "new note", or "new sticky note"
.ScriptOS 4.1
-ControlPanel:
    -Usercard added
-Utilities:
    -StickyNotes added
.ScriptOS 4.0
-System:
    -Notifications Added
    -New animations
    -Speed and stability improvements
    -EditMode added to remove individual icons from the dock and desktop
-Browser:
    -Search from inputbar(thing you type a URL into)
    -Tabs(currently only two per window)
-ScriptAI:
    -More jokes
    -Redesign
    -Launch apps from ScriptAI(app names are case sensitive)
    -Random number command added
        -Say "random number" followed by the maximum number you'd like to set
-ControlPanel added(Press ESC):
    -Restart
    -Lock/Sign Out
    -DarkMode
    -Redesigned
    -New animations
    -Combined with AppCenter
    -Change dock and topnav position
-App UI:
    -App header buttons redesigned
    -App borders removed
    -Buttons redesigned
    -iFrame sizing issues fixed
-Context Menus:
    -Redesigned
    -New buttons
-Settings:
    -Redesigned
    -Rewritten
    -Tabs
-Boot:
    -New startup screen
-Nasdaq:
    -App added
    .Script OS 3.8
    -Happy Birthday Script OS
    -New commands and jokes added to ScriptAI
    -New backgrounds added
    -VisualCode removed
.Script OS 3.7.1
    -App UI Improvements
.Script OS 3.7
    -More jokes added to ScriptAI
    -ScriptAI improvements
    -Window's can be brought to front on click
    -Launch ScriptAI by pressing TAB
.Script OS 3.6
    -Search bug fixes
    -Browser bug fixes
    -About page bug fixes
    -Commands added to ScriptAI
    -Responses added to ScriptAI
    -ScriptAI can now search the web
.Script OS 3.5
    -Files app removed
    -Desktop Shortcuts added
.Script OS 3.4.3
    -BlazeToUSD added
    -StoryFire added
    -Battery level bug fixes
.Script OS 3.4.2
    -Browser settings added
.Script OS 3.4.1
    -New animations added
.Script OS 3.4
    -Device verification on boot added
    -Boot sequence revamped
    -Battery level added
    -Battery level color indicator added
.Script OS 3.3.2
    -Notifications system being tested
.Script OS 3.3.1
    -New animations
    -Bug fixes
.Script OS 3.3
    -TopNav Customization
    -Background Image scaling fixed
    -App header buttons redesigned
    -Themes added to Personalization settings
    -OS font changed
.Script OS 3.2.1
    -Bug fixes
.Script OS 3.2
    -Shortcuts improvements
    -Shortcuts save after closing Script OS
    -Timer icon changed
    -Zoom feature added to appheader buttons
.Script OS 3.1.1
    -Timer app added
.Script OS 3.1
    -Bugs fixed
    -New commands added to Script AI
.Script OS 3.0.1
    -Bugs fixed
    -Donate Button Removed
    -Terminal Removed
.Script OS 3.0
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
    -Browser issues fixed(websites like google.com and youtube.com now work if you install the iFrame Allow or Ignore X-Frame headers chrome extension)
.Script OS 2.9.6
    -Startup screen added
.Script OS 2.9.5
    -Files app redesigned
    -Fixed file saving issues
    -Lock screen added
.Script OS 2.9.4 
    -Shortcuts added 
    -Bug Fixes 
    -HTML Support added 
.Script OS 2.9.3 
    -Files app working in demo mode 
    -Happy 1 Year of Script OS 
.Script OS 2.9.2
    -HTML Editor added
    -Themes color opacity increased 
    -Mothers Day 
.Script OS 2.9.1
    -Themes added
    -Subscribe to PewDiePie button removed
    -App center redesigned 
.Script OS 2.9
    -DarkMode added
    -Script OS Redesigned
    -App system improved
    -Multi app window support
    -All apps redesigned`;

var savedbackground = localStorage.getItem('background');
var saveddefault = localStorage.getItem('DefaultEngine');

if(savedbackground){
    document.body.style.backgroundImage = localStorage.getItem('background');
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
var rightnav = document.createElement('div');
rightnav.className = 'rightdiv';
rightnav.id = 'rightdiv';
var desktopbody = document.getElementById('desktopbody');
var startupscreen = document.createElement('img');
startupscreen.style.width = '100%';
startupscreen.style.height = '100%';
startupscreen.src = 'images/scriptos4startup.gif';
var actioncenter = document.createElement('div');
var appcenter = document.createElement('div');
appcenter.className = 'appcenter';

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
        //console.error(e344);
        //RSOD(e344);
    }else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) { 
        objbrowserName = "Firefox(It is reccomended that you use Chrome)"; 
        //console.error(e344);
        //RSOD(e344);
    }else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) { 
        objbrowserName = "Safari(It is reccomended that you use Chrome)"; 
        objfullVersion = objAgent.substring(objOffsetVersion+7); 
        if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) objfullVersion = objAgent.substring(objOffsetVersion+8); 
        //console.error(e344);
        //RSOD(e344);
    }

    setTimeout(function(){deviceDetection()}, 250);
    setTimeout(function(){desktopbody.innerText+="\n" + objbrowserName + objfullVersion}, 500);
    console.log(objbrowserName + objfullVersion);
    setTimeout(function(){desktopbody.innerText+="\n ScriptOS Version " + scriptosversion}, 750);
    console.log("ScriptOS Version" + scriptosversion);
    setTimeout(function(){desktopbody.innerText+="\n Copyright TR 2021"; console.log("Copyright TR 2021")}, 1000);
    setTimeout(function(){desktopbody.innerText+="\n ScriptOS  Copyright (C) 2021 TR"; console.log("ScriptOS Copyright (C) 2021 TR")}, 1250);
    setTimeout(function(){desktopbody.innerText+="\n Resdistribution is allowed under certain conditions"; console.log("Redistribution is allowed under certain conditions")}, 1500);
    setTimeout(function(){desktopbody.innerText+="\n See LICENSE file for details"; console.log("See LICENSE file for details")}, 1750);
    setTimeout(function(){desktopbody.innerText+="\n System dependencies loaded successfully"; console.log("System dependencies loaded successfully")}, 2000);
    setTimeout(function(){desktopbody.innerText+="\n TR Kernel loaded successfully"; console.log("TR Kernel loaded successfully")}, 2250);
    setTimeout(function(){desktopbody.innerText+="\n Loading JavaScript APIs"; console.log("Loading JavaScript APIs")}, 2500);
    setTimeout(function(){desktopbody.innerText+="\n Loading programs"; console.log("Loading programs")}, 2750);
    setTimeout(function(){desktopbody.innerText+="\n APIs loaded successfully"; console.log("APIs loaded successfully")}, 3000);
    setTimeout(function(){desktopbody.innerText+="\n Programs loaded successfully"; console.log("Programs loaded successfully")}, 3250);
    setTimeout(function(){desktopbody.innerText+="\n Loading ScriptAI and Chromium web engine"; console.log("Loading ScriptAI and Chromium web engine")}, 3500);
    setTimeout(function(){desktopbody.innerText+="\n ScriptAI successfully loaded"; console.log("ScriptAI successfully loaded")}, 3750);
    setTimeout(function(){desktopbody.innerText+="\n Chromium successfully loaded"; console.log("Chromium successfully laoded")}, 4000);
    setTimeout(function(){desktopbody.innerText+="\n Loading app icons"; console.log("Loading app icons")}, 4250);
    setTimeout(function(){desktopbody.innerText+="\n Loading background images"; console.log("Loading background images")}, 4500);
    setTimeout(function(){desktopbody.innerText+="\n App icons successfully loaded"; console.log("App icons successfully loaded")}, 4750);
    setTimeout(function(){desktopbody.innerText+="\n Background images loaded successfully"}, 5000);
    setTimeout(function(){desktopbody.innerText+="\n See the changelog in the About section of Settings"}, 5250);
    setTimeout(function(){desktopbody.innerText+="\n Starting up ScriptOS..."; console.log("Starting up ScriptOS...")}, 5500);

    setTimeout(startUp, 7000);
}

//Drag & Rearrange Icons
function dragStarted(evt){
    //start drag
    source=evt.target;
    //set data
    evt.dataTransfer.setData("text/plain", evt.target.innerHTML);
    //specify allowed transfer
    evt.dataTransfer.effectAllowed = "move";
}

function draggingOver(evt){
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
}

function dropped(evt){
    evt.preventDefault();
    evt.stopPropagation();
    source.innerHTML = evt.target.innerHTML;
    evt.target.innerHTML = evt.dataTransfer.getData("text/plain");
}

//Notifications System
function pushNotification(appname, message){
    var notifbody = document.createElement('div');
    var notifname = document.createElement('h1');
    var notifmessage = document.createElement('p');
    var deletebutt = document.createElement('button');
    var openbutt = document.createElement('button');
    var okaybutt = document.createElement('button');
    
    notifbody.className = 'notifbody';
    notifbody.style.zIndex = top_z+10;
    notifname.innerHTML = appname;
    notifmessage.innerHTML = message;
    deletebutt.innerHTML = "Delete";
    deletebutt.onclick = function(){
        desktopbody.removeChild(notifbody);
    };
    openbutt.innerHTML = "Open";
    openbutt.onclick = function(){
        scriptApp(appname);
        desktopbody.removeChild(notifbody);
    };

    chargesound.play();

    notifbody.appendChild(notifname);
    notifbody.appendChild(notifmessage);
    notifbody.appendChild(openbutt);
    notifbody.appendChild(deletebutt);
    desktopbody.appendChild(notifbody);
    
}

var so4icon = document.createElement('img');
var startupbar = document.createElement('div');

function startUp(){
    desktopbody.innerHTML = "";
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = 'black';
    startupbar.className = 'sloadbar';
    so4icon.src = 'images/ScriptOS Full Logo.png';
    so4icon.className = 'so4icon';
    var startsound = new Audio('startsound.mp3');
    startsound.autoplay = true;
    desktopbody.appendChild(startsound);
    desktopbody.appendChild(so4icon);
    setTimeout(function(){desktopbody.appendChild(startupbar);},3000);
    setTimeout(function(){
        loadDesktop();
        desktopbody.removeChild(so4icon);
        desktopbody.removeChild(startupbar);
    }, 10000);
}

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

    if(savedbackground){
        document.body.style.backgroundImage = localStorage.getItem('background');
    } else{
        document.body.style.backgroundImage = 'url("images/ScriptOS5Background.png")';
    }

    navbar.className = 'navbar';
    navbar.id = 'navbar';
    desktopbody.appendChild(navbar);
    desktopbody.appendChild(rightnav);
    var actiondiv = document.createElement('div');
    var appdiv = document.createElement('div');
    actiondiv.id = 'actiondiv';
    appdiv.id = 'appdiv';
    navbar.appendChild(actiondiv);
    navbar.appendChild(appdiv);

    var actionmenuicon = document.createElement('button');
    actionmenuicon.type = 'image';
    actionmenuicon.style = 'background: url("images/ScriptOS5.png"); background-size: 50px 50px;';
    actionmenuicon.className = 'appicon';
    actionmenuicon.title = 'ScriptOS';
    actionmenuicon.setAttribute("onclick", "desktopbody.appendChild(actioncenter);");
    actiondiv.appendChild(actionmenuicon);

    var searchweb = document.createElement('button');
    var websearch = document.createElement('input');
    searchweb.type = 'image';
    searchweb.className = 'appicon';
    searchweb.style = 'background: url("images/search.png"); background-size: 50px 50px;';
    searchweb.title = 'Search the Web';
    searchweb.id = 'searchweb';
    websearch.style = 'border-radius: 15px; border-style: none; box-shadow: rgba(0, 0, 0, .5)5px 5px 5px; background: rgba(0,0,0, .25); width: 325px; height: 45px; font-size: 45px; z-index:10; animation:zoomfade; animation-duration: 2s; color: white;';
    websearch.type = 'text';
    websearch.placeholder = 'Search the web';
    websearch.onchange = function(e){
        if(e.keyCode === 13){
            e.preventDefault();
            scriptApp("Browser"); 
            browserview.src = defaultengine + "/search?q=" + websearch.value;
        }
    };
    searchweb.onclick = function () {
        scriptApp("Browser"); 
        browserview.src = defaultengine + "/search?q=" + websearch.value; 
        websearch.value = '';
    };
    actiondiv.appendChild(websearch);
    actiondiv.appendChild(searchweb);

    var appicon1 = document.createElement('button');
    appicon1.type = 'image';
    appicon1.style = 'background: url("images/Settings.png"); background-size: 50px 50px;';
    appicon1.className = 'appicon';
    appicon1.title = 'Settings';
    appicon1.setAttribute("onclick", "scriptApp('Settings')");
    appdiv.appendChild(appicon1);
    
    var appicon2 = document.createElement('button');
    appicon2.type = 'image';
    appicon2.style = 'background: url("images/Browser.png"); background-size: 50px 50px;';
    appicon2.className = 'appicon';
    appicon2.title = 'S Browser';
    appicon2.setAttribute("onclick", "scriptApp('Browser')");
    appdiv.appendChild(appicon2);

    var appicon3 = document.createElement('button');
    appicon3.type = 'image';
    appicon3.style = 'background: url("images/Shortcuts.png"); background-size: 50px 50px;';
    appicon3.className = 'appicon';
    appicon3.title = 'Shortcuts';
    appicon3.setAttribute("onclick", "scriptApp('Settings'); openSett(event, 'Shortcuts');");
    appdiv.appendChild(appicon3);

    var batttxt = document.createElement('button');
    batttxt.id = 'battlevelthing';
    rightnav.appendChild(batttxt);
    battLevel();
    function battLevel(){
        navigator.getBattery()
        .then(function(battery) {
            var batterylevel = Math.floor(battery.level * 100) / 100;
            console.log(battery.level);
            let batteryPromise = navigator.getBattery();
            batteryPromise.then(batteryCallback);

            function batteryCallback(batteryObject) {
                printBatteryStatus(batteryObject);
            }
            
            function printBatteryStatus(batteryObject) {
                console.log("IsCharging", batteryObject.charging);
                console.log("Percentage", batteryObject.level);
                batttxt.title = "Battery: " + batteryObject.level*100 + "% Charging: " + batteryObject.charging;
                if(batteryObject.charging == true){
                    if(batterylevel >= .5 && batterylevel < 1){
                        batttxt.style.backgroundColor = "limegreen";
                        batttxt.style.color = 'white';
                    } else if(batterylevel >= 1){
                        batttxt.style.backgroundColor = "rgba(0,0,0,0)";
                        batttxt.style.color = "limegreen";
                    } else if(batterylevel <= .5 && batterylevel >= .3){
                        batttxt.style.backgroundColor = "orange";
                        batttxt.style.color = 'white';
                    } else if(batterylevel <= .3){
                        batttxt.style.backgroundColor = "red";
                        batttxt.style.color = 'white';
                    }
                } else if(batteryObject.charging == false){
                    if(batterylevel >= .5){
                        batttxt.style.backgroundColor = "rgba(0,0,0,0)";
                        batttxt.style.color = "limegreen";
                    } else if(batterylevel <= .5 && batterylevel >= .3){
                        batttxt.style.backgroundColor = "rgba(0,0,0,0)";
                        batttxt.style.color = "orange";
                    } else if(batterylevel <= .3){
                        batttxt.style.backgroundColor = "rgba(0,0,0,0)";
                        batttxt.style.color = "red";
                    }
                }
            }
            batttxt.innerHTML = batterylevel*100 + "%";
        })
    
        setTimeout(function(){
            battLevel();
        }, 500);
    }

    var clockb = document.createElement('button');
    clockb.id = 'datetime';
    rightnav.appendChild(clockb);
    startTime();
    function startTime() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var midday = "AM";
        midday = (hour >= 12) ? "PM" : "AM";
        hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour);
        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);
        clockb.innerHTML = hour + ":" + min + ":" + sec + " " + midday;
          var t = setTimeout(startTime, 1000);
    }
      
    function updateTime(k) {
        if (k < 10) {
          return "0" + k;
        }
        else {
          return k;
        }
    }
    
    if(savednav){
        appdiv.innerHTML = '';
        appdiv.innerHTML = localStorage.getItem("savednav");
    }

    if(savedesk){
        desktopbody.innerHTML = '';
        desktopbody.innerHTML = localStorage.getItem("savedesk");
    }

    actioncenter.className = 'popuplist';

    var ltxt = document.createElement('h2');
    var signoutbutt = document.createElement('button');
    var restartbutt = document.createElement('button');
    var controlcenter = document.createElement('div');
    var usercard = document.createElement('div');
    var usertxt = document.createElement('h1');
    var userpic = document.createElement('img');
    var testnotif = document.createElement('button');
    var testerror = document.createElement('button');

    usercard.className = 'usercard';
    usertxt.className = 'usernametxt';
    usertxt.innerHTML = un;
    userpic.className = 'userpic';
    userpic.src = 'images/profile-pic.png';
    usercard.appendChild(userpic);
    usercard.appendChild(usertxt);

    ltxt.innerHTML = "System"; 

    signoutbutt.style = 'background-image: url("images/lock.png"); background-size: 50px 50px';
    signoutbutt.title = 'Sign Out';
    signoutbutt.onclick = function(){signOut();};
    signoutbutt.className = 'appicon';

    restartbutt.style = 'background-image: url("images/restart.png"); background-size: 50px 50px';
    restartbutt.title = 'Restart';
    restartbutt.onclick = function(){location.reload();};
    restartbutt.className = 'appicon';

    testnotif.style = 'background-image: url("images/notiftest.png"); background-size: 50px 50px';
    testnotif.title = 'Test Notif';
    testnotif.onclick = function(){pushNotification("testing", "TESTING TESTING 294184")};
    testnotif.className = 'appicon';
    
    testerror.style = 'background-image: url("images/errortest.png"); background-size: 50px 50px';
    testerror.title = 'Test Error';
    testerror.onclick = function(){scriptApp("Error");};
    testerror.className = 'appicon';

    controlcenter.className = 'controlcenter';

    var app1 = document.createElement('img');
    var app1butt = document.createElement('button');
    var app1txt = document.createElement('h3');
    app1butt.style = "background-Image: url(images/Settings.png); background-size: 75px 75px;";
    app1txt.innerHTML = "Settings";
    app1butt.innerHTML = "Settings";
    app1.title = 'Settings';
    app1.setAttribute("onclick", "scriptApp('Settings'); desktopbody.removeChild(actioncenter);");
    app1butt.setAttribute("onclick", "scriptApp('Settings'); desktopbody.removeChild(actioncenter);");
    app1txt.className = 'appbutttxt';
    app1butt.className = 'appbutt';
    //app1butt.appendChild(app1);
    //app1butt.appendChild(app1txt);
    appcenter.appendChild(app1butt);

    var app2 = document.createElement('img');
    var app2butt = document.createElement('button');
    var app2txt = document.createElement('h3');
    app2butt.style = "background-Image: url(images/Browser.png); background-size: 75px 75px;";
    app2butt.innerHTML = 'Browser';
    app2.title = 'S Browser';
    app2.setAttribute("onclick", "scriptApp('Browser'); desktopbody.removeChild(actioncenter);");
    app2butt.setAttribute("onclick", "scriptApp('Browser'); desktopbody.removeChild(actioncenter);");
    app2txt.className = 'appbutttxt';
    app2butt.className = 'appbutt';
    //app2butt.appendChild(app2);
    //app2butt.appendChild(app2txt);
    appcenter.appendChild(app2butt);

    var app3 = document.createElement('img');
    var app3butt = document.createElement('button');
    var app3txt = document.createElement('h3');
    app3butt.style = "background-Image: url(images/Nasdaq.png); background-size: 75px 75px;";
    app3butt.innerHTML = 'Nasdaq';
    app3.title = 'Nasdaq';
    app3.setAttribute("onclick", "scriptApp('Nasdaq'); desktopbody.removeChild(actioncenter);");
    app3butt.setAttribute("onclick", "scriptApp('Nasdaq'); desktopbody.removeChild(actioncenter);");
    app3txt.className = 'appbutttxt';
    app3butt.className = 'appbutt';
    //app3butt.appendChild(app3);
    //app3butt.appendChild(app3txt);
    appcenter.appendChild(app3butt);

    var app4 = document.createElement("img");
    var app4butt = document.createElement('button');
    var app4txt = document.createElement('h3');
    app4butt.style = "background-Image: url(images/Timer.png); background-size: 75px 75px;";
    app4butt.innerHTML = 'Timer';
    app4.title = "Timer";
    app4.setAttribute("onclick", "scriptApp('Timer'); desktopbody.removeChild(actioncenter);");
    app4butt.setAttribute('onclick', 'scriptApp("Timer"); desktopbody.removeChild(actioncenter);');
    app4.className = 'appchoice';
    app4txt.className = 'appbutttxt';
    app4butt.className = 'appbutt';
    //app4butt.appendChild(app4);
    //app4butt.appendChild(app4txt);
    appcenter.appendChild(app4butt);

    var app5 = document.createElement('img');
    var app5butt = document.createElement('button');
    var app5txt = document.createElement('h3');
    app5butt.style = "background-Image: url(images/Discord.png); background-size: 75px 75px;";
    app5butt.innerHTML = 'Discord';
    app5.title = 'Discord';
    app5butt.setAttribute("onclick", "scriptApp('Discord'); desktopbody.removeChild(actioncenter);");
    app5.setAttribute("onclick", "scriptApp('Discord'); desktopbody.removeChild(actioncenter);");
    app5.className = 'appchoice';
    app5txt.className = 'appbutttxt';
    app5butt.className = 'appbutt';
    //app5butt.appendChild(app5);
    //app5butt.appendChild(app5txt);
    appcenter.appendChild(app5butt);

    var app6 = document.createElement('img');
    var app6butt = document.createElement('button');
    var app6txt = document.createElement('h3');
    app6butt.style = "background-Image: url(images/ScriptInjector.png); background-size: 75px 75px;";
    app6butt.innerHTML = 'ScriptInjector';
    app6.title = 'ScriptInjector';
    app6butt.setAttribute("onclick", "scriptApp('ScriptInjector'); desktopbody.removeChild(actioncenter);");
    app6.setAttribute("onclick", "scriptApp('ScriptInjector'); desktopbody.removeChild(actioncenter);");
    app6.className = 'appchoice';
    app6txt.className = 'appbutttxt';
    app6butt.className = 'appbutt';
    //app6butt.appendChild(app6);
    //app6butt.appendChild(app6txt);
    appcenter.appendChild(app6butt);

    var app7 = document.createElement('img');
    var app7butt = document.createElement('button');
    var app7txt = document.createElement('h3');
    app7butt.style = "background-Image: url(images/Shortcuts.png); background-size: 75px 75px;";
    app7butt.innerHTML = 'Shortcuts';
    app7.title = 'Shortcuts';
    app7butt.setAttribute("onclick", "scriptApp('Settings'); openSett(event, 'Shortcuts'); desktopbody.removeChild(actioncenter);");
    app7.setAttribute("onclick", "scriptApp('Settings'); openSett(event, 'Shortcuts'); desktopbody.removeChild(actioncenter);");
    app7.className = 'appchoice';
    app7txt.className = 'appbutttxt';
    app7butt.className = 'appbutt';
    //app7butt.appendChild(app7);
    //app7butt.appendChild(app7txt);
    appcenter.appendChild(app7butt);

    var app8 = document.createElement('img');
    var app8butt = document.createElement('button');
    var app8txt = document.createElement('h3');
    app8butt.style = "background-Image: url(images/vmOS.png); background-size: 75px 75px;";
    app8butt.innerHTML = 'vmOS'
    app8.title = 'vmOS';
    app8butt.setAttribute("onclick", "scriptApp('vmOS'); desktopbody.removeChild(actioncenter);");
    app8.setAttribute("onclick", "scriptApp('vmOS'); desktopbody.removeChild(actioncenter);");
    app8.className = 'appchoice';
    app8txt.className = 'appbutttxt';
    app8butt.className = 'appbutt';
    //app8butt.appendChild(app8);
    //app8butt.appendChild(app8txt);
    appcenter.appendChild(app8butt);

    var app9 = document.createElement('img');
    var app9butt = document.createElement('button');
    var app9txt = document.createElement('h3');
    app9butt.style = "background-Image: url(images/BlazeToUSD.png); background-size: 75px 75px;";
    app9butt.innerHTML = 'BlazeToUSD';
    app9.title = 'BlazeToUSD';
    app9butt.setAttribute("onclick", "scriptApp('BlazeToUSD'); desktopbody.removeChild(actioncenter);");
    app9.setAttribute("onclick", "scriptApp('BlazeToUSD'); desktopbody.removeChild(actioncenter);");
    app9.className = 'appchoice';
    app9txt.className = 'appbutttxt';
    app9butt.className = 'appbutt';
    //app9butt.appendChild(app9);
    //app9butt.appendChild(app9txt);
    appcenter.appendChild(app9butt);

    var app10 = document.createElement('img');
    var app10butt = document.createElement('button');
    var app10txt = document.createElement('h3');
    app10butt.style = "background-Image: url(images/ScriptAI.png); background-size: 75px 75px;";
    app10butt.innerHTML = 'ScriptAI';
    app10.title = 'ScriptAI';
    app10butt.setAttribute("onclick", "scriptApp('ScriptAI'); desktopbody.removeChild(actioncenter);");
    app10.setAttribute("onclick", "scriptApp('ScriptAI'); desktopbody.removeChild(actioncenter);");
    app10.className = 'appchoice';
    app10txt.className = 'appbutttxt';
    app10butt.className = 'appbutt';
    //app10butt.appendChild(app10);
    //app10butt.appendChild(app10txt);
    appcenter.appendChild(app10butt);

    var app11 = document.createElement('img');
    var app11butt = document.createElement('button');
    var app11txt = document.createElement('h3');
    app11butt.style = "background-Image: url(images/StoryFire.png); background-size: 75px 75px;";
    app11butt.innerHTML = 'StoryFire';
    app11.title = 'StoryFire';
    app11butt.setAttribute("onclick", "scriptApp('StoryFire'); desktopbody.removeChild(actioncenter);");
    app11.setAttribute("onclick", "scriptApp('StoryFire'); desktopbody.removeChild(actioncenter);");
    app11.className = 'appchoice';
    app11txt.className = 'appbutttxt';
    app11butt.className = 'appbutt';
    //app11butt.appendChild(app11);
    //app11butt.appendChild(app11txt);
    appcenter.appendChild(app11butt);

    var app12butt = document.createElement('button');
    app12butt.style = "background-Image: url(images/ScriptEdit.png); background-size: 75px 75px;";
    app12butt.innerHTML = 'ScriptEdit';
    app12butt.setAttribute("onclick", "scriptApp('ScriptEdit'); desktopbody.removeChild(actioncenter);");
    app12butt.className = 'appbutt';
    appcenter.appendChild(app12butt);

    var actionarea = document.createElement('div');
    actionarea.id = 'actionarea';
    actioncenter.appendChild(appcenter);
    actioncenter.appendChild(controlcenter);

    var closebutt = document.createElement('button');
    closebutt.innerHTML = 'X';
    closebutt.style = 'font-size: 30px; float: right';
    closebutt.className = 'appicon';
    closebutt.onclick = function () { desktopbody.removeChild(actioncenter); };

    controlcenter.appendChild(closebutt);
    controlcenter.appendChild(usercard);
    controlcenter.appendChild(ltxt);
    controlcenter.appendChild(signoutbutt);
    controlcenter.appendChild(restartbutt);
    controlcenter.appendChild(testnotif);
    controlcenter.appendChild(testerror);
    
    desktopbody.appendChild(conmenu1);

    //pushNotification("Settings", "Check changelog for updates and changes");
    if(un){
        if(pw){
            return;
        }
    } else {
        pushNotification("Settings", "Setup your account credentials before using ScriptOS");
    }
}

function RSOD(message){
    rsod = true;
    errorsound.play();
    document.body.innerHTML = '';
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'red';
    document.body.innerText+="\n " + message;
    document.body.innerText+='\n Press CTRL + R or F5 for a system refresh';

}

var classicMode = false

//Sign In
function signIn(){
    desktopbody.removeChild(timetxt);
    //desktopbody.removeChild(loginbar);
   
    if(savednav){
        navbar.innerHTML = '';
        navbar.innerHTML = localStorage.getItem("savednav");
    }
    desktopbody.appendChild(navbar);
    desktopbody.appendChild(rightnav);
    desktopbody.appendChild(conmenu1);
}

var un = localStorage.getItem("username");
var pw = localStorage.getItem("password");

var sotxt = document.createElement('h2');
var userdiv = document.createElement("div");
var timetxt = document.createElement('h1');
var loginbar = document.createElement('div');

//Sign Out
function signOut(){
    var usernamein = document.createElement('input');
    var passinput = document.createElement('input');
    var loginbutt = document.createElement('button');
    var vnum = document.createElement('h3');
    userdiv.className = 'soalert';
    usernamein.className = 'logininput';
    usernamein.placeholder = 'Username';
    passinput.className = 'logininput';
    passinput.placeholder = 'Password';
    passinput.type = "password";
    loginbutt.className = 'loginbutt';
    loginbutt.innerHTML = "Sign In";
    loginbutt.onclick = function(){
        var username = usernamein.value;
        var password = passinput.value;
        if(username === un){
            if(password === pw){
                signIn();
                userdiv.removeChild(sotxt);
                userdiv.removeChild(usernamein);
                userdiv.removeChild(passinput);
                userdiv.removeChild(loginbutt);
                userdiv.removeChild(vnum);
                desktopbody.removeChild(userdiv);
            } else {
                pushNotification("System", "Username or password is incorrect");
            }
        } else {
            pushNotification("System", "Username or password is incorrect");
        }
    };
    vnum.innerHTML = "ScriptOS " + scriptosversion;
    vnum.style.opacity = '50%';
    sotxt.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    timetxt.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    timetxt.style.fontFamily = "Arial";
    timetxt.style.fontSize = '100px';
    timetxt.style.opacity = '50%';
    sotxt.innerHTML = 'ScriptOS';
    sotxt.style.fontSize = '65px';
    sotxt.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    sotxt.style.fontFamily = "Arial";
    sotxt.style.opacity = '50%';
    loginbar.className = 'logbar';
    desktopbody.style.color = 'white';
    desktopbody.style.textAlign = 'center';
    loginbar.onclick = function () { signIn();};
    desktopbody.innerHTML = '';
    userdiv.appendChild(sotxt);
    userdiv.appendChild(usernamein);
    userdiv.appendChild(passinput);
    userdiv.appendChild(loginbutt);
    userdiv.appendChild(vnum);
    desktopbody.appendChild(userdiv);
    desktopbody.appendChild(timetxt);
    //desktopbody.appendChild(loginbar);
    startLockTime();
    function startLockTime() {
        var date = new Date(); /* creating object of Date class */
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var midday = "AM";
        midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
        hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);
        timetxt.innerHTML = hour + ":" + min + ":" + sec + " " + midday; /* adding time to the div */
          var t = setTimeout(startLockTime, 1000); /* setting timer */
      }
      
      function updateTime(k) { /* appending 0 before time elements if less than 10 */
        if (k < 10) {
          return "0" + k;
        }
        else {
          return k;
        }
      }
}

//SleepMode
function sleepMode(){
    timetxt.style.fontSize = '85px';
    timetxt.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    timetxt.style.fontFamily = "Arial";
    timetxt.style.fontSize = '100px';
    timetxt.style.opacity = '50%';
    desktopbody.style.color = 'white';
    desktopbody.style.textAlign = 'center';
    desktopbody.onkeypress = function(){
        signIn();
    };
    desktopbody.innerHTML = '';
    desktopbody.appendChild(timetxt);
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


//Context Menu 1
var conmenu1 = document.createElement('div');
var conmenu1butt1 = document.createElement('li');
var conmenu1butt2 = document.createElement('li');
var conmenu1butt3 = document.createElement('li');
var conmenu1butt4 = document.createElement('li');
var conmenu1butt5 = document.createElement('li');
var conmenu1butt8 = document.createElement('li');
var conmenu1butt6 = document.createElement('li');
var conmenu1butt7 = document.createElement('li');
conmenu1.className = 'menu';
conmenu1.id = 'menu';
conmenu1butt1.innerHTML = 'Personalization';
conmenu1butt1.onclick = function () { scriptApp('Settings'); openSett(event, 'Personalization'); };
conmenu1butt1.className = "menubutton";
conmenu1butt4.innerHTML = 'Create Shortcut';
conmenu1butt4.onclick = function () { scriptApp('Settings'); openSett(event, 'Shortcuts'); };
conmenu1butt4.className = "menubutton";
conmenu1butt6.innerHTML = 'EditMode';
conmenu1butt6.onclick = function () {
    editMode();
    this.remove();
    conmenu1.appendChild(conmenu1butt7);
};
conmenu1butt6.className = "menubutton";
conmenu1butt7.innerHTML = 'Exit EditMode';
conmenu1butt7.onclick = function () {
    normMode();
};
conmenu1butt8.className = "menubutton";
conmenu1butt8.innerHTML = 'Create StickyNote';
conmenu1butt8.onclick = function () {
    newSticky();
};
conmenu1butt7.className = "menubutton";
desktopbody.appendChild(conmenu1);
conmenu1.appendChild(conmenu1butt1);
conmenu1.appendChild(conmenu1butt4);
conmenu1.appendChild(conmenu1butt8);
conmenu1.appendChild(conmenu1butt6);

//StickyNotes
function newSticky(){
    var notebodydiv = document.createElement("div");
    var notehead = document.createElement('div');
    var notetxt = document.createElement("textarea");
    var closeb = document.createElement('ui');
    var notenumber = Math.random();
    closeb.type = 'image';
    closeb.id = "close"
    closeb.title = 'Close';
    closeb.innerHTML = " X ";
    closeb.style.fontFamily = "Arial";
    closeb.className = "appheadbutt";
    closeb.onclick = function(){desktopbody.removeChild(notebodydiv);};
    notebodydiv.className = 'notebody';
    notenumber++;
    notebodydiv.id = "notebody" + notenumber;
    notehead.className = "noteheader";
    notehead.id = notebodydiv.id + "header";
    notebodydiv.onclick = function(){bringToFront(notebodydiv.id);};
    notetxt.className = 'notetxt';
    desktopbody.appendChild(notebodydiv);
    notebodydiv.appendChild(notehead);
    notehead.appendChild(closeb);
    notebodydiv.appendChild(notetxt);
    dragWindow(document.getElementById("notebody" + notenumber));
}

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

var nb = document.querySelector('.navbar');

function editMode(){
    var iconedit = document.getElementsByClassName('appicon');
    pushNotification("EditMode", "Any icon you click on the desktop or doc will be deleted. Open the context menu and click 'Exit EditMode' when you're done.")
    for(var i = 0; i < iconedit.length; i++){
        iconedit[i].onclick = function(){
            if(this.className = 'appicon'){
                this.remove();
            }
        };
    }
}

function normMode(){
    location.reload();
    localStorage.setItem("savednav", appdiv.innerHTML);
}

var currentTasks = 0;
var tasks = 0;
var numTasks = document.getElementById('numtasks');

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
    tasks++;
    app.onerror = function(){errorsound.play();};
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
    close.onclick = function () { desktopbody.removeChild(app); tasks--;};
    fullscreen.onclick = function () {app.style = 'width: 100%; height: calc(100% - 50px); top: 0px; left: 0%';};
    smallscreen.onclick = function () {app.style = 'width: 50%; height: 50%; top: 25%; left: 25%';};

    if (appsname === "Browser") {
        var inputbar = document.createElement("input");
        browserview = document.createElement('iframe');
        var backbutton = document.createElement('button');
        var forwardbutton = document.createElement('button');
        var topdiv = document.createElement('div');
        topdiv.style = 'width: 100%; height: 50px';
        backbutton.innerHTML = '<';
        backbutton.style.borderRadius = '15px';
        backbutton.className = 'appicon';
        backbutton.onclick = function () { window.history.back(); };
        forwardbutton.innerHTML = '>';
        forwardbutton.style.borderRadius = '15px';
        forwardbutton.className = 'appicon';
        forwardbutton.onclick = function () { window.history.forward(); };
        inputbar.type = 'text';
        inputbar.placeholder = 'Website';
        inputbar.style.width = '50%';
        inputbar.style.height = '50px';
        inputbar.style.borderRadius = '15px';
        inputbar.onchange = function () { 
            var inputvalue = inputbar.value;
            if(inputvalue.includes('.')){
                if(inputvalue.includes('https://')){
                    browserview.src = inputvalue;
                } else {
                    browserview.src = "https://" + inputvalue;
                }
            } else {
                browserview.src = defaultengine + "/search?q=" + inputvalue;
            }
        };
        setInterval(function(){
            appheadtext.nodeValue = "Browser - " + browserview.src;
        }, 500);
        topdiv.appendChild(backbutton);
        topdiv.appendChild(forwardbutton);
        topdiv.appendChild(inputbar);
        browserview.id = "browserview" + appnumber;
        browserview.src = defaultengine;
        app.appendChild(topdiv);
        app.appendChild(browserview);
    }else if(appsname === "Tasks"){
        var tasknum = document.createElement('h1');
        var closeall = document.createElement('button');
        app.appendChild(tasknum);
        //app.appendChild(closeall);
        function taskManage(){
            currentTasks = document.getElementsByClassName('app').length;
            tasknum.innerHTML = currentTasks;
        }
        setInterval(taskManage, 500);

    }else if(appsname === "BlazeToUSD"){
        var btuview = document.createElement('iframe');
        btuview.src = "https://blazetousd.ml";
        app.appendChild(btuview);
    }else if(appsname === "Nasdaq"){
        var nview = document.createElement('iframe');
        nview.src = 'https://www.nasdaq.com';
        app.appendChild(nview);
    } else if(appsname === "StoryFire"){
        var sfview = document.createElement('iframe');
        var tabdiv = document.createElement('div');
        sfview.onerror = function(){
            errorsound.play();
        };
        tabdiv.className = 'tab'
        var sft1 = document.createElement('button');
        sft1.className = 'tablinks';
        var sft2 = document.createElement('button');
        sft2.className = 'tablinks';
        var sft3 = document.createElement('button');
        sft3.className = 'tablinks';
        var sft4 = document.createElement('button');
        sft4.className = 'tablinks';
        sft1.innerHTML = 'Home';
        sft1.onclick = function () {sfview.src = 'https://storyfire.com';};
        sft2.innerHTML = 'Social';
        sft2.onclick = function () {sfview.src = 'https://storyfire.com/social';};
        sft3.innerHTML = 'Leaders';
        sft3.onclick = function () {sfview.src = 'https://storyfire.com/leaderboard';};
        sft4.innerHTML = 'Blaze';
        sft4.onclick = function () {sfview.src = 'https://storyfire.com/blaze';};
        tabdiv.appendChild(sft1);
        tabdiv.appendChild(sft2);
        tabdiv.appendChild(sft3);
        tabdiv.appendChild(sft4);
        app.appendChild(tabdiv);
        app.appendChild(sfview);
        sfview.src = "https://www.storyfire.com";
    } else if (appsname === "Settings") {
        var tab = document.createElement('div');
        var backgroundsettings = document.createElement('div');
        var bgsbutt = document.createElement('button');
        var widgets = document.createElement('div');
        var wdgtsbutt = document.createElement('button');
        var about = document.createElement('div');
        var aboutbutt = document.createElement('button');
        var shortcuts = document.createElement('div');
        var scbutt = document.createElement('button');
        var usersett = document.createElement('div');
        var userbutt = document.createElement('button');
        var browsersett = document.createElement('div');
        var bbutt = document.createElement('button');
        var changelogsett = document.createElement('div');
        var clbutt = document.createElement('button');

        tab.className = 'tab';
        bgsbutt.className = 'tablinks';
        bgsbutt.onclick = function(){openSett(event, backgroundsettings.id);};
        bgsbutt.innerHTML = "Personalization";
        wdgtsbutt.className = 'tablinks';
        wdgtsbutt.onclick = function(){openSett(event, widgets.id);};
        wdgtsbutt.innerHTML = "Widgets";
        aboutbutt.className = 'tablinks';
        aboutbutt.onclick = function(){openSett(event, about.id);};
        aboutbutt.innerHTML = "About"
        scbutt.className = 'tablinks';
        scbutt.onclick = function(){openSett(event, shortcuts.id);};
        scbutt.innerHTML = "Shortcuts";
        userbutt.className = "tablinks";
        userbutt.onclick = function(){
            var userdiv = document.createElement("div");
            var usernamein = document.createElement('input');
            var passinput = document.createElement('input');
            var loginbutt = document.createElement('button');
            var cancelbutt = document.createElement('button');
            userdiv.className = 'soalert';
            usernamein.className = 'logininput';
            usernamein.placeholder = 'Username';
            passinput.className = 'logininput';
            passinput.placeholder = 'Password';
            passinput.type = "password";
            loginbutt.className = 'loginbutt';
            loginbutt.innerHTML = "Sign In";
            cancelbutt.className = 'loginbutt';
            cancelbutt.innerHTML = "Cancel";
            if(un){
                if(pw){
                    userdiv.appendChild(usernamein);
                    userdiv.appendChild(passinput);
                    userdiv.appendChild(loginbutt);
                    userdiv.appendChild(cancelbutt);
                    desktopbody.appendChild(userdiv);  
                } 
            } else {
                openSett(event, usersett.id);
            }
            loginbutt.onclick = function(){
                var username = usernamein.value;
                var password = passinput.value;
                if(username === un){
                    if(password === pw){
                        userdiv.removeChild(usernamein);
                        userdiv.removeChild(passinput);
                        userdiv.removeChild(loginbutt);
                        userdiv.removeChild(cancelbutt);
                        desktopbody.removeChild(userdiv);
                        openSett(event, usersett.id);
                    } else {
                        pushNotification("System", "Username or password is incorrect");
                    }
                } else {
                    pushNotification("System", "Username or password is incorrect");
                }
            };
            cancelbutt.onclick = function(){
                userdiv.removeChild(usernamein);
                userdiv.removeChild(passinput);
                userdiv.removeChild(loginbutt);
                userdiv.removeChild(cancelbutt);
                desktopbody.removeChild(userdiv);
            };
        };
        userbutt.innerHTML = "User";
        bbutt.className = 'tablinks';
        bbutt.onclick = function(){openSett(event, browsersett.id);};
        bbutt.innerHTML = "Browser";
        backgroundsettings.className = 'tabcontent';
        clbutt.className = "tablinks";
        clbutt.onclick = function(){openSett(event, changelogsett.id);};
        clbutt.innerHTML = "Changelog";
        app.appendChild(tab);
        tab.appendChild(bgsbutt);
        tab.appendChild(wdgtsbutt);
        tab.appendChild(aboutbutt);
        tab.appendChild(scbutt);
        tab.appendChild(userbutt);
        tab.appendChild(bbutt);
        tab.appendChild(clbutt);
        app.appendChild(usersett);
        usersett.id = 'User';
        usersett.className = 'tabcontent';

        var usernamein = document.createElement('input');
        var passinput = document.createElement('input');
        var loginbutt = document.createElement('button');
        var warntxt = document.createElement('h3');
        warntxt.innerHTML = "ScriptOS will restart when you set your new account credentials";
        userdiv.className = 'soalert';
        usernamein.className = 'logininput';
        usernamein.placeholder = 'Username';
        passinput.className = 'logininput';
        passinput.placeholder = 'Password';
        passinput.type = "password";
        loginbutt.className = 'loginbutt';
        loginbutt.innerHTML = "Set";
        loginbutt.onclick = function(){
            var username = usernamein.value;
            var password = passinput.value;
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            location.reload();
        };
        usersett.appendChild(warntxt);
        usersett.appendChild(usernamein);
        usersett.appendChild(passinput);
        usersett.appendChild(loginbutt);

        app.appendChild(backgroundsettings);
        backgroundsettings.style.display = 'inline';
        backgroundsettings.id = 'Personalization';

        var backgroundtxt = document.createElement("h1");
        backgroundtxt.innerHTML = "Background";
        backgroundsettings.appendChild(backgroundtxt);
        
        var choice0 = document.createElement('input');
        choice0.type = 'image';
        choice0.src = 'images/ScriptOS5Background.png';
        choice0.className = 'backgroundoption';
        choice0.onclick = function () { document.body.style.backgroundImage = 'url(images/ScriptOS5Background.png)'; 
        localStorage.setItem('background','url(images/ScriptOS5Background.png)'); };
        backgroundsettings.appendChild(choice0);

        var choice1 = document.createElement('input');
        choice1.type = 'image';
        choice1.src = 'images/landscape.jpg';
        choice1.className = 'backgroundoption';
        choice1.onclick = function () { document.body.style.backgroundImage = 'url(images/landscape.jpg)'; 
        localStorage.setItem('background','url(images/landscape.jpg)'); };
        backgroundsettings.appendChild(choice1);
        
        var choice2 = document.createElement('input');
        choice2.type = 'image';
        choice2.src = 'images/imac-pro-wallpaper.jpg';
        choice2.className = 'backgroundoption';
        choice2.onclick = function () { document.body.style.backgroundImage = 'url(images/imac-pro-wallpaper.jpg)';
        localStorage.setItem('background','url(images/imac-pro-wallpaper.jpg)'); };
        backgroundsettings.appendChild(choice2);
        
        var choice3 = document.createElement('input');
        choice3.type = 'image';
        choice3.src = 'images/water.png';
        choice3.className = 'backgroundoption';
        choice3.onclick = function () { document.body.style.backgroundImage = 'url("images/water.png")';
        localStorage.setItem('background','url("images/water.png")'); };
        backgroundsettings.appendChild(choice3);
        
        var choice4 = document.createElement('input');
        choice4.type = 'image';
        choice4.src = 'images/Script-OS-3.png';
        choice4.className = 'backgroundoption';
        choice4.onclick = function () { document.body.style.backgroundImage = 'url(images/Script-OS-3.png)';
        localStorage.setItem('background','url(Script-OS-3.png)');};
        backgroundsettings.appendChild(choice4);
        
        var choice5 = document.createElement('input');
        choice5.type = 'image';
        choice5.src = 'images/pewds-pattern.jpg';
        choice5.className = 'backgroundoption';
        choice5.onclick = function () { document.body.style.backgroundImage = 'url(images/pewds-pattern.jpg)';
        localStorage.setItem('background','url(images/pewds-pattern.jpg)');};
        backgroundsettings.appendChild(choice5);
        
        var choice6 = document.createElement('input');
        choice6.type = 'image';
        choice6.src = 'images/animals_hero_giraffe_1_0.jpg';
        choice6.className = 'backgroundoption';
        choice6.onclick = function () { document.body.style.backgroundImage = 'url(images/animals_hero_giraffe_1_0.jpg)';
        localStorage.setItem('background','url(images/animals_hero_giraffe_1_0.jpg)');};
        backgroundsettings.appendChild(choice6);
        
        var choice7 = document.createElement('input');
        choice7.type = 'image';
        choice7.src = 'images/hbd-script-os.png';
        choice7.className = 'backgroundoption';
        choice7.onclick = function () { document.body.style.backgroundImage = 'url(images/hbd-script-os.png)';
        localStorage.setItem('background','url(images/hbd-script-os.png)');};
        backgroundsettings.appendChild(choice7);

        var choice8 = document.createElement('input');
        choice8.type = 'image';
        choice8.src = 'images/Iron-Trump.png';
        choice8.className = 'backgroundoption';
        choice8.onclick = function () { 
            document.body.style.backgroundImage = 'url(images/Iron-Trump.png)';
            localStorage.setItem('background','url(images/Iron-Trump.png)');
        };
       backgroundsettings.appendChild(choice8);

        var choice9 = document.createElement('input');
        choice9.type = 'image';
        choice9.src = 'images/tr-software.png';
        choice9.className = 'backgroundoption';
        choice9.onclick = function () {
            document.body.style.backgroundImage = 'url(images/tr-software.png)';
            localStorage.setItem('background','url(images/tr-software.png)');
        };
        backgroundsettings.appendChild(choice9);

        var choice10 = document.createElement('input');
        choice10.type = 'image';
        choice10.src = 'images/2nd_birthday_script_os.png';
        choice10.className = 'backgroundoption';
        choice10.onclick = function () {
            document.body.style.backgroundImage = 'url(images/2nd_birthday_script_os.png)';
            localStorage.setItem('background','url(images/2nd_birthday_script_os.png)');
        };
        backgroundsettings.appendChild(choice10);

        var choice11 = document.createElement('input');
        choice11.type = 'image';
        choice11.src = 'images/bridge_background.jpg';
        choice11.className = 'backgroundoption';
        choice11.onclick = function () {
            document.body.style.backgroundImage = 'url(images/bridge_background.jpg)';
            localStorage.setItem('background','url(images/bridge_background.jpg)');
        };
        backgroundsettings.appendChild(choice11);

        var choice12 = document.createElement('input');
        choice12.type = 'image';
        choice12.src = 'images/city_bridge_background.jpg';
        choice12.className = 'backgroundoption';
        choice12.onclick = function () {
            document.body.style.backgroundImage = 'url(images/city_bridge_background.jpg)';
            localStorage.setItem('background','url(images/city_bridge_background.jpg)');
        };
        backgroundsettings.appendChild(choice12);

        var choice13 = document.createElement('input');
        choice13.type = 'image';
        choice13.src = 'images/TR_Space_background_2021.png';
        choice13.className = 'backgroundoption';
        choice13.onclick = function () {
            document.body.style.backgroundImage = 'url(images/TR_Space_background_2021.png)';
            localStorage.setItem('background','url(images/TR_Space_background_2021.png)');
        };
        backgroundsettings.appendChild(choice13);

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
        backgroundsettings.appendChild(backgroundinput);
        backgroundsettings.appendChild(backgroundaddbutt);

        app.appendChild(about);
        about.className = 'tabcontent';
        about.id = "About" ;

        var scriptostxt = document.createElement('h1');
        var browserversion = document.createElement('h1');
        var copyright = document.createElement('h1');
        var logoimg = document.createElement('img');
        app.style.color = 'white';
        browserversion.innerHTML = objbrowserName + ": " + objfullVersion;
        scriptostxt.innerHTML = "ScriptOS " + scriptosversion;
        copyright.innerHTML = "© TR 2021";
        logoimg.src = 'images/ScriptOS5.png';
        logoimg.style = 'width: 150px; height: 150px';
        about.appendChild(scriptostxt);
        about.appendChild(logoimg);
        about.appendChild(copyright);
        about.appendChild(browserversion);
        
        app.appendChild(shortcuts);
        shortcuts.id = "Shortcuts";
        shortcuts.className = "tabcontent"

        var appnameshort = document.createElement('input');
        var shortaddnav = document.createElement('button');
        var newshortcut = document.createElement('button');
        var appdiv = document.getElementById("appdiv");
        var noticetxt = document.createElement("h3");
        var resetsc = document.createElement("button");
        var iconpreview = document.createElement('img');
        newshortcut.type = 'image';
        newshortcut.style.width = '50px';
        newshortcut.style.height = '50px';
        newshortcut.style.textAlign = 'center';
        appnameshort.type = 'text';
        appnameshort.placeholder = "App name";
        shortaddnav.innerHTML = 'Add to Navbar';
        noticetxt.innerHTML = "***NAMES ARE CASE SENSITIVE***"
        resetsc.innerHTML = "Reset Shortcuts";
        resetsc.title = "This will remove all added shortcuts";
        resetsc.onclick = function () {localStorage.removeItem("savednav"); window.location.reload();};
        setInterval(function(){iconpreview.src = "images/" + appnameshort.value + ".png"}, 500);
        iconpreview.style.width = '20%';
        iconpreview.style.width = '20%';
        shortcuts.appendChild(appnameshort);
        shortcuts.appendChild(shortaddnav);
        shortcuts.appendChild(resetsc);
        shortcuts.appendChild(noticetxt);
        shortcuts.appendChild(iconpreview);
        shortaddnav.onclick = function () {
            newshortcut.title = appnameshort.value;
            newshortcut.style = 'background: url("images/' + appnameshort.value + '.png"); background-size: 50px 50px;';
            newshortcut.className = 'appicon';
            if(appnameshort.value != "Shortcuts"){
                newshortcut.setAttribute("onclick", "scriptApp('" + appnameshort.value + "')");
            } else if(appnameshort.value = "Shortcuts"){
                newshortcut.setAttribute("onclick", "scriptApp('Settings'); openSett(event, 'Shortcuts');");
            }
            appdiv.appendChild(newshortcut);
            localStorage.setItem("savednav", appdiv.innerHTML);
            desktopbody.removeChild(app);
        };

        app.appendChild(browsersett);
        browsersett.id = "Browser";
        browsersett.className = "tabcontent";

        var defaultbrowser = document.createElement("input");
        var savesett = document.createElement('button');
        var resetbutt = document.createElement('button');
        defaultbrowser.type = "text";
        defaultbrowser.placeholder = "Default Search Engine";
        savesett.innerHTML = "Save Settings";
        savesett.onclick = function(){defaultengine = defaultbrowser.value; logcalStorage.setItem("DefaultEngine", defaultbrowser.value)};
        resetbutt.innerHTML = "Reset Default";
        resetbutt.onclick = function(){localStorage.removeItem("DefaultEngine"); location.reload();};
        browsersett.appendChild(defaultbrowser);
        browsersett.appendChild(savesett);
        browsersett.appendChild(resetbutt);

        app.appendChild(changelogsett);
        changelogsett.id = "Changelog";
        changelogsett.className = "tabcontent";

        var changelogtext = document.createElement('textarea');
        changelogtext.value = changelog;
        changelogtext.style.width = '100%';
        changelogtext.style.height = '90%';
        changelogtext.style.color = 'white';
        changelogtext.style.backgroundColor = 'black';
        changelogtext.readOnly = true;
        changelogtext.style.resize = 'none';
        changelogsett.appendChild(changelogtext);

    } else if(appsname === "Discord"){
        var disframe = document.createElement('iframe');
        disframe.src = 'https://discordapp.com/';
        app.appendChild(disframe);
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
        setbutton.className = 'tbutton';
        setbutton.onclick = function () {
            timing = timeset.value;
            let timerint = setInterval(function(){
                timeleft.innerHTML = "Time: " + timing--;
                if(timing < 0){
                    clearInterval(timerint);
                    app.style.backgroundColor = "red";
                    app.appendChild(timesuptext);
                    alarm.play();
                    pushNotification("Timer","Time's up!!!");
                }
            }, 1000);
        };
        resetbutton.innerHTML = "Reset";
        resetbutton.className = 'tbutton';
        resetbutton.onclick = function(){
            timeleft.innerHTML = "";
            clearInterval(timerint);
            alarm.pause();
            app.style.backgroundColor = "rgba(0, 0, 0, .25)";
            app.removeChild(timesuptext);
            app.removeChild(resetbutton);
            app.removeChild(stopbutton);
        };
        stopbutton.innerHTML = "Stop";
        stopbutton.className = 'tbutton';
        stopbutton.onclick = function(){
            clearInterval(timerint);
            alarm.pause();
            app.style.backgroundColor = "rgba(0, 0, 0, .25)";
        };
        app.appendChild(stopbutton);
        app.appendChild(resetbutton);
        app.appendChild(timeleft);
        app.appendChild(timeset);
        app.appendChild(setbutton);
        
    } else if(appsname === "vmOS"){
        var osview = document.createElement('iframe');
        var tabdiv = document.createElement('div');
        tabdiv.className = 'tab';
        var oschoice1 = document.createElement('button');
        oschoice1.className = 'tablinks';
        var oschoice2 = document.createElement('button');
        oschoice2.className = 'tablinks';
        var oschoice3 = document.createElement('button');
        oschoice3.className = 'tablinks';
        var oschoice4 = document.createElement('button');
        oschoice4.className = 'tablinks';
        var oschoice5 = document.createElement('button');
        oschoice5.className = 'tablinks';
        var oschoice6 = document.createElement('button');
        oschoice6.className = 'tablinks';
        var hidebutt = document.createElement('button');
        hidebutt.className = 'tablinks';
        osview.style.width = '100%';
        osview.style.height = '97.5%';
        oschoice1.innerHTML = 'Windows 93';
        oschoice1.onclick = function () {
            osview.src = 'https://windows93.net';
        };
        oschoice2.innerHTML = 'OS.js';
        oschoice2.onclick = function () {
            osview.src = 'https://demo.os-js.org/';
        };
        oschoice3.innerHTML = 'ScriptOS';
        oschoice3.onclick = function () {
            osview.src = 'index.html';
        };
        hidebutt.innerHTML = 'Hide';
        hidebutt.title = 'Click header to show OS selector';
        hidebutt.onclick = function(){
            tabdiv.style.display = 'none';
        };
        apphead.title = "Click to show OS selector";
        apphead.onclick = function(){
            tabdiv.style.display = 'inline-block';
        };
        tabdiv.appendChild(oschoice1);
        tabdiv.appendChild(oschoice2);
        tabdiv.appendChild(oschoice3);
        tabdiv.appendChild(hidebutt);
        app.appendChild(tabdiv);
        app.appendChild(osview);
        osview.innerHTML = 'Select an OS';
    } else if(appsname === "ScriptAI"){
        app.style.display = 'inline';
        commandinput = document.createElement('input');
        commandoutput = document.createElement('textarea');
        var micbutton = document.createElement('button');
        var sendbutt = document.createElement("button");
        apphead.style.background = "rgba(0,0,0,0)";
        commandinput.placeholder = 'Type a message';
        commandinput.style = 'height:15%; border-style: none;  width:75%; font-size: 75px; border-radius: 15px; color: white; outline: none;';
        commandinput.type = "text";
        commandoutput.style = 'height:75%; text-shadow: 2.5px 2.5px 2.5px black; width:100%; font-size: 65px; border-style: none; resize: none; color:white; background: rgba(0,0,0,0)';
        commandoutput.readOnly = true;
        sendbutt.innerHTML = "Send";
        sendbutt.className = "appchoice";
        micbutton.style = "background-Image: url(images/mic.png); width: 75px; height: 75px; background-size: 75px 75px;";
        micbutton.onclick = function () {
            startDictation();
        };
        commandinput.onkeydown = function (e){
            if(e.keyCode == 13){
                scriptAI();
            }
        };
        //micbutton.onclick = function () {
            //recognizer.start();
        //};
        app.appendChild(commandoutput);
        app.appendChild(commandinput);
        app.appendChild(micbutton);
        //app.appendChild(sendbutt);
    } else if(appsname === "ScriptEdit"){
        var codetxt = document.createElement('textarea');
        var fdiv = document.createElement('div');
        fdiv.className = 'tab';
        var f1 = document.createElement('input');
        var runbutt = document.createElement('button');
        var resetbutt = document.createElement('button');
        var savebutt = document.createElement('button');
        var runscript = document.createElement('script');
        f1.className = 'tablinks';
        runbutt.className = 'tablinks';
        resetbutt.className = 'tablinks';
        runbutt.onclick = function(){
            if(f1.value.includes('.js')){
                runscript.innerHTML = codetxt.value;
                desktopbody.appendChild(runscript);
            } else if(f1.value.includes('.html')){
                scriptApp("Browser");
                browserview.srcdoc = codetxt.value;
            }
                
        };
        resetbutt.onclick = function(){
            location.reload();
        };
        savebutt.onclick = function(){
            saveAs(f1.value);
        };
        codetxt.style.width = '100%';
        codetxt.style.height = '97.5%';
        codetxt.style.backgroundColor = 'black';
        codetxt.style.color = 'white';
        f1.value = 'Untitled.js';
        runbutt.innerHTML = 'Run';
        resetbutt.innerHTML = 'Reset(Stop)';
        savebutt.innerHTML = 'Save As';
        resetbutt.title = 'Restart ScriptOS to remove temporary scripts';
        fdiv.appendChild(f1);
        fdiv.appendChild(runbutt);
        fdiv.appendChild(resetbutt);
        fdiv.appendChild(savebutt);
        app.appendChild(fdiv);
        app.appendChild(codetxt);

        //Save files(txt, js and html)
        function saveAs(filename) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(codetxt.value));
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
    } else if(appsname === "ScriptInjector"){
        var srcinput = document.createElement('input');
        var srcinputlink = document.createElement('input');
        var injectbutt = document.createElement('button');
        var injectbutt2 = document.createElement('button');
        var noticetext = document.createElement('h2');
        srcinput.type = 'file';
        srcinput.class = 'srcinput';
        srcinputlink.type = 'text';
        srcinputlink.placeholder = 'Script URL Path';
        injectbutt.innerHTML = "Inject(Local)";
        injectbutt.class = 'injectbutt';
        injectbutt.onclick = function(){
            //Read and add new script
            var newscript = document.createElement("script");
            desktopbody.appendChild(newscript);
            
            var reader = new FileReader();

            reader.onload = function (event) {
                newscript.src = event.target.result;
            };

            reader.readAsDataURL(srcinput.files[0]);
        };
        injectbutt2.innerHTML = "Inject(URL)";
        injectbutt2.class = 'injectbutt';
        injectbutt2.onclick = function(){
            var newscript = document.createElement("script");
            desktopbody.appendChild(newscript);
            newscript.src = srcinputlink.value;
        };
        noticetext.innerHTML = "NOTE: This program is still in beta and could have issues, report any issues you experience on the ScriptOS website.";
        app.appendChild(srcinput);
        app.appendChild(srcinputlink);
        app.appendChild(injectbutt);
        app.appendChild(injectbutt2);
        app.appendChild(noticetext);
    } else {
        var ehtxt = document.createElement("h1");
        var edtxt = document.createElement("h3");
        ehtxt.innerHTML = "ERROR:";
        edtxt.innerHTML = e343;
        headbuttdiv.removeChild(fullscreen);
        headbuttdiv.removeChild(smallscreen);
        app.style = 'height: 25%; width: 25%; top: 40%; left: 40%; resize: none;';
        app.appendChild(ehtxt);
        app.appendChild(edtxt);
        console.error(e343);
        errorsound.play();
    }
}

var errorcodes = `
ScriptOS Error Codes:
-E343: Program nonexistent/not found
-E344: Browser not supported
-E345: Device not supported
-E346: Loading failure`;

var e343 = new Error("E343: Program nonexistent/not found");
var e344 = new Error("E344: Browser not supported");
var e345 = new Error("E345: Device not supported");
var e346 = new Error("E346: Loading failure");

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
            desktopbody.appendChild(actioncenter);
        }
      }
    //if(e.keyCode == 83 && e.keyCode == 32){
    //      scriptApp("ScriptAI");
    //}
}

function openSett(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openBTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("btabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("btablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

var top_z = 10;

function bringToFront(appname){
    var appelm = document.getElementById(appname);
    if(typeof(appelm) != 'undefined' && appelm != null){
        document.getElementById(appname).style.zIndex = ++top_z;
    }
}

function scriptAI(){
    var jokes = [
        "What's the difference between a Lamborghini and a garbage can of dead babies? I don't have a Lamborghini in my garage",
        "Nancy Pelosi",
        "Hillary Clinton being president",
        "If video games make kids more violent, why are they so easy to beat the shit out of?",
        "How many dead babies does it take to paint a wall? It depends how hard you throw them",
        "Gun free zones being effective",
        "69, nice",
        "Biden forming a coherent sentence",
        "Obama is the best president ever"
    ];
    
    var greetingreplies = [
        "Hi",
        "Hello",
        "What's up",
        "Hi there",
        "Hello, friend",
        "What's up my diggity dogs?",
        "What's up, " + un,
        "Hi, " + un,
        "Hello, " + un
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
        un + ", I'm telling your mother",
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
    } else if(commandinput.value.includes("random number")){
        commandoutput.value = Math.floor(Math.random() * Math.floor(commandinput.value.match(/\d+/)));
    } else if(commandinput.value == "new sticky note"){
        commandoutput.value = "Creating new StickyNote";
        newSticky();
    } else if(commandinput.value == "new sticky"){
        commandoutput.value = "Creating new StickyNote";
        newSticky();
    }else if(commandinput.value == "new note"){
        commandoutput.value = "Creating new StickyNote";
        newSticky();
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
var darkmodesound = new Audio("dark mode sound.mp3");
var lightmodesound = new Audio("light mode sound.mp3");