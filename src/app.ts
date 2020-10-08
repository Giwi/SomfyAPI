import express, {Application} from 'express';
import {json, urlencoded} from 'body-parser';
import {Routes} from './lib/routes/routes';
import {Somfy} from './lib/Somfy';
import {Logger} from 'winston';
import cors from 'cors';
import morgan from 'morgan';

export class App {

    public app: Application;

    constructor(conf: any, logger: Logger) {
        const corsOptions = {
            origin: '*',
        }

        this.app = express();
        this.app.use(json());
        this.app.use(urlencoded({extended: true}));
        this.app.all('*', cors(corsOptions))
        this.app.use(morgan('short', {
            stream: {
                write: (message: string) => logger.info(message)
            }
        }));
        new Routes(new Somfy(conf, logger), logger).routes(this.app);
    }
}
