#ifndef Pad_H
#define Pad_H

#include <Arduino.h>
#include <FastLED.h>
#define NUM_LEDS 15

class Pad {
	private:
		int _sensorPin;
		int _ledPin;
		String _direction;
		CRGB* _leds;
		bool _previous;
		bool _toViolet;
		int _currentColor[3];

	public:
		Pad(int sensorPin, String direction);
		String read();
		void ledViolet();
		void ledBlue();
		void ledOff();
		void ledOn();
		void ledError();
		void glow();
		void update();
		CRGB* getLeds();
};

#endif
