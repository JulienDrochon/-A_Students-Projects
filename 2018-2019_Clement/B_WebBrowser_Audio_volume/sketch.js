//code by Julien Drochon
//www.julien-drochon.net
//for Soft Machine Lesson at ESA Pyrenees : www.esapyrenees.fr
// License Creative Commons BY-NC

var serial;          // variable to hold an instance of the serialport library
var inputData;
var soundFile01, soundFile02, soundFile03, soundFile04;
// var soundEnd01 = false, soundEnd02 = false, soundEnd03= false, soundEnd04 = false;
var trigger01;
var isPlaying01 = false, isPlaying02 = false, isPlaying03 = false, isPlaying04 = false;
// var soundFile;

function preload(){
  soundFile01 = loadSound("assets/1.mp3");
  soundFile02 = loadSound("assets/2.mp3");
}


function setup() {
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  //serial.open(portName);
  serial.on('data', serialEvent);

  trigger01 = 1;

  // soundFile = document.getElementById("controlAudio04");


//  soundFile01 = document.getElementById("controlAudio01");
  //soundFile01.play();
  soundFile01.onended = function() {
    //alert("The audio 1 has ended");
    isPlaying01 = false;
    trigger01 = 0;
  };

  soundFile02 = document.getElementById("controlAudio02");
  soundFile02.onended = function() {
    // alert("The audio 2 has ended");
    isPlaying02 = false;
    trigger01 = 2;
  };
  //
  // soundFile03 = document.getElementById("controlAudio03");
  // soundFile03.onended = function() {
  //    // alert("The audio 3 has ended");
  //   isPlaying03 = false;
  //   trigger01 = 3;
  // };
  //
  // soundFile04 = document.getElementById("controlAudio04");
  // soundFile04.onended = function() {
  //    // alert("The audio 4 has ended");
  //   isPlaying04 = false;
  //   trigger01 = 0;
  // };

}

function draw() {
  console.log(inputData, 'trigger01 : ' + trigger01, 'isPlaying01 : ' + isPlaying01, 'isPlaying02 : ' + isPlaying02, 'isPlaying03 : ' + isPlaying03);
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.readLine();
  // store it in a global variable:
  inputData = inByte;
  if (inputData < 940 ) {
    if(trigger01 == 0 && isPlaying01 == false){
      isPlaying01 = true;
      soundFile01.play();
    }
    if(trigger01 == 1 && isPlaying02 == false){
      isPlaying02 = true;
      soundFile02.play();
    }
    if(trigger01 == 2 && isPlaying03 == false){
      isPlaying03 = true;
      soundFile03.play();
    }
    if(trigger01 == 3 && isPlaying04 == false){
      isPlaying04 = true;
      soundFile04.play();
    }
  }
}

function keyPressed() {

}
