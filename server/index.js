'use strict';

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const models = require('./models/models.js');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../client/public/uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const upload = multer({
	storage: storage
}).single('image');

// Constants
const PORT = process.env.PORT || 80;
const HOST = '0.0.0.0';

const CLIENT_BUILD_PATH = path.join(__dirname, '../client/build');

// App
const app = express();

// Static files
app.use(express.static(CLIENT_BUILD_PATH));
// set Express to use json
app.use(express.json());
app.use(cors());

const mongoDB = 'mongodb+srv://vrin:vrin1sanidiot!@cluster0-qjtoh.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*****************************/
/*                           */
/*    Model API Functions    */
/*                           */
/*****************************/

app.get("/questions", async (req, res) => {
	const questions = await models.Question.find({});
	try {
		res.send(questions);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.post("/question", async (req,res) => {
	const question = new models.Question(req.body);
	try {
		await question.save();
		res.send(question);
	} catch (err) {
		res.status(500).send(err);
	}
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
	response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
