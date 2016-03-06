#include "Pad.h"

Pad left(A1, 0, "left");
Pad top(4, 0, "top");
Pad bottom(A3, 0, "bottom");
Pad right(2, 0, "right");

const int PAD_COUNT = 4;
Pad pads[PAD_COUNT] = { left, top, bottom, right };

void setup() {
	Serial.begin(9600);
}

void loop() {
	for(int i=0; i < PAD_COUNT; i++){
		String current = pads[i].read();
		if (current.length() > 0) {
			Serial.println(current);
		}
		delay(1);
	}
}
