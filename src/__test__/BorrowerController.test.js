import request from 'supertest';
import app from '../../server';
import { User, Token } from '../models';

let token;
let user1;
let tokenData;
let borrowerslug;
const username1 = 'youni';
const url = '/api/v1/borrower';

const borrowerData = {
  borrowerInfo: {
    firstname: 'Levi',
    lastname: 'Amani',
    idNumber: '129G235',
    phone: '0786666321',
    address: 'Mango'
  },
  loanInfo: {
    security: 'DVD',
    amountBorrowed: 125000,
    amountReturn: 16500000,
    interestRate: '1.2%',
    returnDate: '2019-11-21'
  }
};

describe('Borrower', () => {
  beforeAll(async () => {
    user1 = await User.findOne({ username: username1 });
    tokenData = await Token.findOne({ user: user1._id });
    token = `Bearer ${tokenData.token}`;
  });

  describe('Create Borrower', () => {
    test('Should return `a new borrower`', async () => {
      const res = await request(app)
        .post(`${url}`)
        .set('Authorization', token)
        .send(borrowerData);
      expect(res.status).toBe(201);
      expect(res.body.borrower).toHaveProperty('borrowerInfo');
      expect(res.body.borrower).toHaveProperty('loanInfo');
    });

    test('Should return `Unauthorized access`', async () => {
      const res = await request(app)
        .post(`${url}`)
        .send(borrowerData);
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Unauthorized access');
    });
  });

  describe('Update Borrower', () => {
    beforeAll(async () => {
      const res = await request(app)
        .post(`${url}`)
        .set('Authorization', token)
        .send(borrowerData);
      borrowerslug = res.body.borrower.slug;
    });

    test('should return a `updated borrower`', (done) => {
      request(app)
        .put(`${url}/${borrowerslug}`)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(200);
          expect(res.body.borrower).toHaveProperty('borrowerInfo');
          expect(res.body.borrower).toHaveProperty('loanInfo');
          done();
        });
    });

    test('Should return `Unauthorized access`', (done) => {
      request(app)
        .put(`${url}/${borrowerslug}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body.message).toBe('Unauthorized access');
          done();
        });
    });
  });

  describe('Retrieve Borrower', () => {
    beforeAll(async () => {
      const res = await request(app)
        .post(`${url}`)
        .set('Authorization', token)
        .send(borrowerData);
      borrowerslug = res.body.borrower.slug;
    });

    test('should return `a borrower`', (done) => {
      request(app)
        .get(`${url}/${borrowerslug}`)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(200);
          expect(res.body.borrower).toHaveProperty('borrowerInfo');
          expect(res.body.borrower).toHaveProperty('loanInfo');
          done();
        });
    });

    test('Should return `list of borrower`', (done) => {
      request(app)
        .get(`${url}`)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(200);
          expect(res.body.borrower).toBeDefined();
          done();
        });
    });
  });

  describe('Delete Borrower', () => {
    test('Should return `deleted borrower`', (done) => {
      request(app)
        .delete(`${url}/${borrowerslug}`)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(200);
          expect(res.body.borrower).toHaveProperty('borrowerInfo');
          expect(res.body.borrower).toHaveProperty('loanInfo');
          done();
        });
    });

    test('Should return `Unauthorized access`', (done) => {
      request(app)
        .delete(`${url}/${borrowerslug}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body.message).toBe('Unauthorized access');
          done();
        });
    });
  });
});

afterAll(async () => {
  await User.remove({});
});
