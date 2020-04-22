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


/********************/
/*  Response Model  */
/********************/
const responseSchema = new Schema({
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: false
  },
  age: {
    type: Number,
    required: false
  },
  race: {
    type: String,
    enum: ['white', 'african american', 'asian', 'hispanic', 'american indian', 'other'],
    required: false
  }
});

responseSchema.set('toJSON', {
  getters: true,
});


/********************/
/*     Exports      */
/********************/
const Question = mongoose.model('Question', questionSchema);
const Choice = mongoose.model('Choice', choiceSchema);
const Response = mongoose.model('Response', responseSchema);

module.exports = {
  Question: Question,
  Choice: Choice,
  Response: Response,
};
