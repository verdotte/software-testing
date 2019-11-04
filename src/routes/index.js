import express from 'express';
import Auth from './Auth';
import Borrower from './Borrower';

const router = express.Router();

router.use('/auth', Auth);
router.use('/borrower', Borrower);


export default router;
