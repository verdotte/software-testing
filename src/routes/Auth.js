import express from 'express';
import AuthController from '../controllers/AuthController';
import { userValidation } from '../middlewares/validations';
import { asyncHandler, checkUser } from '../middlewares';


const router = express.Router();

router
  .route('/signup')
  .post(userValidation.signup, asyncHandler(checkUser), asyncHandler(AuthController.signUp));

router
  .route('/login')
  .post(userValidation.login, asyncHandler(AuthController.login));


export default router;
