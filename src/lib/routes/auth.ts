import {Somfy} from '../Somfy';
import {Router} from 'express';
import {Logger} from 'winston';

export class Auth {
    somfy: Somfy;
    logger: Logger

    constructor(somfy: Somfy, logger: Logger) {
        this.somfy = somfy;
        this.logger = logger;
    }

    routes(): Router {
        const router = Router();
        /**
         * @api {get} /auth
         * @apiName Auth
         * @apiGroup SomfyAPI
         *
         * @apiSuccess {object} WebPage used to authorize your app
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "token": {
         *         "access_token": "xxxxxxxxxxxxxxxxxxxxxxxxx",
         *         "expires_in": 3600,
         *         "token_type": "bearer",
         *         "scope": "user.basic api.full oa.site oa.user oa.device oa.devicedefinition level.0",
         *         "refresh_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         *         "expires_at": "2020-10-06T21:22:17.708Z"
         *         }
         *     }
         */
        router.get('/auth', (req, res) => {
            this.logger.info(this.somfy.getAuthorizationUri());
            res.redirect(this.somfy.getAuthorizationUri());
        });
        router.get('/redirect', async (req, res) => {
            const {code} = req.query;
            const response = await this.somfy.createToken(code as string);
            if ('access_token' in response) {
                res.status(200);
                res.send(response);
            } else {
                res.status(500);
                res.send(response);
            }
        });
        return router;
    }
}
