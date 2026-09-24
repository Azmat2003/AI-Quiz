import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionIndex: {
      type: Number,
      required: true,
      min: 0,
    },

    selectedOption: {
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

const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    answers: {
      type: [answerSchema],
      default: [],
    },

    currentQuestionIndex: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["IN_PROGRESS", "COMPLETED"],
      default: "IN_PROGRESS",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
    },

    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// // One user can attempt a particular quiz only once
// attemptSchema.index(
//   {
//     user: 1,
//     quiz: 1,
//   },
//   {
//     unique: true,
//   }
// );

const Attempt = mongoose.model("Attempt", attemptSchema);

export default Attempt;