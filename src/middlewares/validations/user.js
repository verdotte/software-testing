import Joi from 'joi';
import errors from '../../helpers/errors';

class User {
  static signup(req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      return next();
    }
    return errors.errorResponse(res, result.error);
  }

  static login(req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().min(6).max(100).required(),
    });

    const { error } = Joi.validate(req.body, schema);
    if (!error) {
      return next();
    }
    return errors.errorResponse(res, error);
  }
}

export default User;
