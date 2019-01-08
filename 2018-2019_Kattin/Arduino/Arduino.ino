// Télécharger la bibliothèque Servo (Menu -> Sketch -> Include Library -> Manage Libraries)


#include <Servo.h> // // importation de la bibliothèque Servo

int incomingByte;
Servo myservo;  // Creation d'un objet servo nommé myservo

const int ledPin = 13;

void setup() {
  Serial.begin(9600);

  myservo.attach(9);  // indiquer la broche ou est branché le servo, ici pin 9
  pinMode(13, OUTPUT); // définir pin 13 comme sortie
}

void loop() {
  if (Serial.available() > 0) {   // see if there's incoming serial data
    incomingByte = Serial.read(); // read it
    if (incomingByte == 1) {    // if it's a 1 (ASCII 72),
      digitalWrite(13, HIGH); // turn on the LED
    }
    if (incomingByte == 2) {    // if it's a 0
      digitalWrite(13, LOW);  // turn off the LED
    }
    if (incomingByte == 3) {    // if it's a capital H (ASCII 72),
      myservo.write(90); // indication de l'angle du servo
    }
    if (incomingByte == 4) {    // if it's an L (ASCII 76)
      myservo.write(180); // indication de l'angle du servo
    }

  }


  delay(15);
}



