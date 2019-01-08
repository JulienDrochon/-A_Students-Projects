
let speechRec;
let said;
let txt;
var output;
var myVoice;

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFD121'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data


function setup() {
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  //serial.on('data', ArduinoEvent);  // callback for when new data arrives
  //  serial.on('error', serialError); // callback for errors
  serial.open(portName);


  noCanvas();
  let bot = new RiveScript({utf8: true});
  // Load a list of files all at once
  // var files = ['brain.rive'];
  // bot.loadFile(files, botLoaded, errorLoading);
  bot.loadFile("brain.rive", function() {
    console.log("Brain loaded!");
    bot.sortReplies();
  }, function(err, filename, lineno) {
    console.log("An error occurred!");
  });

  // bot.loadFile(files).then(botLoaded).catch(errorLoading)
  //---- Voice Speech ---//
  myVoice = new p5.Speech();
  console.log(myVoice.listVoices());
  myVoice.setVoice(0);

  // ----- Voice Recognition
  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec('fr', gotSpeech);
  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = false;
  // This must come after setting the properties
  speechRec.start(continuous, interimResults);



  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    console.log(speechRec);
    if (speechRec.resultValue) {
      said = speechRec.resultString;
      //var reply = bot.reply("local-user", said);

      bot.reply("local-user", said).then(function(reply) {
        //console.log("Bot>", reply);

        output = select('#bot');
        output.html(reply);

        if (reply == 1) {
          myVoice.speak("la réponse est un");
          outByte = 1;
        }
        else if (reply == 2) {
          myVoice.speak("la réponse est deux");
          outByte = 2;
        }
        else if (reply == 3) {
          myVoice.speak("la réponse est trois");
          outByte = 3;
        }
        else if (reply == 4) {
          myVoice.speak("la réponse est quatre");
          outByte = 4;
        }
        console.log('send');
        serial.write(outByte); // send to Arduino
      });


    }
  }
  //---- end voice recognition



  function botLoaded() {
    console.log("Bot loaded");
    bot.sortReplies();
  }

  function errorLoading(error) {
    console.log("Error when loading rivescript files: " + error);
  }
}
