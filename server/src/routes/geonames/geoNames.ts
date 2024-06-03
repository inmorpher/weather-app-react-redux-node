import axios from 'axios';
import express, { Request, Response } from 'express';
import { GeonameService } from '../../services/geoNames.service';

interface CustomRequest extends Request {
	custom: string;
}

const geoNamesRouter = express.Router();

const geoNamesService = new GeonameService(axios);

geoNamesRouter.get('/byName', async (req: Request, res: Response) => {
	const query = req.query.q as string;
	if (typeof query === 'string') {
		try {
			const response = await geoNamesService.searchByName(query);
			res.send(response);
		} catch (error) {
			res.status(500).send('Internal server error');
		}
	} else {
		res.status(400).send('You must provide a query');
	}
});

geoNamesRouter.get('/byGeo', (req: Request, res: Response) => {
	const { lat, lng } = req.query;
	res.send('you re searching by geo' + req.query.lat + req.query.lng);
});

export { geoNamesRouter };
