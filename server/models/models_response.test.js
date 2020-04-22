var mongoose = require('mongoose');
var expect = require('chai').expect;

const models = require('./models.js');
var Response = models.Response;


/**************************/
/*  Response Schema Tests */
/**************************/
// *** Basic Validation Tests *** //
// Checks that a valid Choice object has no errors
describe('response', function() {
  it('should be valid if no required fields are left empty', function(done) {
  	var r = new Response({gender: "Male", age: 24, race: "White"});
  	r.validate(function(err) {
  		expect(err).to.not.exist;
  		done();
  	});
  });
});

// Checks that empty non-required fields do not create an error
describe('response', function() {
  it('should be invalid if a required field is left empty', function(done) {
    // Checks that an empty gender field does not createe an error
    var r = new Response({age: 24, race: "White"});
  	r.validate(function(err) {
  	  expect(err).to.not.exist;
      done();
    });

    // Checks that an empty age field does not createe an error
    r = new Response({gender: "Male", race: "White"});
  	r.validate(function(err) {
  	  expect(err).to.not.exist;
      done();
    });

    // Checks that an empty race field does not createe an error
    r = new Response({gender: "Male", age: 24});
  	r.validate(function(err) {
  	  expect(err).to.not.exist;
      done();
    });

    // Checks that all empty non-required fields do not create an error
    r = new Response({});
  	r.validate(function(err) {
    	expect(err).to.not.exist;
      done();
    });
  });
});
