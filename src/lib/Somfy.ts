import {AuthorizationCode, ModuleOptions} from 'simple-oauth2';
import {readFileSync, writeFileSync} from 'fs';
import axios from 'axios';
import {Logger} from 'winston';

export class Somfy {
    private conf: any;
    private token: any;
    private oauth2: AuthorizationCode;
    private readonly authorizationUri: string;
    private readonly redirectUrl: string;
    private baseUrl = 'https://api.myfox.io/v3';
    private logger: Logger;

    constructor(conf: any, logger: Logger) {
        this.logger = logger;
        this.conf = conf;
        const oauthConfig: ModuleOptions = {
            client: {
                id: this.conf.consumerKey,
                secret: this.conf.consumerSecret
            },
            auth: {
                tokenHost: 'https://sso.myfox.io',
                tokenPath: '/oauth/oauth/v2/token',
                authorizePath: '/oauth/oauth/v2/auth'
            },
            options: {
                authorizationMethod: 'body',
                bodyFormat: 'json'
            }
        };

        this.oauth2 = new AuthorizationCode(oauthConfig);
        this.redirectUrl = `${this.conf.server}:${this.conf.port}/redirect`;
        this.authorizationUri = this.oauth2.authorizeURL({redirect_uri: this.redirectUrl});
    }

    getAuthorizationUri() {
        return this.authorizationUri;
    }

    async createToken(code: string) {
        if (code !== null) {
            const options = {code, redirect_uri: this.redirectUrl};
            try {
                const result = await this.oauth2.getToken(options);
                this.token = this.oauth2.createToken(result);
                writeFileSync('token.json', JSON.stringify(this.token.token));
                return this.token.token;
            } catch (error) {
                this.logger.error('Access Token Error', error.message);
                return error.message;
            }
        } else {
            this.logger.error('No code authorization!');
            return 'No code authorization!';
        }
    }

    async updateToken() {
        if (!!this.token && !this.token.expired()) {
            return this.token.token;
        } else if (!!this.token) {
            try {
                this.token = await this.token.refresh();
                writeFileSync('token.json', JSON.stringify(this.token.token));
                return this.token.token;
            } catch (error) {
                this.logger.error(error.message);
                this.logger.error('Need authorization request!');
                return error.message;
            }
        } else {
            try {
                const data = readFileSync('token.json');
                this.logger.warn('File token exist');
                this.token = this.oauth2.createToken(JSON.parse(data.toString()));
                if (this.token.expired()) {
                    try {
                        this.token = await this.token.refresh();
                        writeFileSync('token.json', JSON.stringify(this.token.token));
                    } catch (error) {
                        this.logger.error(error.message);
                        this.logger.error('Need authorization request!');
                        return error.message;
                    }
                }
                this.logger.info('Return token');
                return this.token.token;
            } catch (error) {
                this.logger.error(error.message);
                this.logger.error('Need authorization request!');
                return error.message;
            }
        }
    }

    async getALLSites() {
        const token = await this.updateToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token.access_token}`,
            }
        };
        try {
            let data = await axios.get(`${this.baseUrl}/site`, options);
            this.logger.info(data)
            return data
        } catch (error) {
            this.logger.error(error.message);
        }
    }

    async getSite(siteId: string) {
        const token = await this.updateToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token.access_token}`,
            }
        };
        try {
            return await axios.get(`${this.baseUrl}/site/${siteId}`, options);
        } catch (error) {
            this.logger.error(error.message);
        }
    }

    async getDevicesFromSiteId(siteId: string) {
        const token = await this.updateToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token.access_token}`,
            }
        };
        try {
            return await axios.get(`${this.baseUrl}/site/${siteId}/device`, options);
        } catch (error) {
            this.logger.error(error.message);
        }
    }

    async getDevice(deviceId: string) {
        let token = await this.updateToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token.access_token}`,
            }
        };
        try {
            return await axios.get(`${this.baseUrl}/device/${deviceId}`, options);
        } catch (error) {
            this.logger.error(error.message);
        }
    }

    async setSecurityLevel(siteId: string, status: 'disarmed' | 'armed' | 'partial') {
        const token = await this.updateToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token.access_token}`,
            }
        };
        try {
            return await axios.put(`${this.baseUrl}/site/${siteId}/security`, {status}, options);
        } catch (error) {
            this.logger.error(error.message, error);
        }
    }
}
