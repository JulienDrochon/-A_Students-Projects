var soundFile01, soundFile02, soundFile03, soundFile04;
var serial;
var i=0;

function preload() {
  soundFile01 = loadSound('assets/1.mp3');
  soundFile02 = loadSound('assets/2.mp3');
  soundFile03 = loadSound('assets/3.mp3');
  soundFile04 = loadSound('assets/4.mp3');
}

function setup() {
  serial = new p5.SerialPort();
  // serial.open("/dev/cu.usbmodemFA131");
  serial.on('data', serialEvent);

  soundFile01.onended(aftersound1);
  soundFile02.onended(aftersound2);
  soundFile03.onended(aftersound3);
  soundFile04.onended(aftersound4);
}

function serialEvent() {
  let inString = serial.readLine();
  trim(inString);  // on nettoie les données venant d'arduino
  if (!inString) return; // on nettoie les données venant d'arduino

  if(soundFile01.isPlaying() || soundFile02.isPlaying() || soundFile03.isPlaying() || soundFile04.isPlaying() )
  {

  }
  else if (inString > 30 && i==0)
  {
    soundFile01.play();
  }
  else if (inString > 30 && i==1)
  {
    soundFile02.play();
  }
  else if (inString > 30 && i==2)
  {
    soundFile03.play();
  }
  else if (inString > 30 && i==3)
  {
    soundFile04.play();
  }
}

function aftersound1(){
  console.log("fin son 1");

  i++;
}

function aftersound2(){
  console.log("fin son 2");

  i++;
}

function aftersound3(){
  console.log("fin son 3");

  i++;
}

function aftersound4(){
  console.log("fin son 4");
  i=0;
}
