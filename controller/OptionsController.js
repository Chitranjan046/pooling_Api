const Option = require('../models/options');
const Question = require('../models/questions');

// Create an option for a given question ID
exports.create = async (req, res) => {
    // Create options for the specified question ID
    console.log(req.body, req.params.id);
    const opt = await Option.create({
        option: req.body.content,
        question: req.params.id,
    });

    // Add the vote URL to the created option using string interpolation
    const updateOpt = await Option.findByIdAndUpdate(opt._id, { "add_vote": `http://localhost:8080/api/v1/options/${opt._id}/add_vote` });
    updateOpt.save();

    const ques = await Question.findById(req.params.id);
    if (ques) {
        ques.options.push(updateOpt);
        ques.save();
        console.log(ques);
        res.send(ques);
    } else {
        res.send('Question does not exist');
    }
};

// Add a vote to a specific option
exports.add_vote = async (req, res) => {
    // Add a vote to the specified option
    console.log(req.params.id);
    const opt = await Option.findByIdAndUpdate(req.params.id, { $inc: { vote: 1 } });
    if (opt) {
        await opt.save();
        console.log(opt);
        res.send(opt);
    } else {
        res.send('Option does not exist');
    }
};

// Delete a specific option
exports.delete = async (req, res) => {
    // Delete the specified option
    console.log('ID:', req.params.id);
    const opt = await Option.findById(req.params.id);
    if (opt) {
        const quesId = opt.question;
        const ques = await Question.findByIdAndUpdate(quesId, { $pull: { options: req.params.id } });
        await Option.findByIdAndDelete(req.params.id);
        console.log(ques);
        res.send('Option deleted');
    } else {
        res.send('ID does not exist');
    }
};
