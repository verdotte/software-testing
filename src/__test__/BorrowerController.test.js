import request from 'supertest';
import app from '../../server';
import { User, Token } from '../models';

let token;
let user1;
let tokenData;
let borrowerid;
const username1 = 'xouni';
const url = '/api/v1/borrower';

const borrowerData = {
  firstname: 'Alex',
  idNumber: 22221234,
  phone: '+256782222238',
  address: 'Kansanga'
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
      expect(res.body.borrower).toHaveProperty('firstname');
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
      borrowerid = res.body.borrower._id;
    });

    test('should return a `updated borrower`', (done) => {
      request(app)
        .put(`${url}/${borrowerid}`)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(200);
          expect(res.body.borrower).toHaveProperty('firstname');
          done();
        });
    });

    test('Should return `Unauthorized access`', (done) => {
      request(app)
        .put(`${url}/${borrowerid}`)
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
      borrowerid = res.body.borrower._id;
    });

    test('should return `a borrower`', (done) => {
      request(app)
        .get(`${url}/${borrowerid}`)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(200);
          expect(res.body.borrower).toHaveProperty('firstname');
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
        .delete(`${url}/${borrowerid}`)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(200);
          expect(res.body.borrower).toHaveProperty('firstname');
          done();
        });
    });

    test('Should return `Unauthorized access`', (done) => {
      request(app)
        .delete(`${url}/${borrowerid}`)
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
