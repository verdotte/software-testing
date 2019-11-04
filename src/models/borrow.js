import { Schema, model } from 'mongoose';

const borrowSchema = new Schema({
  assurance: {
    type: String,
    required: true,
  },
  amountBorrowed: {
    type: Number,
    required: true,
  },
  borrowerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Borrower',
  },
  interestRate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  installment: {
    type: Number,
    default: 0,
  }
});

export default model('Borrow', borrowSchema);
