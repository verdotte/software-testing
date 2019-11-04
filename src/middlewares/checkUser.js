import { User } from '../models';

const checkUser = async (req, res, next) => {
  const { username, email } = req.body;

  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    return res
      .status(401)
      .json({ status: 401, message: 'Username already used' });
  }

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res
      .status(401)
      .json({ status: 401, message: 'Email already used' });
  }

  next();
};

export default checkUser;
