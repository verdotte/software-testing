import mongoose from 'mongoose';
// import slug from 'mongoose-slug-generator';
import encrypt from '../helpers/encrypt';

// mongoose.plugin(slug);

const borrowerSchema = mongoose.Schema({
  borrowerInfo: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    idNumber: {
      type: String,
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
  },
  loanInfo: {
    security: {
      type: String,
      required: true,
    },
    amountBorrowed: {
      type: Number,
      required: true,
    },
    amountReturn: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    returnDate: {
      type: Date,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  slug: {
    type: String,
    unique: true
  },
});

borrowerSchema.pre('save', function cb(next) {
  if (!this.slug) {
    this.slug = encrypt.slugGenerator(this.borrowerInfo.firstname);
  }
  next();
});

export default mongoose.model('Borrower', borrowerSchema);
