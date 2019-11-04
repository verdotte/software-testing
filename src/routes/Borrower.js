import express from 'express';
import BorrowerController from '../controllers/BorrowerController';
import { asyncHandler, checkBorrower, checkAuth } from '../middlewares';
import { borrowerValidation } from '../middlewares/validations';

const router = express.Router();

router
  .route('/')
  .post(
    asyncHandler(checkAuth),
    asyncHandler(borrowerValidation.validateBorrower),
    asyncHandler(BorrowerController.createBorrower)
  )
  .get(
    asyncHandler(checkAuth),
    asyncHandler(BorrowerController.getBorrowers)
  );

router
  .route('/:slug')
  .get(
    asyncHandler(checkAuth),
    asyncHandler(checkBorrower),
    asyncHandler(BorrowerController.getBorrower)
  )
  .put(
    asyncHandler(checkAuth),
    asyncHandler(borrowerValidation.validateBorrower),
    asyncHandler(checkBorrower),
    asyncHandler(BorrowerController.updateBorrower)
  )
  .delete(
    asyncHandler(checkAuth),
    asyncHandler(checkBorrower),
    asyncHandler(BorrowerController.deleteBorrower)
  );

export default router;
