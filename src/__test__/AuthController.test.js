import request from 'supertest';
import app from '../../server';
// import { User, Borrower } from '../models';

const url = '/api/v1/auth';
const user = {
  username: 'youni',
  email: 'youni@gmail.com',
  password: 'les876uivxte',
};

// afterAll(async () => {
//   await User.remove({});
//   await Borrower.remove({});
// });

describe('Account creation', () => {
  test('Should create a user', (done) => {
    request(app)
      .post(`${url}/signup`)
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(201);
        expect(res.body.user.capital).toBe(1000000);
        done();
      });
  });

  test('Should fail when the wrong body is sent', (done) => {
    request(app)
      .post(`${url}/signup`)
      .send({ body: 'wrong' })
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(401);
        expect(res.body.message).toBe('username is required');
        done();
      });
  });

  test('Should fail to create the same user twice', (done) => {
    request(app)
      .post(`${url}/signup`)
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(401);
        expect(res.body.message).toBe('Username already used');
        done();
      });
  });
});

describe('User Login', () => {
  test('Should login the user', (done) => {
    delete user.email;
    request(app)
      .post(`${url}/login`)
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(200);
        expect(res.body.user.capital).toBe(1000000);
        done();
      });
  });

  test('Should fail to login wrong password', (done) => {
    user.password = 'wrong@password';
    request(app)
      .post(`${url}/login`)
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(401);
        expect(res.body.message).toBe('The credentials you provided are incorrect');
        done();
      });
  });

  test('Should fail to login wrong username', (done) => {
    user.username = 'wrong@password';
    request(app)
      .post(`${url}/login`)
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(401);
        expect(res.body.message).toBe('The credentials you provided are incorrect');
        done();
      });
  });
});
