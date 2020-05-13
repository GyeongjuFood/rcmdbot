import express from 'express';
import mongoose from 'mongoose';

function formatter(header: string, message: string, context: string, debugInfo?: any) {
  let msg = `${new Date().toISOString()} ${header}[${context}] ${message}`;
  if (debugInfo !== undefined) {
    msg += `\n${debugInfo}`;
  }
  return msg;
}

function error(message: string, context: string, debugInfo?: any) {
  // tslint:disable-next-line: no-console
  console.error(formatter('\x1b[31m[E]\x1b[0m', message, context, debugInfo));
}
function warning(message: string, context: string, debugInfo?: any) {
  // tslint:disable-next-line: no-console
  console.warn(formatter('\x1b[33m[W]\x1b[0m', message, context, debugInfo));
}
function info(message: string, context: string, debugInfo?: any) {
  // tslint:disable-next-line: no-console
  console.info(formatter('\x1b[34m[I]\x1b[0m', message, context, debugInfo));
}
function verbose(message: string, context: string, debugInfo?: any) {
  // tslint:disable-next-line: no-console
  console.info(formatter('[V]', message, context, debugInfo));
}
function debug(message: string, context: string, debugInfo?: any) {
  // tslint:disable-next-line: no-console
  console.info(formatter('[D]', message, context, debugInfo));
}

const logger = {
  debug,
  error,
  info,
  verbose,
  warning
};

export const wrapper = (location: string, asyncFn: express.RequestHandler) => {
  return (async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      logger.error(String(error), location);
    }
  });
};

export async function mongoinit() {
  return await mongoose.connect('mongodb://3.34.67.92:27017', {
    user: 'foodrcmd',
    pass: 'gyeongju',
    dbName: 'foodChatbot',
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => {
    console.log(`connected to mongodb`);
    return true;
  }).catch(async (err) => {
    console.log(`error occured on DB connection: ${err}\n`);
    return await setTimeout(mongoinit, 3000);
  });
}
