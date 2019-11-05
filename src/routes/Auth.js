import express from 'express';
import AuthController from '../controllers/AuthController';
import { userValidation } from '../middlewares/validations';
import { asyncHandler, checkUser, checkAuth } from '../middlewares';


const router = express.Router();

router
  .route('/signup')
  .post(userValidation.signup, asyncHandler(checkUser), asyncHandler(AuthController.signUp));

router
  .route('/login')
  .post(userValidation.login, asyncHandler(AuthController.login));

router
  .route('/profile')
  .put(
    asyncHandler(checkAuth),
    userValidation.updateCapital,
    asyncHandler(AuthController.updateProfile)
  )
  .get(asyncHandler(checkAuth), asyncHandler(AuthController.profile));


export default router;
