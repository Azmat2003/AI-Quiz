import { rateLimit } from "express-rate-limit";

export const quizGenerationLimiter = rateLimit({
  windowMs: 60 * 1000,

  limit: 2,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    message: "Too many quiz generation requests. Please try again later.",
  },
});
;