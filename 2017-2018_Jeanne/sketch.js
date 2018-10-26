
var vid1, vid2, vid3, vid4, vid5, vid6, vid7, vid8;
var  html;
var rouge_flag = false, noir_flag = false;

function preload() {
  vid1 = createVideo('assets/maison.mp4');
  vid2 = createVideo('assets/cailloux.mp4');
  vid3 = createVideo('assets/lune.webm');
  vid4 = createVideo('assets/oiseaux.mp4');
  vid5 = createVideo('assets/miam.webm');
  vid6 = createVideo('assets/yeux.mp4');
  vid7 = createVideo('assets/prison.mp4');
  vid8 = createVideo('assets/tresor.webm');


}


function setup() {
  createCanvas(windowWidth, windowHeight);

html = select('html');

  vid1.size(windowWidth,vid1.height * windowWidth / vid1.width);
  vid2.size(windowWidth,vid2.height * windowWidth / vid2.width);
  vid3.size(windowWidth,vid3.height * windowWidth / vid3.width);
  vid4.size(windowWidth,vid4.height * windowWidth / vid4.width);
  vid5.size(windowWidth,vid5.height * windowWidth / vid5.width);
  vid6.size(windowWidth,vid6.height * windowWidth / vid6.width);
  vid7.size(windowWidth,vid7.height * windowWidth / vid7.width);
  vid8.size(windowWidth,vid8.height * windowWidth / vid8.width);




    accueil();
}

function draw() {
  if (rouge_flag==true) {
    background(255,0,0);
  }else   if (noir_flag==true) {
    background(0);
  }

}

function accueil(){
  rouge_flag = true;
  noir_flag=false;

    html.style('background', 'red');

  vid1.pause();
  vid1.hide();

  vid2.pause();
  vid2.hide();

  vid3.pause();
  vid3.hide();

  vid4.pause();
  vid4.hide();

  vid5.pause();
  vid5.hide();

  vid6.pause();
  vid6.hide();

  vid7.pause();
  vid7.hide();

  vid8.pause();
  vid8.hide();
}

//------------------------------------- vidéo1
function vid1lecture(){
  rouge_flag = false;
  noir_flag = true;

  html.style('background', 'black');

  vid2.stop();
  vid3.stop();
  vid4.stop();
  vid5.stop();
  vid6.stop();
  vid7.stop();
  vid8.stop();

  vid2.hide();
  vid3.hide();
  vid4.hide();
  vid5.hide();
  vid6.hide();
  vid7.hide();
  vid8.hide();

  vid1.show();
  vid1.size(windowWidth,vid1.height * windowWidth / vid1.width);
  vid1.position((windowWidth-vid1.width)/2,(windowHeight-vid1.height)/2);
  vid1.play();

  vid1.onended(accueil);
}
//------------------------------------- vidéo2
function vid2lecture(){
  rouge_flag = false;
  noir_flag = true;

  html.style('background', 'black');

  vid1.stop();
  vid3.stop();
  vid4.stop();
  vid5.stop();
  vid6.stop();
  vid7.stop();
  vid8.stop();

  vid1.hide();
  vid3.hide();
  vid4.hide();
  vid5.hide();
  vid6.hide();
  vid7.hide();
  vid8.hide();

  vid2.show();
  vid2.size(windowWidth,vid2.height * windowWidth / vid2.width);
  vid2.position((windowWidth-vid2.width)/2,(windowHeight-vid2.height)/2);
  vid2.play();

  vid2.onended(accueil);
}
//------------------------------------- vidéo3
function vid3lecture(){
  rouge_flag = false;
  noir_flag = true;

  html.style('background', 'black');

  vid1.stop();
  vid2.stop();
  vid4.stop();
  vid5.stop();
  vid6.stop();
  vid7.stop();
  vid8.stop();

  vid1.hide();
  vid2.hide();
  vid4.hide();
  vid5.hide();
  vid6.hide();
  vid7.hide();
  vid8.hide();

  vid3.show();
  vid3.size(windowWidth,vid3.height * windowWidth / vid3.width);
  vid3.position((windowWidth-vid3.width)/2,(windowHeight-vid3.height)/2);
  vid3.play();

  vid3.onended(accueil);
}
//------------------------------------- vidéo4
function vid4lecture(){
  rouge_flag = false;
  noir_flag = true;

  html.style('background', 'black');

  vid1.stop();
  vid2.stop();
  vid3.stop();
  vid5.stop();
  vid6.stop();
  vid7.stop();
  vid8.stop();

  vid1.hide();
  vid2.hide();
  vid3.hide();
  vid5.hide();
  vid6.hide();
  vid7.hide();
  vid8.hide();

  vid4.show();
  vid4.size(windowWidth,vid4.height * windowWidth / vid4.width);
  vid4.position((windowWidth-vid4.width)/2,(windowHeight-vid4.height)/2);
  vid4.play();

  vid4.onended(accueil);
}
//------------------------------------- vidéo5
function vid5lecture(){
  rouge_flag = false;
  noir_flag = true;

  html.style('background', 'black');

  vid1.stop();
  vid2.stop();
  vid3.stop();
  vid4.stop();
  vid6.stop();
  vid7.stop();
  vid8.stop();

  vid1.hide();
  vid2.hide();
  vid3.hide();
  vid4.hide();
  vid6.hide();
  vid7.hide();
  vid8.hide();

  vid5.show();
  vid5.size(windowWidth,vid5.height * windowWidth / vid5.width);
  vid5.position((windowWidth-vid5.width)/2,(windowHeight-vid5.height)/2);
  vid5.play();
  vid5.onended(accueil);
}
//------------------------------------- vidéo6
function vid6lecture(){
  rouge_flag = false;
  noir_flag = true;

  html.style('background', 'black');

  vid1.stop();
  vid2.stop();
  vid3.stop();
  vid4.stop();
  vid5.stop();
  vid7.stop();
  vid8.stop();

  vid1.hide();
  vid2.hide();
  vid3.hide();
  vid4.hide();
  vid5.hide();
  vid7.hide();
  vid8.hide();

  vid6.show();
  vid6.size(windowWidth,vid6.height * windowWidth / vid6.width);
  vid6.position((windowWidth-vid6.width)/2,(windowHeight-vid6.height)/2);
  vid6.play();
  vid6.onended(accueil);
}

//------------------------------------- vidéo7
function vid7lecture(){
  rouge_flag = false;
  noir_flag = true;

  html.style('background', 'black');

  vid1.stop();
  vid2.stop();
  vid3.stop();
  vid4.stop();
  vid5.stop();
  vid6.stop();
  vid8.stop();

  vid1.hide();
  vid2.hide();
  vid3.hide();
  vid4.hide();
  vid5.hide();
  vid6.hide();
  vid8.hide();

  vid7.show();
  vid7.size(windowWidth,vid7.height * windowWidth / vid7.width);
  vid7.position((windowWidth-vid7.width)/2,(windowHeight-vid7.height)/2);
  vid7.play();
  vid7.onended(accueil);
}

//------------------------------------- vidéo8
function vid8lecture(){
  rouge_flag = false;
  noir_flag = true;

  html.style('background', 'black');

  vid1.stop();
  vid2.stop();
  vid3.stop();
  vid4.stop();
  vid5.stop();
  vid6.stop();
  vid7.stop();

  vid1.hide();
  vid2.hide();
  vid3.hide();
  vid4.hide();
  vid5.hide();
  vid6.hide();
  vid7.hide();

  vid8.show();
  vid8.size(windowWidth,vid8.height * windowWidth / vid8.width);
  vid8.position((windowWidth-vid8.width)/2,(windowHeight-vid8.height)/2);
  vid8.play();
  vid8.onended(accueil);
}

//----------------------------------------------- Interactions avec le clavier
function keyPressed() {
  if(keyCode == 65){ // touche a - pas ok
    vid1lecture();
  }
  if(keyCode == 86){ // touche v
    vid2lecture();
  }
  if(keyCode == 83){ // touche s - pas ok - ??
    vid3lecture();
  }
  if(keyCode == 81){ // touche q - pas ok
    vid4lecture();
  }
  if(keyCode == 87){ // touche w - pas ok - ??
    vid5lecture();
  }
  if(keyCode == 80){ // touche p - pas ok
    vid6lecture();
  }
  if(keyCode == 52){ // touche 4
    vid7lecture();
  }
  if(keyCode == 75){ // touche k - pas ok - ??
    vid8lecture();
  }
}

//----------------------------------------------- Fonction clik de souris déclenche le plein écran
function mousePressed(){
  fullscreen(true);
  resizeCanvas(windowWidth,windowHeight);
}
