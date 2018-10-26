//code by Julien Drochon
//www.julien-drochon.net
//for Soft Machine Lesson at ESA Pyrenees : www.esapyrenees.fr
// License Creative Commons BY-NC

//Téléverser préalablement le code A_A_Potentiometre.ino ou
// A_C_Photocell.ino sur votre carte Arduino

//https://p5js.org/reference/#/libraries/p5.sound

var serial;
//var latestData = "waiting for data";
//var mappedData = 0;
var volume1;
var volume2;
var volume3;
var volume4;

var cordes_frappees;
var cordes_frottees;
var cordes_pincees;
var bois;

var cordes_frappeesvol;
var cordes_frotteesvol;
var cordes_pinceesvol;
var boisvol;


function preload() {
  cordes_frappees = loadSound("assets/cordes_frappees.mp3");
  cordes_frottees = loadSound("assets/cordes_frottees.mp3");
  cordes_pincees = loadSound("assets/cordes_pincees.mp3");
  bois = loadSound("assets/bois.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  cordes_frappees.loop();
  cordes_frottees.loop();
  cordes_pincees.loop();
  bois.loop();

  serial = new p5.SerialPort();

  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
  serial.on('open', gotOpen);
}

function draw(){
  background(255);
  fill(0);
  textSize(40);
text("cordes_frappees : " + volume1, 20, 100);
text("cordes_frottees : "+ volume2, 20, 200);
text("cordes_pincees : " + volume3, 20, 300);
text("bois : " + volume4, 20, 400);
}

// ---------------------------------------------------------- //
// Fonctions pour récupérer les données envoyées par Arduino //
// ---------------------------------------------------------- //

// There is data available to work with from the serial port

function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // println the string
 // latestData = currentString;            // save it for the draw method
 // mappedData = map(latestData, 0, 1023, 0, 1.0);
  var sensors = split(currentString, ','); // sépare les différentes valeurs
  volume1 = map(sensors [0], 0, 1023, 0, 1.0);
  volume2 = map(sensors [1], 0, 1023, 0, 1.0);
  volume3 = map(sensors [2], 0, 1023, 0, 1.0);
  volume4 = map(sensors [3], 0, 1023, 0, 1.0);

  cordes_frappeesvol = constrain(map(volume1, 0.13, 0.81, 0, 1), 0,1);
  cordes_frotteesvol = constrain(map(volume2, 0.13, 0.81, 0, 1), 0,1);
  cordes_pinceesvol = constrain(map(volume3, 0.13, 0.81, 0, 1), 0,1);
  boisvol = constrain(map(volume4, 0.13, 0.81, 0, 1), 0,1);

  cordes_frappees.setVolume(cordes_frappeesvol, 0.05);
  cordes_frottees.setVolume(cordes_frotteesvol, 0.05);
  cordes_pincees.setVolume(cordes_pinceesvol, 0.05);
  bois.setVolume(boisvol, 0.05);
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}
