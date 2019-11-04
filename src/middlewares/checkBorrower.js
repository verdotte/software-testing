import { Borrower } from '../models';
import {
  NOT_FOUND
} from '../constants/statusCodes';

const checkBorrower = async (req, res, next) => {
  const { slug } = req.params;

  const borrowerFound = await Borrower.findOne({
    slug
  });

  if (!borrowerFound) {
    return res.status(NOT_FOUND).json({
      status: NOT_FOUND,
      message: 'borrower does not exist',
    });
  }

  req.borrower = borrowerFound;
  next();
};

export default checkBorrower;
