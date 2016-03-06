#ifndef Pad_H
#define Pad_H

#include <Arduino.h>

class Pad {
	private:
		int _sensorPin;
		int _ledPin;
		String _direction;
		int _previous;

	public:
		Pad(int sensorPin, int ledPin, String direction);
		String read();
		void ledOn();
		void ledError();
};

#endif
