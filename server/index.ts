import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

const clientFolder = path.join(__dirname, '../../client/build');

console.log(clientFolder);
app.use(express.static(path.join(__dirname, '../../client/build')));

/**
 * Logs a message to the console when the /api/weather route is accessed.
 *
 * @param req - the HTTP request object
 * @param res - the HTTP response object
 */
app.get('/api/weather', (req: Request, res: Response) => {
	console.log('/api/weather');

	res.json({
		message: 'Hello World!',
	});
});

/**
 * Logs a message to the console when the /api/weather route is accessed.
 *
 * @param req - the HTTP request object
 * @param res - the HTTP response object
 */
app.get('*', (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

console.log(__dirname);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
