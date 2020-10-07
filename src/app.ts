import express, {Application} from 'express';
import {json, urlencoded} from 'body-parser';
import {Routes} from './lib/routes/routes';
import {Somfy} from './lib/Somfy';
import {Logger} from 'winston';

export class App {

    public app: Application;

    constructor(conf: any, logger: Logger) {
        this.app = express();
        this.app.use(json());
        this.app.use(urlencoded({extended: true}));
        new Routes(new Somfy(conf, logger), logger).routes(this.app);
    }
}
