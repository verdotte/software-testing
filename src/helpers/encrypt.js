import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

class Authentication {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(_id) {
    const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: '2d' });
    return token;
  }

  static slugGenerator(name) {
    return name + Math.random().toString(36).substring(2, 15);
  }
}

export default Authentication;
