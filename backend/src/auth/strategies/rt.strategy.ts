import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-secret', //TODO: Use asynchronous security method or use secure key from environment variables
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    // TODO: use type for parameter

    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      ?.trim();

    if (!refreshToken) throw new BadRequestException('refresh_token malformed');

    return {
      ...payload,
      refreshToken,
    };
  }
}
