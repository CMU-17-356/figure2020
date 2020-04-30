const supertest = require('supertest');
const app = require('../server');

/************************/
/*  */
/************************/

describe("Testing Question API ends", () => {
	it('\'get /questions\' should send a proper response', function (done) {
      supertest(app)
          .get('/questions')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

  it('\'get /question/:id\' should send a proper response with a correct id', function (done) {
      supertest(app)
          .get('/question/5ea90b97c75a4e001103ac56')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });

	it('\'get /question/:id\' should send an error with an incorrect id', function (done) {
      supertest(app)
          .get('/question/NotAnId')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500, done)
					.end((err) => {
            if (err) return done(err);
            done();
          });;
  });
});

describe("Testing Response API ends", () => {
	it('\'get /responses\' should send a proper response', function (done) {
      supertest(app)
          .get('/responses')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

  it('\'get /question/:id\' should send a proper response with a correct id', function (done) {
      supertest(app)
          .get('/question/5ea90b97c75a4e001103ac56')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });

	it('\'get /question/:id\' should send an error with an incorrect id', function (done) {
      supertest(app)
          .get('/question/NotAnId')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500, done)
					.end((err) => {
            if (err) return done(err);
            done();
          });;
  });
});
