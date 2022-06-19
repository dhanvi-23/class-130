song="";
scoreLeftWrist=0;
scoreRightWrist=0;


leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;

function preload(){
    song=loadSound("music.mp3");

}


function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);

}

function modelLoaded(){
    console.log("posenet is initialized");
    
}

function gotPoses(results){
     if(results.length > 0){
         console.log(results);

         scoreLeftWrist=results[0].pose.keypoints[9].score;
         console.log("scoreleftwrist = "+scoreLeftWrist);

         leftwristX=results[0].pose.leftWrist.x;
         leftwristY=results[0].pose.leftWrist.y;
         console.log("leftwrist: x co-ordinate is "+ leftwristX+" Y co-ordinate is "+ leftwristY);

         rightwristX=results[0].pose.rightWrist.x;
         rightwristY=results[0].pose.rightWrist.y;
         console.log("rightwrist: x co-ordinate is "+ rightwristX+" Y co-ordnate is "+rightwristY);


     }
}

function draw(){
    image(video,0,0,600,500);
    fill("#bf6be3");
    stroke("#4e0a6b");
    if(scoreRightWrist > 0.2){
        circle(rightwristX,rightwristY,20);
        if(rightwristY > 0 && rightwristY <=100)
        {
            document.getElementById("speed").innerHTML="speed=0.5x";
            song.rate(0.5);

        }

        else if(rightwristY >100 && rightwristY<=200)
        {
            document.getElementById("speed").innerHTML="speed=1x";
            song.rate(1);
        }

        else if(rightwristY >200 && rightwristY<=300)
        {
            document.getElementById("speed").innerHTML="speed=1.5x";
            song.rate(1.5);
        }

        else if(rightwristY >300 && rightwristY<=400)
        {
            document.getElementById("speed").innerHTML="speed=2x";
            song.rate(2);
        }

        else if(rightwristY >400 && rightwristY<=500)
        {
            document.getElementById("speed").innerHTML="speed=2.5x";
            song.rate(2.5);
        }
    }
    if(scoreLeftWrist > 0.2){
        circle(leftwristX,leftwristY,20);
        InNumberleftWristY=Number(leftWristY);
        remove_decimals=floor(InNumberleftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    
}



