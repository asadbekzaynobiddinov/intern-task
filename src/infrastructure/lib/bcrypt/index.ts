import * as bcrypt from 'bcryptjs';

import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptManage {
  async createBcryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
  async comparePassword(password: string, hashPassword: string) {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  }
}
