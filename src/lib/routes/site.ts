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
         * @apiGroup SomfyAPI
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
         * @apiGroup SomfyAPI
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

        /**
         * @api {get} /site/:siteId/device Get site devices
         * @apiName getDevicesFromSiteId
         * @apiGroup SomfyAPI
         *
         * @apiParam {String} siteId Site ID.
         *
         * @apiSuccess {Object} devices A Device list object
         */
        router.get('/site/:siteId/device', async (req, res) => {
            const devices = await this.somfy.getDevicesFromSiteId(req.params.siteId);
            if (typeof devices !== 'undefined' && 'data' in devices) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(devices.data));
            } else {
                res.status(504);
                res.send('Error');
            }
        });

        /**
         * @api {get} /site/:siteId/device/:deviceId Get device detail
         * @apiName getDevice
         * @apiGroup SomfyAPI
         *
         * @apiParam {String} siteId Site ID.
         * @apiParam {String} deviceId Device ID.
         *
         * @apiSuccess {Object} devices A Device object
         */
        router.get('/site/:siteId/device/:deviceId', async (req, res) => {
            const device = await this.somfy.getDevice(req.params.siteId, req.params.deviceId);
            if (typeof device !== 'undefined' && 'data' in device) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(device.data));
            }
            else {
                res.status(504);
                res.send('Error');
            }
        });

        /**
         * @api {get} /site/:siteId/security/:level Set the security levle
         * @apiName getDevicesFromSiteId
         * @apiGroup SomfyAPI
         *
         * @apiParam {String} siteId Site ID.
         * @apiParam {String} level Security level in 'disarmed' | 'armed' | 'partial'.
         *
         * @apiSuccess {Object} status A Status object
         */
        router.get('/site/:siteId/security/:level', async (req, res) => {
            const devices = await this.somfy.setSecurityLevel(req.params.siteId, req.params.level as 'disarmed' | 'armed' | 'partial');
            if (typeof devices !== 'undefined' && 'data' in devices) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(devices.data));
            } else {
                res.status(504);
                res.send('Error');
            }
        });
        return router;
    }
}
