import * as jwt from 'jsonwebtoken';
import { DecodedPayload } from '../types';

export function createToken(
  payload: object,
  secret: jwt.Secret,
  expiresIn?: string | number
) {
  return new Promise<string>((resolve): void => {
    const token = jwt.sign(payload, secret, {
      expiresIn
    });
    resolve(token);
  });
}

export function verifyToken(token: string, secret: jwt.Secret) {
  return new Promise<DecodedPayload>((resolve): void => {
    const result = jwt.verify(token, secret) as DecodedPayload;
    resolve(result);
  });
}
