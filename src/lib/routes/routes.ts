import {Application} from 'express';
import {Somfy} from '../Somfy';
import {Auth} from './auth';
import {Site} from './site';
import {Logger} from 'winston';

export class Routes {
    somfy: Somfy;
    logger: Logger;

    constructor(somfy: Somfy, logger: Logger) {
        this.somfy = somfy;
        this.logger = logger;
    }

    routes(app: Application) {
        app.use('/', new Auth(this.somfy, this.logger).routes());
        app.use('/', new Site(this.somfy, this.logger).routes());
    }
}
