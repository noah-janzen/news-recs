import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from 'src/users/user.model';

type JwtPayload = {
  sub: string;
  email: string;
  roles: Role[];
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at-secret', //TODO: Use asynchronous security method or use secure key from environment variables
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
