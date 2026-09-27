import User from "../models/user.model.js";
import Quiz from "../models/quiz.model.js";

import { generateQuizFromAI } from "../services/quiz.service.js";

export const generateQuiz = async (req, res) => {
    try {
        // 1
        const { topic, difficulty, questionTimer } = req.body;

        // 2 user id
        const userId = req.user.id;

        // 3. generate quiz
        const quizConfig = {
            topic,
            difficulty,
            numberOfQuestions: 10,
        };
        const generatedQuiz = await generateQuizFromAI(quizConfig);
        console.log(generatedQuiz);
        // 4. Save in Quiz model
        const quiz = await Quiz.create({
            user: userId,
            title: generatedQuiz.title,
            topic,
            difficulty,
            questionTimer,
            tags: generatedQuiz.tags,
            questions: generatedQuiz.questions,
        });

        // 5. Update in User
        // const user = await User.findById(userId);
        // user.aiQuizGeneratedCount++;
        // user.save();

        // better
        const user = await User.findByIdAndUpdate(
            userId,
            { $inc: { aiQuizGeneratedCount: 1 } },
            { new: true },
        );

        return res.status(200).json({
                message : "Quiz generated successfully",
                quiz
            }
        )

    } 
    catch (err) {
        return res.status(500).json({
            message : "Failed to generate quiz"
        })
    }
};

export const getMyQuizzes = async (req, res) => {

  try {

    const userId = req.user.id;

    const quizzes = await Quiz.find({
      user: userId
    }).sort({
      createdAt: -1
    });

    return res.status(200).json({
      message: "Quizzes fetched successfully",
      quizzes,
    });

  } catch (error) {

    console.error("Get My Quizzes Error:", error);

    return res.status(500).json({
      message: "Failed to fetch quizzes",
    });

  }

};

export const getQuiz = async (req, res) => {

  try {

    const userId = req.user.id;
    const { quizId } = req.params;

    const quiz = await Quiz.findOne({
      _id: quizId,
      user: userId,
    });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    return res.status(200).json({
      message: "Quiz fetched successfully",
      quiz,
    });

  } catch (error) {

    console.error("Get Quiz Error:", error);

    return res.status(500).json({
      message: "Failed to fetch quiz",
    });

  }

};

export const getQuizResult = async (req, res) => {};
