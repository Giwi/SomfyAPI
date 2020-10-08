import {Somfy} from '../Somfy';
import {Logger} from 'winston';
import {Router} from 'express';

export class Device {
    somfy: Somfy;
    logger: Logger;

    constructor(somfy: Somfy, logger: Logger) {
        this.somfy = somfy;
        this.logger = logger;
    }

    routes(): Router {
        const router = Router();

        /**
         * @api {get} /site/:siteId/device Get site devices
         * @apiName getDevicesFromSiteId
         * @apiGroup Device
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
         * @apiGroup Device
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
        return router;
    }
}
