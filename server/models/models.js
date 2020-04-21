const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/********************/
/*  Question Model  */
/********************/
const questionSchema = new Schema({
  body: {type: String, required: true},
  date_asked: {type: Date, required: true},
  choices: [
    {type: Schema.Types.ObjectId, ref: 'Choice'}
  ],
});

questionSchema.set('toJSON,', {
  getters: true,
});


/********************/
/*   Choice Model   */
/********************/
const choiceSchema = new Schema({
  body: {type: String, required: true},
  responses: [
      {type: Schema.Types.ObjectId, ref: 'Response'}
    ]
});

choiceSchema.set('toJSON', {
  getters: true,
});

const ResponseSchema = new Schema({
  gender: {
    type: String,
    // enum: ['', ''], //Add later when needed
    required: false
  },
  age: {
    type: String,
    // enum: ['', ''], //Add later when needed
    required: false
  },
  race: {
    type: String,
    // enum: ['', ''], //Add later when needed
    required: false
  }
});

ResponseSchema.set('toJSON', {
  getters: true,
});

const Question = mongoose.model('Question', questionSchema);
const Choice = mongoose.model('Choice', choiceSchema);
const Response = mongoose.model('Response', ResponseSchema);

/********************/
/*     Exports      */
/********************/
module.exports = {
  Question: Question,
  Choice: Choice,
  Response: Response,
};
