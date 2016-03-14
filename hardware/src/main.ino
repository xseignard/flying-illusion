#include "Pad.h"
#include <FastLED.h>
#define NUM_LEDS 15
#define DATA_PIN 6


bool glow = true;
bool prevGlow = false;

Pad left(A0, "left");
Pad top(A0, "top");

void setup() {
	Serial.begin(9600);
}

void loop() {
	EVERY_N_MILLISECONDS(10000) {
		glow = !glow;
	}
	if (glow) {
		EVERY_N_MILLISECONDS(30) {
			if (!prevGlow) {
				left.ledBlue();
				top.ledBlue();
			}
			left.glow();
			top.glow();
		}
	}
	else {
		left.ledOn();
		top.ledOff();
	}
	left.update();
	top.update();
	FastLED.show();
	prevGlow = glow;
	delay(10);
}
