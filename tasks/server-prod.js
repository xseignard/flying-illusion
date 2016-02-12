import path from 'path';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'www', 'index.html'));
});

app.use(express.static(path.join(__dirname, '..', 'www')));

app.listen(8080, 'localhost', (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:8080');
});
