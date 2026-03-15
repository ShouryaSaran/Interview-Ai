const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GenAI_API_KEY });

const interviewReportSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Title of the job this interview report is about"
    },
    matchScore: {
      type: "number",
      description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description",
    },
    title: {
      type: "string",
      description: "The title of the job for which the interview report is generated",
    },
    technicalQuestions: {
      type: "array",
      description: "Technical questions that can be asked in the interview along with their intention and how to answer them",
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "The technical question that can be asked in the interview" },
          intention: { type: "string", description: "The intention of the interviewer behind asking this question" },
          answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take etc." },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "array",
      description: "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "The behavioral question that can be asked in the interview" },
          intention: { type: "string", description: "The intention of the interviewer behind asking this question" },
          answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take etc." },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: "array",
      description: "List of skill gaps in the candidate's profile along with their severity",
      items: {
        type: "object",
        properties: {
          skill: { type: "string", description: "The skill which the candidate is lacking" },
          severity: { type: "string", enum: ["low", "medium", "high"], description: "The severity of this skill gap" },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "array",
      description: "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
      items: {
        type: "object",
        properties: {
          day: { type: "number", description: "The day number in the preparation plan, starting from 1" },
          focus: { type: "string", description: "The main focus of this day e.g. data structures, system design, mock interviews etc." },
          tasks: {
            type: "array",
            items: { type: "string" },
            description: "List of tasks to be done on this day",
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
  },
  required: ["matchScore", "title", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"],
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  const prompt = `Generate an interview report for a candidate with the following details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportSchema,
    },
  });

  return JSON.parse(response.text);
}

module.exports = generateInterviewReport;