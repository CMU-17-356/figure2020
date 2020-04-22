var mongoose = require('mongoose');
var expect = require('chai').expect;

const models = require('./models.js');
var Response = models.Response;


/**************************/
/*  Response Schema Tests */
/**************************/

// ****************************** //
// *** Basic Validation Tests *** //
// ****************************** //
// Checks that a valid Choice object has no errors
describe('response', function() {
  it('should be valid if no required fields are left empty', function(done) {
  	var r = new Response({age: 24, gender: "male", race: "white"});
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
    var r = new Response({age: 24, race: "white"});
  	r.validate(function(err) {
  	  expect(err).to.not.exist;
      done();
    });

    // Checks that an empty age field does not createe an error
    r = new Response({gender: "male", race: "white"});
  	r.validate(function(err) {
  	  expect(err).to.not.exist;
      done();
    });

    // Checks that an empty race field does not createe an error
    r = new Response({age: 24, gender: "male"});
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



// ********************************** //
// *** Type/Enum Validation Tests *** //
// ********************************** //
// Checks that a Choices age field is a Number and within the proper range (0-122)
describe('response', function() {
  it('should be invalid if a Choice\'s age field is not a Number or out of range (0-122)', function(done) {
    // Checks that a number age within range (0-122) does not create an error
    var r = new Response({age: 0, gender: "male", race: "white"});
  	r.validate(function(err) {
  		expect(err).to.not.exist;
  		done();
  	});
    r = new Response({ age: 122, gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err).to.not.exist;
      done();
    });
    r = new Response({ age: "24", gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err).to.not.exist;
      done();
    });

    // Checks that a non-number age creates an error
    r = new Response({ age: "twenty", gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err.errors.age).to.exist;
      done();
    });
    r = new Response({ age: "Twenty-Four", gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err.errors.age).to.exist;
      done();
    });
    r = new Response({ age: "age", gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err.errors.age).to.exist;
      done();
    });

    // Checks that a number age below the range creates an error
    r = new Response({ age: -1, gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err.errors.age).to.exist;
      done();
    });
    r = new Response({ age: "-16", gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err.errors.age).to.exist;
      done();
    });
    r = new Response({ age: -24, gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err.errors.age).to.exist;
      done();
    });

    // Checks that a number age above the range creates an error
    r = new Response({ age: 123, gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err.errors.age).to.exist;
      done();
    });
    r = new Response({ age: "200", gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err.errors.age).to.exist;
      done();
    });
    r = new Response({ age: 2301, gender: "male", race: "white"});
    r.validate(function(err) {
      expect(err.errors.age).to.exist;
      done();
    });
  });
});

// Checks that a Choices gender field is one of the following string enums ['male', 'female', 'other']
// Technically there capitalization should not matter but since this will be a select option it does not matter
describe('response', function() {
  it('should be invalid if a Choice\'s gender field is not one of the following string enums [\'male\', \'female\', \'other\']', function(done) {
    // Checks that a valid gender does not create an error
    var r = new Response({age: 24, gender: "male", race: "white"});
  	r.validate(function(err) {
  		expect(err).to.not.exist;
  		done();
  	});
    r = new Response({ age: 24, gender: "female", race: "white"});
    r.validate(function(err) {
      expect(err).to.not.exist;
      done();
    });
    r = new Response({ age: 24, gender: "other", race: "white"});
    r.validate(function(err) {
      expect(err).to.not.exist;
      done();
    });

    // Checks that an invalid gender creates an error
    var r = new Response({age: 24, gender: "m", race: "white"});
  	r.validate(function(err) {
  		expect(err.errors.gender).to.exist;
  		done();
  	});
    r = new Response({ age: 24, gender: "f", race: "white"});
    r.validate(function(err) {
      expect(err.errors.gender).to.exist;
      done();
    });
    r = new Response({ age: 24, gender: "mal", race: "white"});
    r.validate(function(err) {
      expect(err.errors.gender).to.exist;
      done();
    });
    r = new Response({ age: 24, gender: 0, race: "white"});
    r.validate(function(err) {
      expect(err.errors.gender).to.exist;
      done();
    });
    r = new Response({ age: 24, gender: 2, race: "white"});
    r.validate(function(err) {
      expect(err.errors.gender).to.exist;
      done();
    });
    r = new Response({ age: 24, gender: "Helicopter", race: "white"});
    r.validate(function(err) {
      expect(err.errors.gender).to.exist;
      done();
    });
  });
});
