#include "Pad.h"

const int blue[3] = {2, 72, 209};
const int violet[3] = {91, 3, 159};
const int red[3] = {216, 8, 40};

Pad::Pad(String direction) :
	_direction(direction), _previous(false), _toViolet(true), _currentColor{2, 72, 209}, _flash(false) {

	_leds = new CRGB[NUM_LEDS];

	if (_direction == "left") {
		FastLED.addLeds<NEOPIXEL, 5>(_leds, NUM_LEDS);
		pinMode(A2, INPUT);
		_sensorPin = A2;
	}
	else if (_direction == "top") {
		FastLED.addLeds<NEOPIXEL, 4>(_leds, NUM_LEDS);
		pinMode(A3, INPUT);
		_sensorPin = A3;
	}
	else if (_direction == "bottom") {
		FastLED.addLeds<NEOPIXEL, 3>(_leds, NUM_LEDS);
		pinMode(A4, INPUT);
		_sensorPin = A4;
	}
	else if (_direction == "right") {
		FastLED.addLeds<NEOPIXEL, 2>(_leds, NUM_LEDS);
		pinMode(A5, INPUT);
		_sensorPin = A5;
	}
}

int Pad::read() {
	int state = 0;
	int current = analogRead(_sensorPin);
	if (current > 10 && _previous == false) state = 1;
	else if (current <= 10 && _previous == true) state = 2;
	_previous = current > 10;
	return state;
}

void Pad::ledViolet() {
	_currentColor[0] = violet[0];
	_currentColor[1] = violet[1];
	_currentColor[2] = violet[2];
}

void Pad::ledBlue() {
	_currentColor[0] = blue[0];
	_currentColor[1] = blue[1];
	_currentColor[2] = blue[2];
}

void Pad::ledOff() {
	_currentColor[0] = 0;
	_currentColor[1] = 0;
	_currentColor[2] = 0;
}

void Pad::ledOn() {
	if (_direction == "bottom" || _direction == "top") {
		ledViolet();
	}
	else {
		ledBlue();
	}
}

void Pad::ledError() {
	_currentColor[0] = red[0];
	_currentColor[1] = red[1];
	_currentColor[2] = red[2];
}

void Pad::lightFromIndex(String index) {
	if (index == "0") ledOff();
	else if (index == "1") ledOn();
	else if (index == "2") ledError();
}

void Pad::glow() {
	if (_toViolet) {
		_currentColor[0] = _currentColor[0] == violet[0] ? violet[0] : _currentColor[0] + 1;
		_currentColor[1] = _currentColor[1] == violet[1] ? violet[1] : _currentColor[1] - 1;
		_currentColor[2] = _currentColor[2] == violet[2] ? violet[2] : _currentColor[2] - 1;
		if (
			_currentColor[0] == violet[0] &&
			_currentColor[1] == violet[1] &&
			_currentColor[2] == violet[2]
		) {
			_toViolet = false;
		}
	}
	else {
		_currentColor[0] = _currentColor[0] == blue[0] ? blue[0] : _currentColor[0] - 1;
		_currentColor[1] = _currentColor[1] == blue[1] ? blue[1] : _currentColor[1] + 1;
		_currentColor[2] = _currentColor[2] == blue[2] ? blue[2] : _currentColor[2] + 1;
		if (
			_currentColor[0] == blue[0] &&
			_currentColor[1] == blue[1] &&
			_currentColor[2] == blue[2]
		) {
			_toViolet = true;
		}
	}
}

void Pad::update() {
	for(int i = 0; i < NUM_LEDS; i++ ) {
		_leds[i].r = _currentColor[0];
		_leds[i].g = _currentColor[1];
		_leds[i].b = _currentColor[2];
	}
}

CRGB* Pad::getLeds() {
	return _leds;
}

String Pad::getDirection() {
	return _direction;
}
