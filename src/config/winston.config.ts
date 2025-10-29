import { ENodeEnvironment } from "../enum";
import { Env } from "../services";
import { createLogger, format, Logger, transports } from "winston";
// import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf } = format;

const levels: string[] = ["info", "error", "combined"];

// const fileRotateTransport: DailyRotateFile[] = levels?.map(
//   (level: string): DailyRotateFile =>
//     new transports.DailyRotateFile({
//       filename: `logs/${level}/%DATE%.log`,
//       datePattern: "YYYY-MM-DD",
//       maxFiles: "14d",
//     })
// );

const myFormat = printf(({ level, message, timestamps }): string =>
  JSON.stringify({
    level: level,
    timestamp: timestamp,
    hostname: message?.hostname,
    method: message?.method,
    url: message?.url,
  })
);

const winston: Logger = createLogger({
  silent: false,
  format: combine(timestamp(), myFormat),
  // transports: fileRotateTransport,
});

if (Env.get("NODE_ENVIRONMENT") === ENodeEnvironment.PRODUCTION) {
  winston.add(new transports.Console());
}

export default winston;
