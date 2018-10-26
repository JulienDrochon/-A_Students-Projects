//code by Julien Drochon
//www.julien-drochon.net
//for Soft Machine Lesson at ESA Pyrenees : www.esapyrenees.fr
// License Creative Commons BY-NC

// Déclaration de variables
int sensorValue01; // pour les données du potentiomètre n°1
int sensorValue02; // pour les données du potentiomètre n°2
int sensorValue03; // pour les données du potentiomètre n°3
int sensorValue04; // pour les données du potentiomètre n°4
int pin01 = A0; // pour déterminer quelle entrée est utilisé par le potentiomètre n°1 sur la carte Arduino
int pin02 = A1; // pour déterminer quelle entrée est utilisé par le potentiomètre n°2 sur la carte Arduino
int pin03 = A2; // pour déterminer quelle entrée est utilisé par le potentiomètre n°3 sur la carte Arduino
int pin04 = A3; // pour déterminer quelle entrée est utilisé par le potentiomètre n°4 sur la carte Arduino

// Initialisation de la carte
void setup() {
  // initialisation du port série à un débit de 9600 baudrate par seconde
  Serial.begin(9600);
}

// Execution en boucle du programme
void loop() {

  // On attribue à la variable sensorValue les données analogiques reçu sur la broche
  // A0 de l'ordinateur. La fonction analogRead() permet de faire cela.
  sensorValue01 = analogRead(pin01);
  //on envoie la valeur sensorValue01 au navigateur via le port série
  Serial.print(sensorValue01);
  Serial.print(",");

  // On attribue à la variable sensorValue les données analogiques reçu sur la broche
  // A1 de l'ordinateur. La fonction analogRead() permet de faire cela.
  sensorValue02 = analogRead(pin02);
  //on envoie la valeur sensorValue02 au navigateur via le port série
  //comme c'est la dernière valeur que nous envoyons, nous utilisons
  //println
  Serial.print(sensorValue02);
  Serial.print(",");

    // On attribue à la variable sensorValue les données analogiques reçu sur la broche
  // A1 de l'ordinateur. La fonction analogRead() permet de faire cela.
  sensorValue03 = analogRead(pin03);
  //on envoie la valeur sensorValue03 au navigateur via le port série
  //comme c'est la dernière valeur que nous envoyons, nous utilisons
  //println
  Serial.print(sensorValue03);
  Serial.print(",");

    // On attribue à la variable sensorValue les données analogiques reçu sur la broche
  // A1 de l'ordinateur. La fonction analogRead() permet de faire cela.
  sensorValue04 = analogRead(pin04);
  //on envoie la valeur sensorValue04 au navigateur via le port série
  //comme c'est la dernière valeur que nous envoyons, nous utilisons
  //println
  Serial.println(sensorValue04);

  delay(10);        // Delai de 10 milliseconde pour stabiliser le transfert des valeurs
}
