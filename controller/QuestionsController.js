const Question = require('../models/questions');
const Option = require('../models/options');

// Create a new question
module.exports.create = async function (req, res) {
  try {
    console.log(req.url);
    console.log(req.body);

    const ques = await Question.create(req.body);
    console.log(ques);
    res.send(ques);
  } catch (err) {
    console.log("Error in creating the question schema", err);
    res.status(500).send('Internal Server Error');
  }
};

// Retrieve details of a specific question
module.exports.showDetails = async function (req, res) {
  try {
    console.log(req.params.id);

    const ques = await Question.findById(req.params.id).populate('options');

    if (ques) {
      res.send(ques);
    } else {
      res.send("Question does not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a question and its associated options
module.exports.deleteQues = async function (req, res) {
  try {
    const ques = await Question.findByIdAndRemove(req.params.id);
    if (ques) {
      await Option.deleteMany({ question: req.params.id });
      res.send("Question deleted");
    } else {
      res.send('Question does not exist');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};
