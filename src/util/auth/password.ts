import bcrypt from 'bcryptjs';
import config from '../../config/config';

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(config.accessTokenSecret, salt);
};
