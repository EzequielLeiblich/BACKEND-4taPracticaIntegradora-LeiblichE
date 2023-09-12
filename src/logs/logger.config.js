import winston from "winston";
import config from "../config.js"
import customLevels from './custom.logger.js';


const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
          winston.format.colorize({colors: customLevels.colors}), 
          winston.format.simple()
        )
    }),
    new winston.transports.File({
      level: "error", 
      filename: "./errors.log",
      format: winston.format.simple()
    })
  ]
})

const devLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
  new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({colors: customLevels.colors}), 
        winston.format.simple()
      )
    })
  ]
})

export const addLogger = (req, res, next) => {
  req.logger = config.ENVIRONMENT === "PRODUCTION" ? prodLogger : devLogger;
  req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
  next()
}