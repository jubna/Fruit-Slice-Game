//if we click on the start button
var playing=false
var score, trails_left,step,action
var fruits=["Gapple","Rapple","grapes","wmelon","ymelon","berry","banana","orange","pine"]
$(function(){
    //click on the start/reset button
    $("#st_but").click(function(){
        //if we are playing
        if(playing==true){
            location.reload();  //reload page
        }
        else{   //if we are not playing
            playing=true;
            score=0;  //set score to 0
            $("#score_value").html(score);
             //show trails left
             $("#trails_left").show();
             trails_left=3;
             addHeart();
            
              //hide game over box
            $("#game_over").hide();
            //change button to reset
            $("#st_but").html("Reset Game");
             //start generating fruits
            startAction();
           

        }
    });

function addHeart(){
    $("#trails_left").empty();
    for(i = 0; i < trails_left; i++){
        $("#trails_left").append('<img src="images/heart.png" class="life">');
    }
}

function startAction(){
   $("#fruits1").show();
   callFruits()
  $('#fruits1').css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
  //generate a random step
  step = 1+Math.random(5*Math.random());
  //move fruit by step in 10ms
/*   action = setInterval(function(){
    $("#fruits1").css('top',$("#fruits1").position().top+step)
    if($("#fruits1").position().top > $("game_area").height()){ */
       /*  if(trails_left > 1){
            $("#fruits1").show();
            callFruits()
           $('#fruits1').css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
            //generate a random step
             step = 1+Math.random(Math.random()*5);

             //reduce trails by 1
             trails_left --;
             addHeart()  */
             action = setInterval(function(){
        
                //move fruit by one step
                $("#fruits1").css('top', $("#fruits1").position().top + step);                              
            
                //check if the fruit is too low
                if($("#fruits1").position().top > $("#game_area").height()){
             if(trails_left > 1 ){
                //generate a fruit
                $("#fruits1").show();
                callFruits(); //choose a random fruit
                $("#fruits1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

                //generate a random step
                step = 1+ Math.round(5*Math.random()); // change step
                
                //reduce trials by one
                trails_left--;
                
                //populate trialsLeft box
                addHeart(); 
                
            }
             else{   //no trails left
                    playing=false; //can't play
                    $("#st_but").html("Start Game"); //set text 
                    $("#game_over").show();
                    $("#game_over").html("<p>Game over!</p><p>Your score is " +score+ "</p>")
                    //stop 
                    $("#trails_left").hide();
                    stopAction();
             }
        }


},10)

  //check if the fruit height is too low
 
  }


//generate random fruit
function callFruits(){
    $("#fruits1").attr('src','images/'+fruits[Math.round(8*Math.random())]+'.png');  //random fruit
}

function stopAction(){
    clearInterval(action);
    $("#fruits1").hide();
}

//fuction for slice a fruit
$("#fruits1").mouseover(function(){
    score++; //increase score by 1
    $("#score_value").html(score);
   $("#slicesound")[0].play(); //play sound 
   //stop fruit moving
   clearInterval(action);
   //hide fruit by animation
   $("#fruits1").hide("explode",500);  //to work explode animation, jquery ui is needed
   //start forming next fruit only after 500ms
   setTimeout(startAction,500)
})

});