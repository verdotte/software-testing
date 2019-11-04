import express from 'express';
import BorrowController from '../controllers/BorrowController';
import {
  asyncHandler, checkBorrower, checkBorrow, checkAuth
} from '../middlewares';

const router = express.Router();

router
  .route('/:id/borrow')
  .all(asyncHandler(checkAuth))
  .all(asyncHandler(checkBorrower))
  .post(asyncHandler(BorrowController.createBorrow));

router
  .route('/borrow')
  .all(asyncHandler(checkAuth))
  .get(asyncHandler(BorrowController.getBorrows));

router
  .route('/paid')
  .all(asyncHandler(checkAuth))
  .get(asyncHandler(BorrowController.getBorrowPaids));

router
  .route('/:id/borrow/:borrowid')
  .all(asyncHandler(checkAuth))
  .all(asyncHandler(checkBorrower))
  .put(asyncHandler(checkBorrow), asyncHandler(BorrowController.updateBorrow))
  .delete(asyncHandler(checkBorrow), asyncHandler(BorrowController.deleteBorrow));

export default router;
