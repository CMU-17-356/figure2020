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

questionSchema.set('toJSON,' {
  getters: true,
});


/********************/
/*   Choice Model   */
/********************/
const choiceSchema = new Schema({
  body: {type: String, required: true},
  number_of_responses: {type: Number, required: true},
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
