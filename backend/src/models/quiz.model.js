import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (options) {
          return options.length === 4;
        },
        message: "Each question must have exactly 4 options",
      },
    },

    correctOption: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
  },
  {
    _id: false,
  }
);

const quizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true,
    },

    questionTimer: {
      type: Number,
      required: true,
      min: 1,
      max: 60,
    },

    tags: {
      type: [String],
      default: [],
    },

    questions: {
      type: [questionSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;