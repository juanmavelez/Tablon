import * as boom from '@hapi/boom';
import { environment } from '@environments/environment';
import * as express from 'express';
import { ErrorStack } from '../../models/ErrorStack';

function withErrorStack(error: boom.Payload, stack: string): ErrorStack {
  if (environment.production) {
    return { ...error, stack };
  }
  return error;
}
export function logErrors(
  err: boom.Boom,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  next(err);
}
export function wrapError(
  err: boom.Boom,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  if (!err.isBoom) {
    next(boom.badImplementation(err.data));
  }
  next(err);
}
export function errorHandler(
  err: boom.Boom,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}
