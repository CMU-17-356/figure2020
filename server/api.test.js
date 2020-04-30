const supertest = require('supertest');
const app = require('../server');

/************************/
/*  Question API Tests  */
/************************/

describe("Testing Question API ends", function () {
	/*
	 * Getting all questions should returns a proper response
	 */
	it('get /questions', function (done) {
      supertest(app)
          .get('/questions')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

	/*
	 * Getting a question with a valid id should return a proper response
	 */
  it('get /question/:id (valid id)', function (done) {
      supertest(app)
          .get('/question/5ea90b97c75a4e001103ac56')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });

	/*
	 * Getting a question with an invalid id should return an error
	 */
	it('get /question/:id (invalid id)', function (done) {
      supertest(app)
          .get('/question/NotAnId')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500, done);
  });

	/*
	 * Getting the most recent question should return a proper response
	 */
  it('get /mostRecentQuestion', function (done) {
      supertest(app)
          .get('/mostRecentQuestion')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });

	// /*
	//  * Posting a question should return a proper response
	//  */
	// let data = {
  //   "choices": [{body: "Apple"}, {body: "Banana"}, {body: "Tomato"}, {body: "Other"}],
  //   "body": "What is your favorite fruit?",
	// 	"date_asked": '2020-04-29T05:07:34.911Z'
  // }
	//
  // it('post /question', function (done) {
  //   supertest(app)
  //     .post('/question')
  //     .send(data)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(201);
  // });
});


/************************/
/*  Response API Tests  */
/************************/

describe("Testing Response API ends", function () {
	/*
	 *
	 */
	it('\'get /responses\' should send a proper response', function (done) {
      supertest(app)
          .get('/responses')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

	/*
	 *
	 */
	it('get /mostRecentQuestionAnswers', function (done) {
      supertest(app)
          .get('/mostRecentQuestionAnswers')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

	/*
	 * Getting a question's data with a valid id should return a proper response
	 */
  it('get /questionData/:id (valid id)', function (done) {
      supertest(app)
          .get('/question/5ea90b97c75a4e001103ac56')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });

	/*
	 * Getting a question's data with an invalid id should return an error
	 */
	it('get /questionData/:id (invalid id)', function (done) {
      supertest(app)
          .get('/question/NotAnId')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500, done);
  });
});
