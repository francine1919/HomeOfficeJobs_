import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import * as jwt from 'jsonwebtoken';

export interface AuthenticationData {
  id: UUID;
}
@Injectable()
export class Authenticator {
  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(input, process.env.JWT_KEY as string, {
      expiresIn: process.env.EXP_IN,
    });
    return token;
  }
  public verifyTokenData(token: string): AuthenticationData {
    const data = jwt.verify(token, process.env.JWT_KEY as string);
    return data as AuthenticationData;
  }
}
