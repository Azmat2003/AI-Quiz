import User from "../models/user.model.js";
import Attempt from "../models/attempt.model.js";
import Quiz from "../models/quiz.model.js";


export const getOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get User
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 2. Get all completed attempts
    const completedAttempts = await Attempt.find({
      user: userId,
      status: "COMPLETED",
    })
      .populate("quiz", "title topic difficulty questions")
      .sort({ submittedAt: 1 });

    // 3. Completed quizzes count
    const completed = completedAttempts.length;

    // 4. Average Score
    let averageScore = 0;

    if (completed > 0) {
      const totalPercentage = completedAttempts.reduce(
        (sum, attempt) => sum + attempt.percentage,
        0
      );

      averageScore = Math.round(totalPercentage / completed);
    }

    // 5. Highest + Lowest scoring attempt
    let highest = null;
    let lowest = null;

    if (completed > 0) {
      const highestAttempt = completedAttempts.reduce((prev, curr) =>
        curr.percentage > prev.percentage ? curr : prev
      );

      const lowestAttempt = completedAttempts.reduce((prev, curr) =>
        curr.percentage < prev.percentage ? curr : prev
      );

      highest = {
        quizId: highestAttempt.quiz._id,
        title: highestAttempt.quiz.title,
        topic: highestAttempt.quiz.topic,
        difficulty: highestAttempt.quiz.difficulty,
        score: highestAttempt.score,
        totalQuestions: highestAttempt.quiz.questions.length,
        percentage: highestAttempt.percentage,
      };

      lowest = {
        quizId: lowestAttempt.quiz._id,
        title: lowestAttempt.quiz.title,
        topic: lowestAttempt.quiz.topic,
        difficulty: lowestAttempt.quiz.difficulty,
        score: lowestAttempt.score,
        totalQuestions: lowestAttempt.quiz.questions.length,
        percentage: lowestAttempt.percentage,
      };
    }

    // 6. Send response
    return res.status(200).json({
      stats: {
        generated: user.aiQuizGeneratedCount,
        limit: 10,
        completed,
        averageScore,
      },

      performance: {
        highest,
        lowest,
      },
    });
  } catch (error) {
    console.log("Get Overview Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // --------------------------------------------------
    // 1. Get user
    // Used for:
    // - generated quiz count
    // - basic performance summary
    // --------------------------------------------------
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // --------------------------------------------------
    // 2. Get all quizzes created by the user
    // Used mainly for:
    // - collecting tags
    // - building word cloud frequency
    // --------------------------------------------------
    const quizzes = await Quiz.find({
      user: userId,
    }).select("tags");

    // --------------------------------------------------
    // 3. Create tag frequency map
    //
    // Example:
    // ["React", "JavaScript"]
    // ["React", "NodeJS"]
    //
    // becomes:
    // {
    //   React: 2,
    //   JavaScript: 1,
    //   NodeJS: 1
    // }
    // --------------------------------------------------
    const tagFrequency = {};

    quizzes.forEach((quiz) => {
      quiz.tags.forEach((tag) => {
        const normalizedTag = tag.trim();

        if (tagFrequency[normalizedTag]) {
          tagFrequency[normalizedTag] += 1;
        } else {
          tagFrequency[normalizedTag] = 1;
        }
      });
    });

    // --------------------------------------------------
    // 4. Convert tag frequency object into array
    //
    // Frontend expects:
    // [
    //   { name: "React", count: 4 },
    //   { name: "JavaScript", count: 3 }
    // ]
    // --------------------------------------------------
    const tags = Object.entries(tagFrequency)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count);

      // if needed to reduce select only top 10 tags

    // --------------------------------------------------
    // 5. Get only COMPLETED attempts
    //
    // EXPIRED / IN_PROGRESS attempts should not affect:
    // - average score
    // - performance summary
    // - score trend graph
    // --------------------------------------------------
    const completedAttempts = await Attempt.find({
      user: userId,
      status: "COMPLETED",
    })
      .populate(
        "quiz",
        "title topic difficulty questions"
      )
      .sort({
        submittedAt: 1,
      });

    // --------------------------------------------------
    // 6. Calculate completed quizzes count
    // --------------------------------------------------
    const completedQuizzes = completedAttempts.length;

    // --------------------------------------------------
    // 7. Calculate average score
    // --------------------------------------------------
    let averageScore = 0;

    if (completedQuizzes > 0) {
      const totalPercentage = completedAttempts.reduce(
        (sum, attempt) => sum + attempt.percentage,
        0
      );

      averageScore = Math.round(
        totalPercentage / completedQuizzes
      );
    }

    // --------------------------------------------------
    // 8. Prepare line graph data
    //
    // Each completed attempt becomes one point
    // on the line graph.
    //
    // X-axis:
    // Quiz 1, Quiz 2, Quiz 3...
    //
    // Y-axis:
    // percentage
    //
    // Extra data is also sent because the frontend
    // tooltip will show quiz details on hover.
    // --------------------------------------------------
    const scoreTrend = completedAttempts.map((attempt) => {
      return {
        quizId: attempt.quiz._id,

        title: attempt.quiz.title,

        topic: attempt.quiz.topic,

        difficulty: attempt.quiz.difficulty,

        score: attempt.score,

        totalQuestions: attempt.quiz.questions.length,

        percentage: attempt.percentage,

        submittedAt: attempt.submittedAt,
      };
    });

    // --------------------------------------------------
    // 9. Prepare overall performance summary
    //
    // Used by PerformanceSummary.jsx
    // --------------------------------------------------
    const performance = {
      averageScore,

      completedQuizzes,

      generatedQuizzes: user.aiQuizGeneratedCount,
    };

    // --------------------------------------------------
    // 10. Final Analytics Response
    //
    // performance -> right top card
    // tags        -> word cloud
    // scoreTrend  -> line graph
    // --------------------------------------------------
    return res.status(200).json({
      performance,

      tags,

      scoreTrend,
    });

  } catch (error) {
    console.log("Get Analytics Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};