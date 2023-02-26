import Question from "../models/QuestionModel.js";
import Option from "../models/OptionModel.js";

const createQuestion = async (req, res) => {
    try {
        const { title } = req.body;
        console.log(title);
        const question = await Question.create({
            title: title,
        });
        if (question) {
            res.status(200).json({
                message: "question created successfully",
                question: question,
            });
        } else {
            res.status(400).json({
                message: "unable to create question",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while creating the question",
            error: err.message,
        });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        console.log(req.params);
        if (question) {
            await question.remove();
            res.status(200).json({
                message: "question deleted successfully",
            });
        } else {
            res.status(404).json({
                message: "question not found",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while deleting the question",
            error: err.message,
        });
    }
};

const createOption = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const { text } = req.body;
        console.log(req.body);
        const question = await Question.findById(req.params.questionId);
        if (!question) {
            res.status(404).json({
                message: "question not found",
            });
            return;
        }

        var option = await Option.create({
            text: text,
            votes: 0,
            question: questionId,
            link_to_add_vote: "not added",
        });

        question.options.push(option);
        const updatedQuestion = await question.save();

        if (updatedQuestion) {
            await option.update({
                link_to_add_vote: `http://localhost:3050/api/questions/${option.question}/options/${option._id}/addVote`,
            });
            option.link_to_add_vote = `http://localhost:3050/api/questions/${option.question}/options/${option._id}/addVote`;
            res.status(200).json({
                message: "option created successfully",
                option: option,
            });
        } else {
            res.status(400).json({
                message: "unable to create option",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while creating the option",
            error: err.message,
        });
    }
};

const deleteOption = async (req, res) => {
    try {
        const option = await Option.findById(req.params.optionId);

        if (option) {
            await option.remove();
            res.status(200).json({
                message: "Option deleted successfully",
                deleted: option,
            });
        } else {
            res.status(404).json({
                message: "option not found",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while deleting the option",
            error: err.message,
        });
    }
};

const addVoteForOption = async (req, res) => {
    try {
        const oldOption = await Option.findById(req.params.optionId);
        if (!oldOption) {
            res.status(404).json({
                message: "option not found",
            });
            return;
        }

        const option = await Option.findByIdAndUpdate(
            req.params.optionId,
            { votes: oldOption.votes + 1 },
            { new: true }
        );
        if (option) {
            res.status(200).json({
                message: "vote added successfully",
            });
        } else {
            res.status(400).json({
                message: "unable to add vote",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal server error",
        });
    }
};

const getQuestion = async (req, res) => {
    try {
        const question = await Question.findById(
            req.params.questionId
        ).populate("options");
        if (question) {
            res.json({
                question,
            });
        } else {
            res.status(404).json({
                message: "question not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find(req.params.questionId).populate(
            "options"
        );
        if (questions) {
            res.json({
                questions,
            });
        } else {
            res.status(404).json({
                message: "question not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export {
    createQuestion,
    deleteQuestion,
    createOption,
    deleteOption,
    addVoteForOption,
    getQuestion,
    getQuestions,
};
