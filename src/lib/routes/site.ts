import {Somfy} from '../Somfy';
import {Router} from 'express';
import {Logger} from 'winston';

export class Site {
    somfy: Somfy;
    logger: Logger;

    constructor(somfy: Somfy, logger: Logger) {
        this.somfy = somfy;
        this.logger = logger;
    }

    routes(): Router {
        const router = Router();
        /**
         * @api {get} /site List your registered sites
         * @apiName getALLSites
         * @apiGroup Site
         *
         * @apiSuccess {Object[]} sites A site list
         */
        router.get('/site', async (req, res) => {
            const sites = await this.somfy.getALLSites()
            if (typeof sites !== 'undefined' && 'data' in sites) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(sites.data));
            } else {
                res.status(504);
                res.send('Error');
            }
        });

        /**
         * @api {get} /site/:siteId Get site detail
         * @apiName getSite
         * @apiGroup Site
         *
         * @apiParam {String} siteId Site ID.
         *
         * @apiSuccess {Object} site A site object
         */
        router.get('/site/:siteId', async (req, res) => {
            const site = await this.somfy.getSite(req.params.siteId);
            if (typeof site !== 'undefined' && 'data' in site) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(site.data));
            } else {
                res.status(504);
                res.send('Error');
            }
        });

        return router;
    }
}
