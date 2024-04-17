import express from 'express';
import { injectable } from 'inversify';
import { getRoutes } from '../routes';



@injectable()
export default class Express {

    public init() {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.get('/', (req, res) => {
            res.send('Server is running');
        })

        app.use('/api/v1/' , getRoutes());

        app.listen(3000, () => {
            console.log('Server is running on port 3000!');
        })


    }
}