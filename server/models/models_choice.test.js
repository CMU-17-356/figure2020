var mongoose = require('mongoose');
var expect = require('chai').expect;

const models = require('./models.js');
var Choice = models.Choice;


/**************************/
/*  Choice Schema Tests   */
/**************************/
// *** Basic Validation Tests *** //
// Checks that a valid Choice object has no errors
describe('choice', function() {
  it('should be valid if no required fields are left empty', function(done) {
  	var c = new Choice({body: "Choice 1", number_of_responses: 0});
  	c.validate(function(err) {
  		expect(err).to.not.exist;
  		done();
  	});
  });
});

// Checks that empty required fields create an error
describe('choice', function() {
  it('should be invalid if a required field is left empty', function(done) {
    // Checks that an empty body field creates an error
    var c = new Choice({number_of_responses: 0});
  	c.validate(function(err) {
      expect(err.errors.body).to.exist;
      done();
    });

    // Checks that an empty number_of_responses field creates an error
    var c = new Choice({body: "Choice 1"});
  	c.validate(function(err) {
      expect(err.errors.number_of_responses).to.exist;
      done();
    });

    // Checks that all empty required fields create an error
    var c = new Choice({});
  	c.validate(function(err) {
    	expect(err.errors.body).to.exist;
      expect(err.errors.number_of_responses).to.exist;
      done();
    });
  });
});
