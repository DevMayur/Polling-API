import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    },
    link_to_add_vote: {
        type: String,
        required: true,
    },
});

const Option = mongoose.model("Option", optionSchema);
export default Option;
