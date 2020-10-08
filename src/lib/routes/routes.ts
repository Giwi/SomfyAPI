import {Application} from 'express';
import {Somfy} from '../Somfy';
import {Site} from './site';
import {Logger} from 'winston';
import {Device} from './device';
import {Security} from './security';

export class Routes {
    somfy: Somfy;
    logger: Logger;

    constructor(somfy: Somfy, logger: Logger) {
        this.somfy = somfy;
        this.logger = logger;
    }

    routes(app: Application) {
        app.use('/', new Site(this.somfy, this.logger).routes());
        app.use('/', new Device(this.somfy, this.logger).routes());
        app.use('/', new Security(this.somfy, this.logger).routes());
    }
}
