const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/********************/
/*  Question Model  */
/********************/
const questionSchema = new Schema({
  body: {type: String, required: true},
  date_asked: {type: Date, required: true},
  choices: {
    type: [{
      choice: {
        type: String,
        required: true
      },
    }],
    required: true
  },
});

questionSchema.set('toJSON,', {
  getters: true,
});


/********************/
/*   Choice Model   */
/********************/
const choiceSchema = new Schema({
  body: {type: String, required: true},
  responses: {
    type: [{
      gender: {
        type: String,
        // enum: ['', ''], //Add later when needed
        required: false
      },
      age: {
        type: Number,
        required: false
      },
      race: {
        type: String,
        // enum: ['', ''], //Add later when needed
        required: false
      },
    }],
    required: false
  },
});

choiceSchema.set('toJSON', {
  getters: true,
});


/********************/
/*     Exports      */
/********************/
module.exports = {
  Question: mongoose.model('question', questionSchema),
  Choice: mongoose.model('choice', choiceSchema),
};
