import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import themidibus.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class Midi_L_a extends PApplet {

 //Import the library

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

public void setup() {
  
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

  randomlines = PApplet.parseInt(random(0, lines.length));
  //randomFontSize = int(random(10, 48));

  //randomPosX = int(random(0, width-textWidth(lines[randomlines])));
  //randomPosY = int(random(0, height-randomFontSize));

  //println("Pitch:"+pitch);

  inventory.append(lines[randomlines]);
//  println(lines[randomlines] + int(random(0, width-textWidth(lines[randomlines]))) + int(random(0, height-randomFontSize)));
  PosXlist.append( PApplet.parseInt(random(0, width-textWidth(lines[randomlines]))) );
  PosYlist.append( PApplet.parseInt(random(0, height-randomFontSize)) );
  TextSizelist.append(PApplet.parseInt(random(10, 48)));
  inventoryFontsIndex.append(PApplet.parseInt(random(0, 4)));
  
}

public void draw() {



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



public void noteOn(int channel, int pitch, int velocity) {

  randomlines = PApplet.parseInt(random(0, lines.length));
  //randomFontSize = int(random(10, 48));

  //randomPosX = int(random(0, width-textWidth(lines[randomlines])));
  //randomPosY = int(random(0, height-randomFontSize));
  inventoryFontsIndex.append(PApplet.parseInt(random(0, 4)));
  //println("Pitch:"+pitch);
  inventory.append(lines[randomlines]);
  //println(lines[randomlines] + int(random(0, width-textWidth(lines[randomlines]))) + int(random(0, height-randomFontSize)));
  PosXlist.append( PApplet.parseInt(random(0, width-textWidth(lines[randomlines]))) );
  PosYlist.append( PApplet.parseInt(random(0, height-randomFontSize)) );
  TextSizelist.append(PApplet.parseInt(random(2, 24)));
//  println(inventory.size());

 // OscMessage myMessage = new OscMessage("/fromProcessing");

//  myMessage.add(int(random(0, 7))); /* add an int to the osc message */

  /* send the message */
//  oscP5.send(myMessage, myRemoteLocation);
}

public void noteOff(int channel, int pitch, int velocity) {
}
public void controllerChange(int channel, int number, int value) {
}
  public void settings() {  size(400, 400);  smooth(); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "Midi_L_a" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
