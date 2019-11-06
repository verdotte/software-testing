import Joi from 'joi';
import errors from '../../helpers/errors';

class Borrower {
  static validateBorrower(req, res, next) {
    const schema = Joi.object().keys({
      borrowerInfo: {
        firstname: Joi.string().required(),
        lastname: Joi.string(),
        idNumber: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
      },
      loanInfo: {
        security: Joi.string().required(),
        amountBorrowed: Joi.number().required(),
        amountReturn: Joi.number().required(),
        interestRate: Joi.string().required(),
        returnDate: Joi.date().required(),
      },
      paid: Joi.bool(),
    });

    const { error } = Joi.validate(req.body, schema);
    if (!error) {
      return next();
    }
    return errors.errorResponse(res, error);
  }
}

export default Borrower;
