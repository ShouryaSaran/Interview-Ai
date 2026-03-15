require('dotenv').config()
const mongoose = require('mongoose')
const InterviewReport = require('./src/models/InterviewReport.model')
const data = require('../../data.json')
const connectToDb = require('./src/config/database')



const seed = async () => {
    await connectToDb()
  try {
    await InterviewReport.deleteMany({})  // clear old data
    
    const reportsWithObjectId = data.map(report => ({
      ...report,
      user: new mongoose.Types.ObjectId(report.user)
    }))

    await InterviewReport.insertMany(reportsWithObjectId)
    console.log('Dummy data inserted successfully')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seed()