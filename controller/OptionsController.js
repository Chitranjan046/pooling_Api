const Option = require('../models/options');
const Question = require('../models/questions');

// Create an option for a given question ID
module.exports.create = async (req, res) => {
    // Create options for the specified question ID
    console.log(req.body, req.params.id);
    const opt = await Option.create({
        option: req.body.content,
        question: req.params.id,
    });

    // Add the vote URL to the created option using string interpolation
    const updateOpt = await Option.findByIdAndUpdate(opt._id, { "add_vote": `http://localhost:8080/api/v1/options/${opt._id}/add_vote` });
    updateOpt.save();

    const question = await Question.findById(req.params.id);
    if (question) {
        question.options.push(updateOpt);
        question.save();
        console.log(question);
        res.send(question);
    } else {
        res.send(' No Sir Question does not exist');
    }
};

// Add a vote to a specific option
module.exports.add_vote = async (req, res) => {
    // Add a vote to the specified option
    console.log(req.params.id);
    const option = await Option.findByIdAndUpdate(req.params.id, { $inc: { vote: 1 } });
    if (option) {
        await option.save();
        console.log(option);
        res.send(option);
    } else {
        res.send(' No Option  not exist');
    }
};

// Delete a specific option
module.exports.delete = async (req, res) => {
    // Delete the specified option
    console.log('ID:', req.params.id);
    const option = await Option.findById(req.params.id);
    if (option) {
        const questionId = option.question;
        const question = await Question.findByIdAndUpdate(questionId, { $pull: { options: req.params.id } });
        await Option.findByIdAndDelete(req.params.id);
        console.log(question);
        res.send(' Yes Option deleted');
    } else {
        res.send('ID does not exist');
    }
};
