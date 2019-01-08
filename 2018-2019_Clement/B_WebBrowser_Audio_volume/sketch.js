//code by Julien Drochon
//www.julien-drochon.net
//for Soft Machine Lesson at ESA Pyrenees : www.esapyrenees.fr
// License Creative Commons BY-NC


// jQuery(document).ready(function($) {
// foo = $("#controlAudio");
// foo.prop("volume", 0.5)
// });

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFD121'; // fill in your serial port name here
var inputData;

function setup() {
  serial = new p5.SerialPort();    // make a new instance of the serialport library
      serial.open(portName);
}

function draw() {
console.log(inputData)
}

function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inputData = inByte;
}
