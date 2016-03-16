#include "Pad.h"
#include <FastLED.h>
#define NUM_LEDS 15
#define DATA_PIN 6

Pad left(A0, "left");
Pad top(A1, "top");

// incoming message
String fromApp;

// state
String prevState = "glow";
String state = "glow";
String currentSteps;
bool shouldResetGlow = true;

void setup() {
	Serial.begin(9600);
}

void loop() {
	// handle incoming message
	while (Serial.available()) {
		char recieved = Serial.read();
		if (recieved == '#') {
			handleMessage();
			fromApp = "";
		}
		else {
			fromApp += recieved;
		}
	}
	// switch to given state
	handleState();

	// read pads
	handlePads();

	// update leds
	update();
	delay(10);
}

void handleMessage() {
	// keep track of previous sendToMaster
	prevState = state;
	// off
	if (fromApp == "0") {
		state = "off";
	}
	// glow
	else if (fromApp == "1") {
		state = "glow";
		if (prevState != state) shouldResetGlow = true;
	}
	// leftRight
	else if (fromApp == "2") {
		state = "leftRight";
	}
	// left
	else if (fromApp == "3") {
		state = "left";
	}
	// all
	else if (fromApp == "4") {
		state = "all";
	}
	// left/top/bottom/right
	else {
		state = "play";
		currentSteps = fromApp;
	}
}

void handleState() {
	if (state == "glow") {
		EVERY_N_MILLISECONDS(30) {
			if (prevState != state && shouldResetGlow) {
				shouldResetGlow = false;
				left.ledBlue();
				top.ledBlue();
				// right.ledBlue();
				// bottom.ledBlue();
			}
			left.glow();
			top.glow();
			// bottom.glow();
			// right.glow();
		}
	}
	else if (state == "off" && prevState != state) {
		left.ledOff();
		top.ledOff();
		// bottom.ledOff();
		// right.ledOff();
	}
	else if (state == "leftRight" && prevState != state) {
		left.ledOn();
		top.ledOff();
		// bottom.ledOff();
		// right.ledOn();
	}
	else if (state == "left" && prevState != state) {
		left.ledOn();
		// top.ledOff();
		// bottom.ledOff();
		// right.ledOff();
	}
	else if (state == "all" && prevState != state) {
		left.ledOn();
		top.ledOn();
		// bottom.ledOn();
		// right.ledOn();
	}
	else if (state == "play"){
		left.lightFromIndex(currentSteps.substring(0,1));
		top.lightFromIndex(currentSteps.substring(1,2));
		// bottom.lightFromIndex(currentSteps.substring(2,3));
		// right.lightFromIndex(currentSteps.substring(3,4));
	}
}

void handlePad(Pad &pad) {
	int padState = pad.read();
	if (padState > 0) {
		// keydown
		if (padState == 1) {
			Serial.print(pad.getDirection());
			Serial.println(";keydown");
			if (state == "all") pad.ledOff();
			else if (state == "left") pad.ledOff();
		}
		// keyup
		else if (padState == 2) {
			Serial.print(pad.getDirection());
			Serial.println(";keyup");
			if (state == "all") pad.ledOn();
		}
	}
}

void handlePads() {
	handlePad(left);
	handlePad(top);
	// handlePad(bottom);
	// handlePad(right);
}

void update() {
	left.update();
	top.update();
	// bottom.update();
	// right.update();
	FastLED.show();
}
