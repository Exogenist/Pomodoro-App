//Created by Swainson Holness version 1.0.1

$(document).ready(function(){
    var ring = "red";
    var sound = document.getElementById("breakAudio");
    var soundStart = document.getElementById("sessionAudio");
    var color = "#55c1e9";
    var loader = 301;
    var session = "Session";
    var num = 25;
    var numBreak = 5;
    var counter = true;
    var totalSec = num*60;
    var drawCircle = function (){
        var getCanvas = $("#circleCanvas")
        var ctx = getCanvas[0].getContext("2d");
        
        //clear canvas to draw
        ctx.clearRect(0 ,0 , 500, 320);
        
        //layer 0 Loading circle
        ctx.beginPath();
        ctx.arc(150,160,140,2*Math.PI,0*Math.PI);
        ctx.stroke();
        ctx.fillStyle=color;
        ctx.fill();
        
        //layer 1 loading rectangle
        ctx.beginPath();
        ctx.rect(0, 0, 410, loader);
        ctx.fillStyle = "#282828";
        ctx.fill();
        
        //layer 2 Ring circle
        ctx.beginPath();
        ctx.arc(150,160,150,0*Math.PI,2*Math.PI);
        ctx.strokeStyle=ring;
        ctx.stroke();
        
        //layer 3 font "session"
        ctx.font = "50px Helvetica";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(num,150,225);
        
        //layer 4 font "timer"
        ctx.font = "100 50px Helvetica";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(session,150,125);
        
        //Main functionality of the program
    }
    drawCircle();
    
    function addSession() {
        num += 1;
        totalSec = num * 60
        $("#sessionNum").text(num);
        drawCircle();
    }

    function minusSession() {
        if(num > 1) {
            num -= 1;
        } else {
            num -= 0
        }
        totalSec = num * 60
        $("#sessionNum").text(num);
        drawCircle();
    }

    function addBreak() {
        numBreak += 1;
        if(session === "Break!") {
            num = numBreak;
            totalSec = num *60;
            drawCircle();
        }
        $("#breakNum").text(numBreak);
    }

    function minusBreak() {
        if(numBreak > 1) {
            numBreak -= 1;
        } else {
            numBreak -= 0;
        }
        if(session === "Break!") {
            num = numBreak;
            totalSec = num *60;
            drawCircle();
        }
        $("#breakNum").text(numBreak);
    }
    
    function reset() {
        session = "Session";
        var numHolder = parseInt($("#sessionNum").text());
        if(num != numHolder) {
            num = numHolder;
            totalSec = num*60;
        };
    }
    
    function resetBreak() {
        session = "Break!"
        var numHolderB = parseInt($("#breakNum").text());
        if(num != numHolderB) {
            num = numHolderB;
            totalSec = num*60;
        };
    }
    
    function breakTime() {
        var numBreak = parseInt($("#breakNum").text());
        session = "Break!"
        num = numBreak;
        totalSec = num*60;
        drawCircle();
    }
    
    function sessionRepeat() {
        var repeatHolder = parseInt($("#sessionNum").text());
        session = "Session"
        num = repeatHolder;
        totalSec = num*60;
        drawCircle();
    }
    
    $("#plusSession").on("click", function() {
        reset();
        addSession();
    });

    $("#subtractSession").on("click", function() {
        reset();
        minusSession();
    });
    
    $("#breakAdd").on("click", function() {
        if(session === "Break!"){
            resetBreak();
        }
        addBreak();
    });
    
    $("#breakSubtract").on("click", function() {
        if(session === "Break!"){
            resetBreak();
        }
        minusBreak();
    });
    
    //trigger countdown event update
    var setTime;
    
    function update() {
        counter = !counter;
    }
    
    function setup() {
        countDown();
        setTime = setInterval(countDown, 1000);
    }
    
    function stopInterval() {
        clearInterval(setTime);
    }
    
    function progress() {
        if(session === "Session") {
            var minSession = parseInt($("#sessionNum").text());
            var staticSec = minSession * 60;
            var loadPercent =totalSec / staticSec;
            loader = loadPercent * 301;
        }
        if(session === "Break!") {
            var minSession = parseInt($("#breakNum").text());
            var staticSec = minSession * 60;
            var loadPercent =totalSec / staticSec;
            loader = loadPercent * 301;
        }
    }
    
    function colorChange() {
        if(session === "Session") {
            color = "#55c1e9";
        }
        if(session === "Break!") {
            color = "#ff5a5a";
        }
    }
    
    function playSound() {
        sound.play();
    }
    
    function playStart() {
        soundStart.play();
    }
    
    function countDown() {
        ring = "#00ff66";
        colorChange();
        totalSec -= 1;
        var timeHour = (new Date).clearTime().addSeconds(totalSec).toString('H:mm:ss');
        var timeMin = (new Date).clearTime().addSeconds(totalSec).toString('mm:ss');
        if(totalSec < 3600){
            num = timeMin
            progress();
            drawCircle();
        } else {
            num = timeHour
            progress();
            drawCircle();
        }
        if(num === "00:00" && session === "Session"){
            breakTime();
            playSound("break");
        }
        
        if(num === "00:00" && session === "Break!"){
            sessionRepeat();
            playStart();
        }
        
    }

    function disableBtn() {
        $("#plusSession").prop("disabled", true);
        $("#subtractSession").prop("disabled", true);
        $("#breakAdd").prop("disabled", true);
        $("#breakSubtract").prop("disabled", true);
    }

    function enableBtn() {
        $("#plusSession").prop("disabled", false);
        $("#subtractSession").prop("disabled", false);
        $("#breakAdd").prop("disabled", false);
        $("#breakSubtract").prop("disabled", false);
    }

    $("#circleCanvas").on("click", function() {
        update();
        if(counter === true) {
            stopInterval();
            enableBtn();
            ring = "red";
            drawCircle();
        }
        if(counter === false) {
            setup();
            disableBtn();
        }
    }); 
});
