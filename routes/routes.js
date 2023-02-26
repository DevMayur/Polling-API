import express from "express";
const router = express.Router();
import {
    createQuestion,
    deleteQuestion,
    createOption,
    deleteOption,
    addVoteForOption,
    getQuestion,
    getQuestions,
} from "../controllers/controller.js";

router.route("/questions").post(createQuestion).get(getQuestions);

router.route("/questions/:questionId").delete(deleteQuestion).get(getQuestion);

router.route("/questions/:questionId/options").post(createOption);

router
    .route("/questions/:questionId/options/:optionId")
    .post(addVoteForOption)
    .delete(deleteOption);

router
    .route("/questions/:questionId/options/:optionId/addVote")
    .get(addVoteForOption);

export default router;
