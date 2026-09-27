import User from "../models/user.model.js";

export const validateQuizRequest = async (req, res, next) => {
  const { topic, difficulty, questionTimer } = req.body;

  const id = req.user.id;
  const user = await User.findById(id);
  if(!user){
    return res.status(400).json({
      message: "User not found",
    });
  }

  if(user.aiQuizGeneratedCount >= 10){
    return res.status(400).json({
      message: "You've reached the quiz generation limit",
    });
  }

  if (!topic || !difficulty || questionTimer === undefined) {
    return res.status(400).json({
      message: "Topic, difficulty and question timer are required",
    });
  }

  if (typeof topic !== "string" || !topic.trim()) {
    return res.status(400).json({
      message: "Please enter a valid topic",
    });
  }

  const allowedDifficulties = ["EASY", "MEDIUM", "HARD"];

  if (!allowedDifficulties.includes(difficulty)) {
    return res.status(400).json({
      message: "Difficulty must be EASY, MEDIUM or HARD",
    });
  }

  if (
    typeof questionTimer !== "number" ||
    questionTimer < 20 ||
    questionTimer > 60
  ) {
    return res.status(400).json({
      message: "Question timer must be between 20 and 60 seconds",
    });
  }

  next();
};
