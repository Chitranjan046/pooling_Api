const Question = require('../models/questions');
const Option = require('../models/options');

// Create a new question
module.exports.create = async (req, res) => {
  try {
    console.log(req.url);
    console.log(req.body);

    const question = await Question.create(req.body);
    console.log(question);
    res.send(question);
  } catch (err) {
    console.log("Error in creating the question schema", err);
    res.status(500).send('Internal Server Error');
  }
};

// Retrieve details of a specific question
module.exports.showDetails = async (req, res) => {
  try {
    console.log(req.params.id);

    const question = await Question.findById(req.params.id).populate('options');

    if (question) {
      res.send(question);
    } else {
      res.send("Question not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a question and its associated options
module.exports.deleteQues = async (req, res) => {
  try {
    const question = await Question.findByIdAndRemove(req.params.id);
    if (question) {
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
