var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;


$(".btn").click(function() {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if(userClickedPattern.length === gamePattern.length) {
         setTimeout(function(){
            nextSequence();
         }, 1000);
      }   
   } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
      }, 200);      
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
      
   }
} 

function nextSequence () {
   userClickedPattern = [];
   var randomNumber = Math.floor(Math.random() * 4);  
   var randomChosenColour = buttonColours[randomNumber]; 
   gamePattern.push(randomChosenColour);
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
   playSound(randomChosenColour);
   $("h1").text("Level " + level);
   level += 1
}

function playSound (name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

function animatePress(currentColour) {
   $("." + currentColour).addClass("pressed");
   setTimeout(function() {
      $("."+currentColour).removeClass("pressed");
   }, 100);
}

$(document).keydown(function() {
   if(!started){
      nextSequence();   
      started = true;
   }   
});

function startOver() {
   level = 0;
   gamePattern = [];
   started = false;
   $("h1").text("Press any key to start");
}














