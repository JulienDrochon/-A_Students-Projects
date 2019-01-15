//code by Julien Drochon
//www.julien-drochon.net
//for Soft Machine Lesson at ESA Pyrenees : www.esapyrenees.fr
// License Creative Commons BY-NC

#include "NewPing.h"

#define TRIGGER_PIN  12  // Arduino pin tied to trigger pin on the ultrasonic sensor.
#define ECHO_PIN     11  // Arduino pin tied to echo pin on the ultrasonic sensor.
#define MAX_DISTANCE 400 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE); // NewPing setup of pins and maximum distance.

void setup() {
  Serial.begin(9600); // Open serial monitor at 9600 baud to see ping results.
}

void loop() {
  unsigned int uS = sonar.ping(); // Send ping, get ping time in microseconds (uS).
  if (uS > 0) {
    Serial.println(uS / US_ROUNDTRIP_CM); // Convert ping time to distance and print result (0 = outside set distance range, no ping echo)
    delay(50);  // Wait 500ms between pings (about 2 pings/sec). 29ms should be the shortest delay between pings.
  }
}
