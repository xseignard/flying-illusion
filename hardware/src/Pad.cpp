#include "Pad.h"

Pad::Pad(int sensorPin, int ledPin, String direction) :
	_sensorPin(sensorPin), _ledPin(ledPin), _direction(direction), _previous(0) {
	pinMode(sensorPin, INPUT_PULLUP);
}

String Pad::read() {
	String state = "";
	int current = digitalRead(_sensorPin);
	if (current == HIGH && _previous == LOW) state = _direction + ";keyup";
	else if (current == LOW && _previous == HIGH) state = _direction + ";keydown";
	_previous = current;
	return state;
}

void Pad::ledOn() {}

void Pad::ledError() {}
