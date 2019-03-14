import themidibus.*; //Import the library

String lines[] ;
int randomlines;
int randomFontSize;
int randomPosX;
int randomPosY;

StringList inventory;
IntList PosXlist, PosYlist, TextSizelist;
IntList inventoryFontsIndex;

PFont[] fontes;

MidiBus myBus; // The MidiBus

void setup() {
  size(400, 400);
  // background(0);
  fontes = new PFont[4];



  fontes [0] = loadFont("Cutcut.vlw");
  fontes [1] = loadFont("Deformed.vlw");
  fontes [2] = loadFont("Vecto.vlw");
  fontes [3] = loadFont("Dimension.vlw");

  inventoryFontsIndex = new IntList(); 
  inventory = new StringList();
  PosXlist = new IntList();
  PosYlist = new IntList();
  TextSizelist = new IntList();

  lines = loadStrings("textes.txt");

  MidiBus.list(); // List all available Midi devices on STDOUT. This will show each device's index and name.

  myBus = new MidiBus(this, 0, 1); // Create a new MidiBus with no input device and the default Java Sound Synthesizer as the output device.

  randomlines = int(random(0, lines.length));
  //randomFontSize = int(random(10, 48));

  //randomPosX = int(random(0, width-textWidth(lines[randomlines])));
  //randomPosY = int(random(0, height-randomFontSize));

  //println("Pitch:"+pitch);

  inventory.append(lines[randomlines]);
//  println(lines[randomlines] + int(random(0, width-textWidth(lines[randomlines]))) + int(random(0, height-randomFontSize)));
  PosXlist.append( int(random(0, width-textWidth(lines[randomlines]))) );
  PosYlist.append( int(random(0, height-randomFontSize)) );
  TextSizelist.append(int(random(10, 48)));
  inventoryFontsIndex.append(int(random(0, 4)));
  smooth();
}

void draw() {



  background(0);

  if (inventory.size() > 0) {
    for (int i=0; i < inventory.size(); i++) {
      fill(255);
      
      // PFont temp = createFont(inventoryFonts.get(i), 32); // PFont
      textFont(fontes[inventoryFontsIndex.get(i)]);
      textSize(TextSizelist.get(i));
      text(inventory.get(i), PosXlist.get(i), PosYlist.get(i));
    }
  }
}



void noteOn(int channel, int pitch, int velocity) {

  randomlines = int(random(0, lines.length));
  //randomFontSize = int(random(10, 48));

  //randomPosX = int(random(0, width-textWidth(lines[randomlines])));
  //randomPosY = int(random(0, height-randomFontSize));
  inventoryFontsIndex.append(int(random(0, 4)));
  //println("Pitch:"+pitch);
  inventory.append(lines[randomlines]);
  //println(lines[randomlines] + int(random(0, width-textWidth(lines[randomlines]))) + int(random(0, height-randomFontSize)));
  PosXlist.append( int(random(0, width-textWidth(lines[randomlines]))) );
  PosYlist.append( int(random(0, height-randomFontSize)) );
  TextSizelist.append(int(random(2, 24)));
//  println(inventory.size());

 // OscMessage myMessage = new OscMessage("/fromProcessing");

//  myMessage.add(int(random(0, 7))); /* add an int to the osc message */

  /* send the message */
//  oscP5.send(myMessage, myRemoteLocation);
}

void noteOff(int channel, int pitch, int velocity) {
}
void controllerChange(int channel, int number, int value) {
}