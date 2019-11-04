import { Borrower } from '../models';
import {
  NOT_FOUND
} from '../constants/statusCodes';

const checkBorrower = async (req, res, next) => {
  const { borrowid } = req.params;

  const borrowerFound = await Borrower.findById({
    _id: borrowid
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
