var mongoose = require('mongoose');
var expect = require('chai').expect;

const models = require('./models.js');
var Choice = models.Choice;
var Question = models.Question;


/**************************/
/* Question Schema Tests  */
/**************************/
// *** Basic Validation Tests *** //
// Checks that a valid Question object has no errors
describe('question', function() {
  it('should be valid if no required fields are left empty', function(done) {
    // several valid choice objects to be used for creating a question
    var c1 = new Choice({body: "Choice 1", responses: [{gender: "Male", age: 24, race: "White"}, {gender: "Female", age: 36, race: "Black/African American"}, {gender: "Other", age: 32, race: "Asian"}]});
    var c2 = new Choice({body: "Choice 2", responses: [{gender: "Female", age: 21, race: "Hispanic/Latino"}, {gender: "Other", age: 22, race: "Native Hawaiian/Other Pacific Islander"}, {gender: "Other", age: 14, race: "White"}]});
    var c3 = new Choice({body: "Choice 3", responses: [{gender: "Other", age: 17, race: "American Indian/Alaska Native"}, {gender: "Male", age: 84, race: "Asian"}, {gender: "Other", age: 28, race: "Black/African American"}]});

  	var q = new Question({body: "Select one of the choices below", date_asked: Date(), choices: [{choice: c1.id}, {choice: c2.id}, {choice: c3.id}]});
  	q.validate(function(err) {
  		expect(err).to.not.exist;
  		done();
  	});
  });
});

// Checks that empty required fields create an error
describe('question', function() {
  it('should be invalid if a required field is left empty', function(done) {
    // several valid choice objects to be used for creating a question
    var c1 = new Choice({body: "Choice 1", responses: [{gender: "Male", age: 24, race: "White"}, {gender: "Female", age: 36, race: "Black/African American"}, {gender: "Other", age: 32, race: "Asian"}]});
    var c2 = new Choice({body: "Choice 2", responses: [{gender: "Female", age: 21, race: "Hispanic/Latino"}, {gender: "Other", age: 22, race: "Native Hawaiian/Other Pacific Islander"}, {gender: "Other", age: 14, race: "White"}]});
    var c3 = new Choice({body: "Choice 3", responses: [{gender: "Other", age: 17, race: "American Indian/Alaska Native"}, {gender: "Male", age: 84, race: "Asian"}, {gender: "Other", age: 28, race: "Black/African American"}]});

    // Checks that an empty body field creates an error
    var q = new Question({date_asked: Date(), choices: [{choice: c1.id}, {choice: c2.id}, {choice: c3.id}]});
  	q.validate(function(err) {
      expect(err.errors.body).to.exist;
      done();
    });

    // Checks that an empty date_asked field creates an error
    q = new Question({body: "Select one of the choices below", choices: [{choice: c1.id}, {choice: c2.id}, {choice: c3.id}]});
  	q.validate(function(err) {
      expect(err.errors.date_asked).to.exist;
      done();
    });

    // // Checks that an empty choices field creates an error
    // q = new Question({body: "Select one of the choices below", date_asked: Date()});
  	// q.validate(function(err) {
    //   expect(err.errors.choices).to.exist;
    //   done();
    // });

    // Checks that all empty required fields create an error
    q = new Question({});
    q.validate(function(err) {
    	expect(err.errors.body).to.exist;
      expect(err.errors.date_asked).to.exist;
      // expect(err.errors.choices).to.exist;
      done();
    });
  });
});
