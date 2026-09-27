import generateQuizWithGemini  from "./gemini/quiz.gemini.service.js";
// import generateQuizWithOpenAI from "./openAI/quiz.openai.service.js";
// import generateQuizWithGroq from "./groq/quiz.groq.service.js";


const quizServices = [
    generateQuizWithGemini
    // generateQuizWithOpenAI,
    // generateQuizWithGroq,
];


export const generateQuizFromAI = async (quizConfig) => {

  for (const service of quizServices) {

    try {

      const quiz = await service(quizConfig);

      // First successful service
      return quiz;

    } catch (error) {

      console.error(
        `${service.name} failed:`,
        error.message
      );

    }
  }

  // Loop finishes only if every service failed
  throw new Error("Sorry, Services are facing some issue");
};