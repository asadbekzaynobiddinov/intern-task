import { Request } from 'express';
import { UserRoles } from '../enum';

export interface IPayload {
  sub: string;
  role: UserRoles;
  iat?: number;
  exp?: number;
}

export interface CustomRequest extends Request {
  user?: IPayload;
}
