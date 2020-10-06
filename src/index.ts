import {App} from './app';
import conf from '../conf.json';
import {createLogger, format, transports} from 'winston';

const PORT = process.env.PORT || conf.port;


const logger = createLogger({
    level: 'info',
    transports: [new transports.Console({
        handleExceptions: true,
        format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.simple()
        )
    })],
});

new App(conf, logger).app.listen(PORT, () => logger.info(`SomfyAPI listening on ${conf.server}:${PORT}`));
