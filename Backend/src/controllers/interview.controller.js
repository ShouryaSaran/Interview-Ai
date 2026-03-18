const pdfParse = require("pdf-parse")
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require("../models/InterviewReport.model")


async function generateInterViewReportController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

async function getInterviewReportController(req,res){

    try {
        const reports = await interviewReportModel.find({ user: req.user.id })
        if(reports.length === 0){
            return res.status(200).json({
                message:"No reports were found for this user",
                reports: reports
            })
        }
        
        else {
            return res.status(200).json({
                message:"report fetched successfully",
                reports : reports,
            })
        }
    }

    catch(err){
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}
module.exports = {
    generateInterViewReportController,
    getInterviewReportController
}