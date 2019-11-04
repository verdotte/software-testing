import { Borrow } from '../models';
import {
  CREATED,
  OK
} from '../constants/statusCodes';

class BorrowController {
  static async createBorrow(req, res) {
    const { borrower, body } = req;
    body.borrowerId = borrower._id;

    const borrow = await Borrow.create(body);

    return res.status(CREATED).json({
      status: CREATED,
      borrow,
    });
  }

  static async getBorrows(req, res) {
    let borrow = await Borrow.find({ paid: false })
      .select('borrowerId _id assurance amountBorrowed interestRate installment paid')
      .populate('borrowerId', 'firstname');

    borrow = borrow.map(({
      amountBorrowed, interestRate, _id, installment, assurance, paid,
      borrowerId: { firstname }
    }) => ({
      firstname,
      amountBorrowed,
      installment,
      interestRate,
      assurance,
      _id,
      paid,
    }));

    return res.status(OK).json({
      status: OK,
      borrow,
    });
  }

  static async getBorrowPaids(req, res) {
    let borrowPaid = await Borrow.find({ paid: true })
      .select('borrowerId _id assurance amountBorrowed interestRate installment paid')
      .populate('borrowerId', 'firstname');

    borrowPaid = borrowPaid.map(({
      amountBorrowed, interestRate, installment, assurance,
      borrowerId: { firstname }
    }) => ({
      firstname,
      amountBorrowed,
      installment,
      interestRate,
      assurance,
    }));

    return res.status(OK).json({
      status: OK,
      borrowPaid,
    });
  }

  static async updateBorrow(req, res) {
    const {
      borrower, borrow, body, currentUser
    } = req;
    const { firstname } = borrower;
    const { amountBorrowed } = borrow;
    const { installment } = body;

    await borrow.updateOne(body);
    if (amountBorrowed === installment) {
      await borrow.updateOne({ paid: true });
      await currentUser.updateOne({ capital: currentUser.capital + installment });
    }

    return res.status(OK).json({
      status: OK,
      borrow: { ...borrow.toObject(), ...body, firstname }
    });
  }

  static async deleteBorrow(req, res) {
    const { borrower, borrow } = req;
    const { firstname } = borrower;

    await borrow.deleteOne();
    return res.status(OK).json({
      status: OK,
      borrow: { ...borrow.toObject(), firstname }
    });
  }
}

export default BorrowController;
