import express, {Application} from 'express';
import {json, urlencoded} from 'body-parser';
import {Routes} from './lib/routes/routes';
import {Somfy} from './lib/Somfy';
import {Logger} from 'winston';
import path from "path";

export class App {

    public app: Application;

    constructor(conf: any, logger: Logger) {
        this.app = express();
        this.app.use(json());
        this.app.use(urlencoded({extended: true}));
        this.app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'html', 'index.html')));
        new Routes(new Somfy(conf, logger), logger).routes(this.app);
    }
}
