if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
var clickedgame = false;
var fromhome = false;
$(function(){
    createbox();
    $.wait = function( callback, seconds){
        return window.setTimeout( callback, seconds * 1000 );
    }
    function createbox(){
        var st = localStorage.getItem('gapp-home');
        if(st == null){
            st = [];
        }else{
           st = JSON.parse(st); 
        }
        if(st.length > 0){
            $(".hellotext").hide();
        }
        var i;
        for (i = 0; i < st.length; i++){
            var boxtext = `<div class="box" home="true" id="${st[i]}"><h1>${st[i]}</h1></br></div>`;
            $(".art").append(boxtext);
        }
    }
    function showPreloader(){
        $(".linePreloader").fadeIn();
    }
    function hidePreloader(){
        $(".linePreloader").fadeOut();
    }
    $(".home-btn").click(function(){
        hidePreloader()
        $(".hellotext").show();
        $(".art").html("");
        if(clickedgame === false){
            $(".home-games").slideUp();
            $(".conf").delay(500).fadeIn();
        }else{
            clickedgame = false;
            $(".page-p").html("");
            $(".page").slideUp();
            $(".conf").delay(500).fadeIn();
        }
        createbox();
    });
    $(".add-btn").click(function(){
        hidePreloader()
        if(clickedgame === false){
            $(".conf").slideUp();
            $(".home-games").delay(500).fadeIn();  
        }else{
            clickedgame = false;
            $(".page-p").html("");
            $(".page").slideUp();
            $(".home-games").delay(500).fadeIn();
        }

    });
    $(document).on("click",".box", function () {
        clickedgame = true;
        var clickedBtnID = $(this).attr('id');
        showgame(clickedBtnID);
        if($(this).attr('home') == "true"){
            fromhome = true;
            $(".conf").slideUp();
            $(".page").delay(500).fadeIn();
        }else{
            fromhome = false;
            $(".home-games").slideUp();
            $(".page").delay(500).fadeIn();
        }
    });
    $(document).on("click",".follow", function () {
        var clickedBtnID = $(this).attr('id');
        var classs = $(this).attr("class");
        var st = localStorage.getItem('gapp-home');
        if(st == null){
            st = [];
        }else{
            st = JSON.parse(st);
        }
        if(classs !== "follow followed"){
            st.push(clickedBtnID);
            localStorage.setItem("gapp-home", JSON.stringify(st));
            $(".follow").addClass("followed");   
        }else{
            st = st.filter(item => item !== clickedBtnID)
            localStorage.setItem("gapp-home", JSON.stringify(st));
            $(".follow").removeClass("followed"); 
            $(".art").html("");
            createbox();
            if(st.length == 0){
                $(".hellotext").show();
            }
        }
    });
    $(".back-icon").click(function(){
        hidePreloader()
        clickedgame = false;
        $(".page-p").html("");
        if(fromhome == true){
            $(".page").slideUp();
            $(".conf").delay(500).fadeIn();
        }else{
            $(".page").slideUp();
            $(".home-games").delay(500).fadeIn();
        }

    })
    function showgame(name){
        const $h1 = $(".page-h1-name");
        $(".follow").attr("id", name)
        var st = localStorage.getItem('gapp-home');
        if(st == null){
            st = [];
        }else{
            st = JSON.parse(st);
        }
        if(st.indexOf(name) >= 0){
            $(".follow").addClass('followed');
        }else{
            $(".follow").removeClass('followed');
        }
        if(name === "CS:GO"){
            $h1.text("Counter-Strike: Global Offensive");
            showPreloader();
            $(".page-p").rss("https://blog.counter-strike.net/index.php/feed/", {
                limit: 3,
                layoutTemplate: "{entries}",
                entryTemplate:  "<div class='rss-news'><a target='_blank' href='{url}'><h2>{title}</h2></a>{shortBody}</div><hr>",
                onData: function(){hidePreloader()},
                ssl: true,
                host: 'rss-parser-leszekkeu.herokuapp.com/'
            })
        }else if(name === "Fortnite"){
            $h1.text("Fortnite")
            showPreloader();
            $(".page-p").rss("https://www.youtube.com/feeds/videos.xml?channel_id=UClG8odDC8TS6Zpqk9CGVQiQ", {
                limit: 3,
                layoutTemplate: "{entries}",
                entryTemplate:  "<div class='rss-news'><a target='_blank' href='{url}'><h2>{title}</h2></a>{shortBody}</div><hr>",
                onData: function(){hidePreloader()},
                ssl: true,
                host: 'rss-parser-leszekkeu.herokuapp.com/'
            })
            fetch("https://fortnite-api.theapinetwork.com/store/get")
            .then(resp => resp.json())
            .then(resp => {
                var json = JSON.stringify(resp);
                var res = JSON.parse(json);
                $(".page-p").append("<h2 class='ds-h2'>Daily Shop:</h2><div class='fn-ds'></div>")
                var i;
                for (i = 0; i < res.data.length; i++){
                    $(".fn-ds").append(`<img src="${res.data[i].item.images.information}" height="274px" width="274px">`)
                }
            })
            .catch(error => console.log(error))
        }else if(name === "Minecraft"){
            $h1.text("Minecraft");
            showPreloader();
            $(".page-p").rss("https://www.minecraft.net/en-us/feeds/community-content/rss", {
                limit: 3,
                layoutTemplate: "{entries}",
                entryTemplate:  "<div class='rss-news'><a target='_blank' href='{url}'><h2>{title}</h2></a>{shortBody}</div><hr>",
                onData: function(){hidePreloader()},
                ssl: true,
                host: 'rss-parser-leszekkeu.herokuapp.com/'
            })
            function mcget(){
                var nick = document.getElementById("mc-inpt").value;
                if(nick !== ""){
                    $(".img-mc-1").attr("src", `https://minotar.net/body/${nick}/100.png`);
                    $(".img-mc-2").attr("src", `https://minotar.net/skin/${nick}`);
                    $(".mc-imgs").slideDown();
                    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
                }
            }
            $.wait( function(){ $(".page-p").append("<div class='skin-api'><h2>Skin Checker:</h2><input placeholder='type nick' type='text' class='mc-inpt' id='mc-inpt'/><a class='mc-get' id='mc-get'>GET</a><div class='mc-imgs'><img class='img-mc-1'></br><img class='img-mc-2'></div></div>"); document.getElementById("mc-get").addEventListener ("click", mcget, false); }, 1);

        }else if(name === "LOL"){
            $h1.text("League of Legends");
            showPreloader();
            $(".page-p").rss("https://na.leagueoflegends.com/en/rss.xml", {
                limit: 3,
                layoutTemplate: "{entries}",
                entryTemplate:  "<div class='rss-news'><a target='_blank' href='{url}'><h2>{title}</h2></a>{shortBody}</div><hr>",
                onData: function(){hidePreloader()},
                ssl: true,
                host: 'rss-parser-leszekkeu.herokuapp.com/'
            })
        }else if(name === "Overwatch"){
            $h1.text("Overwatch");
            showPreloader();
            $(".page-p").rss("https://www.reddit.com/r/Overwatch/.rss", {
                limit: 3,
                layoutTemplate: "{entries}",
                entryTemplate:  "<div class='rss-news'><a target='_blank' href='{url}'><h2>{title}</h2></a>{shortBody}</div><hr>",
                onData: function(){hidePreloader()},
                ssl: true,
                host: 'rss-parser-leszekkeu.herokuapp.com/'
            })
        }else if(name === "R6S"){
            $h1.text("RAINBOW SIX SIEGE");
            showPreloader();
            $(".page-p").rss("https://www.reddit.com/r/Rainbow6/.rss", {
                limit: 3,
                layoutTemplate: "{entries}",
                entryTemplate:  "<div class='rss-news'><a target='_blank' href='{url}'><h2>{title}</h2></a>{shortBody}</div><hr>",
                onData: function(){hidePreloader()},
                ssl: true,
                host: 'rss-parser-leszekkeu.herokuapp.com/'
            })
        }else if(name === "Dota 2"){
            $h1.text("Dota 2");
            showPreloader();
            $(".page-p").rss("http://blog.dota2.com/feed/", {
                limit: 3,
                layoutTemplate: "{entries}",
                entryTemplate:  "<div class='rss-news'><a target='_blank' href='{url}'><h2>{title}</h2></a>{shortBody}</div><hr>",
                onData: function(){hidePreloader()},
                ssl: true,
                host: 'rss-parser-leszekkeu.herokuapp.com/'
            })
        }else if(name === "TF2"){
            $h1.text("Team Fortress 2");
            showPreloader();
            $(".page-p").rss("https://www.teamfortress.com/rss.xml", {
                limit: 3,
                layoutTemplate: "{entries}",
                entryTemplate:  "<div class='rss-news'><a target='_blank' href='{url}'><h2>{title}</h2></a>{shortBody}</div><hr>",
                onData: function(){hidePreloader()},
                ssl: true,
                host: 'rss-parser-leszekkeu.herokuapp.com/'
            })
        }else if(name === "Roblox"){
            $h1.text("Roblox");
            showPreloader();
            $(".page-p").rss("https://blog.roblox.com/feed/", {
                limit: 3,
                layoutTemplate: "{entries}",
                entryTemplate:  "<div class='rss-news'><a target='_blank' href='{url}'><h2>{title}</h2></a>{shortBody}</div><hr>",
                onData: function(){hidePreloader()},
                ssl: true,
                host: 'rss-parser-leszekkeu.herokuapp.com/'
            })
        }else if(name === "WOT"){
            $h1.text("World of Tanks");
            showPreloader();
            $(".page-p").rss("https://worldoftanks.com/en/rss/news/", {
                limit: 3,
                layoutTemplate: "{entries}",
                entryTemplate:  "<div class='rss-news'><a target='_blank' href='{url}'><h2>{title}</h2></a>{shortBody}</div><hr>",
                onData: function(){hidePreloader()},
                ssl: true,
                host: 'rss-parser-leszekkeu.herokuapp.com/'
            })
        }
    }
    $(".powered").click(function(){location = "https://leszekk.eu"});
    document.getElementsByClassName("page")[0].addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0];
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
    })
    document.getElementsByClassName("page")[0].addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= 400){
            var a = 10*Math.round(startX/10);
            if(distX > 50 && a < 30){
                hidePreloader()
                clickedgame = false;
                $(".page-p").html("");
                if(fromhome == true){
                    $(".page").slideUp();
                    $(".conf").delay(500).fadeIn();
                }else{
                    $(".page").slideUp();
                    $(".home-games").delay(500).fadeIn();
                }        
            }
        }
    })
})