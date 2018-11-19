//code by Julien Drochon
//www.julien-drochon.net
//for Soft Machine Lesson at ESA Pyrenees : www.esapyrenees.fr
// License Creative Commons BY-NC

// Déclaration de variables
int sensorValue; // pour les données du potentiomètre
int pin = A0; // pour déterminer quelle entrée est utilisé par le potentiomètre sur la carte Arduino

// Initialisation de la carte
void setup() {
  // initialisation du port série à un débit de 9600 par seconde
  Serial.begin(9600);
}

// Execution en boucle du programme
void loop() {
  // On attribue à la variable sensorValue les données analogiques reçu sur la broche
  // A0 de l'ordinateur. La fonction analogRead() permet de faire cela.
  sensorValue = analogRead(pin);
  // On envoie les valeurs de la variable sensorValue
  // au port série de l'ordinateur
  Serial.println(sensorValue);
  delay(1);        // Delai de 1 milliseconde pour stabiliser le transfert
}
