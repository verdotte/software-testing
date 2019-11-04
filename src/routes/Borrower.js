import express from 'express';
import BorrowerController from '../controllers/BorrowerController';
import { asyncHandler, checkBorrower, checkAuth } from '../middlewares';

const router = express.Router();

router
  .route('/')
  .post(asyncHandler(checkAuth), asyncHandler(BorrowerController.createBorrower))
  .get(asyncHandler(checkAuth), asyncHandler(BorrowerController.getBorrowers));

router
  .route('/:borrowid')
  .get(
    asyncHandler(checkAuth),
    asyncHandler(checkBorrower),
    asyncHandler(BorrowerController.getBorrower)
  )
  .put(
    asyncHandler(checkAuth),
    asyncHandler(checkBorrower),
    asyncHandler(BorrowerController.updateBorrower)
  )
  .delete(
    asyncHandler(checkAuth),
    asyncHandler(checkBorrower),
    asyncHandler(BorrowerController.deleteBorrower)
  );

export default router;
