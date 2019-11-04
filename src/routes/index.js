import express from 'express';
import Auth from './Auth';
import Borrower from './Borrower';
import Borrow from './Borrow';

const router = express.Router();

router.use('/auth', Auth);
router.use('/borrower', Borrower);
router.use('/', Borrow);

export default router;
