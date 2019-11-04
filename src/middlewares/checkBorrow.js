import { Borrow } from '../models';
import {
  NOT_FOUND
} from '../constants/statusCodes';

const checkBorrow = async (req, res, next) => {
  const { borrowid } = req.params;

  const borrowrFound = await Borrow.findOne({
    _id: borrowid,
  });

  if (borrowrFound) {
    return res.status(NOT_FOUND).json({
      status: NOT_FOUND,
      message: 'borrow does not exist',
    });
  }

  req.borrow = borrowrFound;
  next();
};

export default checkBorrow;
