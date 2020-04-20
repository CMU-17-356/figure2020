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
	try {
		const choiceIds = [];
		const choicesContent = req.body.choices;
		for (const elem of choicesContent) {
			let newId = new mongoose.Types.ObjectId();
			choiceIds.push(newId);
			const newChoice = new models.Choice({
				_id: newId,
				body: elem.choice
			});
			await newChoice.save();
		}
		const question = new models.Question({
			_id: new mongoose.Types.ObjectId(),
			body: req.body.body,
			date_asked: req.body.date_asked,
			choices: choiceIds
		});
		await question.save();
		res.send(question);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/mostRecentQuestion", async (req, res) => {
	try {
		const question = await models.Question.find().sort({"date_asked": -1}).limit(1);
		let choiceIds = question[0].choices.map(idStr => mongoose.Types.ObjectId(idStr));
		let choiceBodies= [];
		const choices = await models.Choice
			.aggregate([
				{
					$match: {
						"_id": {"$in": choiceIds}
					}
				},
				{
					$project: {
						body: true
					}
				}
			]);
		choices.forEach(elem => {
			choiceBodies.push(elem.body);
		});
		let resJson = {
			questionBody: question[0].body,
			choiceNames: choiceBodies
		}
		res.status(200).json(resJson);
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
