import {Somfy} from '../Somfy';
import {Logger} from 'winston';
import {Router} from 'express';

export class Security {
    somfy: Somfy;
    logger: Logger;


    constructor(somfy: Somfy, logger: Logger) {
        this.somfy = somfy;
        this.logger = logger;
    }

    routes(): Router {
        const router = Router();

        /**
         * @api {get} /site/:siteId/security/state Get the current security level
         * @apiName getSecurityLevel
         * @apiGroup Security
         *
         * @apiParam {String} siteId Site ID.
         * @apiSuccess {String} level Security level in 'disarmed' | 'armed' | 'partial'.
         *
         */
        router.get('/site/:siteId/security/state', async (req, res) => {
            const site = await this.somfy.getSite(req.params.siteId);
            if (typeof site !== 'undefined' && 'data' in site) {
                res.setHeader('Content-Type', 'text/plain');
                res.end('' + site.data.security_level === 'armed');
            } else {
                res.status(504);
                res.send('Error');
            }
        });

        /**
         * @api {get} /site/:siteId/security/:level Set the security level
         * @apiName setSecurityLevel
         * @apiGroup Security
         *
         * @apiParam {String} siteId Site ID.
         * @apiParam {String} level Security level in 'disarmed' | 'armed' | 'partial'.
         *
         * @apiSuccess {Object} status A Status object
         */
        router.get('/site/:siteId/security/:level', async (req, res) => {
            const result = await this.somfy.setSecurityLevel(req.params.siteId, req.params.level as 'disarmed' | 'armed' | 'partial');
            if (typeof result !== 'undefined' && 'data' in result) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result.data));
            } else {
                res.status(504);
                res.send('Error');
            }
        });

        return router;
    }
}
