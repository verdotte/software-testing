import { Borrower, User } from '../models';
import {
  CREATED,
  OK,
  FORBIDDEN
} from '../constants/statusCodes';

class BorrowerController {
  static async createBorrower(req, res) {
    const { body, currentUser } = req;
    const { amountBorrowed } = body.loanInfo;

    if (amountBorrowed > currentUser.capital) {
      return res.status(FORBIDDEN).json({
        status: FORBIDDEN,
        message: 'cannot borrow more than capital',
      });
    }

    const borrower = await Borrower.create({
      ...body
    });

    await User.updateOne(
      { capital: currentUser.capital },
      { capital: currentUser.capital - amountBorrowed }
    );

    return res.status(CREATED).json({
      status: CREATED,
      borrower,
    });
  }

  static async getBorrowers(req, res) {
    const borrower = await Borrower.find();
    return res.status(OK).json({
      status: OK,
      borrower,
    });
  }

  static async getBorrower(req, res) {
    const { borrower } = req;
    return res.status(OK).json({
      status: OK,
      borrower,
    });
  }

  static async updateBorrower(req, res) {
    const { borrower, body, currentUser } = req;
    const { paid } = body;
    const { amountBorrowed } = borrower.loanInfo;

    await borrower.updateOne({
      ...body
    });

    if (paid) {
      await User.updateOne(
        { capital: currentUser.capital },
        { capital: currentUser.capital + amountBorrowed }
      );
    }

    return res.status(OK).json({
      status: OK,
      borrower: { ...borrower.toObject(), ...body },
      message: 'updated',
    });
  }

  static async deleteBorrower(req, res) {
    const { borrower } = req;

    await borrower.deleteOne();

    return res.status(OK).json({
      status: OK,
      borrower,
      message: 'deleted',
    });
  }
}

export default BorrowerController;
