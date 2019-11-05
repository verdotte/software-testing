import { User, Token } from '../models';
import encrypt from '../helpers/encrypt';
import {
  CREATED,
  OK,
  UNAUTHORIZED,
} from '../constants/statusCodes';

class AuthController {
  static async signUp(req, res) {
    const hashPassword = encrypt.hashPassword(req.body.password);
    const { username, email } = req.body;

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const token = encrypt.generateToken(user._id);

    await Token.create({ user: user._id, token });

    return res.status(CREATED).json({
      status: CREATED,
      user,
      token,
    });
  }

  static async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !encrypt.comparePassword(user.password, password)) {
      return res.status(UNAUTHORIZED).json({
        status: UNAUTHORIZED,
        message: 'The credentials you provided are incorrect',
      });
    }

    const token = encrypt.generateToken(user._id);

    await Token.create({ user: user._id, token });

    return res.status(OK).json({
      status: OK,
      user,
      token,
    });
  }

  static async profile(req, res) {
    const { username, capital } = req.currentUser;

    return res.status(OK).json({
      status: OK,
      profile: {
        username,
        capital
      }
    });
  }

  static async updateProfile(req, res) {
    const { currentUser } = req;
    const { body } = req;

    await User.updateOne(
      { capital: currentUser.capital },
      { capital: currentUser.capital + body.capital }
    );

    return res.status(OK).json({
      status: OK,
      profile: { capital: body.capital },
      message: 'updated',
    });
  }
}

export default AuthController;
