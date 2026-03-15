const express = require('express')
const authMiddleware = require('../Middlewares/auth.middleware')
const interviewRouter = express.Router()
const interviewController = require('../controllers/interview.controller')
const upload = require('../Middlewares/file.middleware')
/***
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description, resume pdf and job description
 * @access PRIVATE
 */

interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)


/**
 * @route Get /inerview/reports
 * @description Get all the interview reports that the user has generated in the past
 * @access PRIVATE
 */
interviewRouter.get("/reports",authMiddleware.authUser,interviewController.getInterviewReportController)

module.exports = interviewRouter