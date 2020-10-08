#!/usr/bin/env node
import {App} from './app';
import conf from '../conf.json';
import util from 'util';
import {createLogger, format, transports} from 'winston';
import path from "path";

const PORT = process.env.PORT || conf.port;
const logFormat = format.printf(info => {
    if (info.message.constructor === Object) {
        info.message = util.format(info.message, null, 4)
    }
    return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`;
});

const logger = createLogger({
    level: 'info',
    transports: [new transports.Console({
        handleExceptions: true,
        format: format.combine(
            format.prettyPrint(),
            format.colorize(),
            format.label({label: path.basename(__filename)}),
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            format.metadata({fillExcept: ['message', 'level', 'timestamp', 'label']}),
            logFormat
        )
    })],
});

new App(conf, logger).app.listen(PORT, () => logger.info(`SomfyAPI listening on ${conf.server}:${PORT}`));
