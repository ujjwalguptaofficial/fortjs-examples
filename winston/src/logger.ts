import { Logger } from 'fortjs'
import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

const winstonLogger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new transports.DailyRotateFile({
            datePattern: 'DD-MM-YYYY',
            filename: 'logs/error.log',
            level: 'error',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss a',
                }),
                format.json()
            ),
        }),
        new transports.DailyRotateFile({
            datePattern: 'DD-MM-YYYY',
            filename: 'logs/all.log',
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss a',
                }),
                format.json()
            ),
        }),
    ],
})

if (process.env.NODE_ENV !== 'production') {
    winstonLogger.add(
        new transports.Console({
            format: format.simple(),
            level: 'debug',
        }),
    )
}

class MyLogger extends Logger {
    error(...message) {
        message = message.map((msg) => {
            if (typeof msg === 'object') {
                if (msg instanceof Error) {
                    const err = msg as Error
                    msg = `error- 
                    mesage: ${err.message}
                    name:${err.name},
                    stack:${err.stack}
                    `
                } else {
                    msg = JSON.stringify(msg)
                }
            }
            return msg
        })
        winstonLogger.error(message.join(' '))
    }

    info(...message) {
        message = message.map((msg) => {
            if (typeof msg === 'object') {
                msg = JSON.stringify(msg)
            }
            return msg
        })
        winstonLogger.info(message.join(' '))
    }

    debug(...message) {
        winstonLogger.debug(message.join(' '));
    }

    log(level, msg) {
        winstonLogger.log(level, msg)
    }
}

export const logger = new MyLogger()
