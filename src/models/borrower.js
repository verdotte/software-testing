import { Schema, model } from 'mongoose';

const borrowerSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  idNumber: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
  }
});

export default model('Borrower', borrowerSchema);
