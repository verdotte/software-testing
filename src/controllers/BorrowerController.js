import { Borrower } from '../models';
import {
  CREATED,
  OK
} from '../constants/statusCodes';

class BorrowerController {
  static async createBorrower(req, res) {
    const { body } = req;
    const borrower = await Borrower.create({
      ...body
    });

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
    const { borrower, body } = req;

    await borrower.updateOne({
      ...body
    });

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
