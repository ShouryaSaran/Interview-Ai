import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials:true
})

export const GenerateInterviewReport = async ({resumeFile,selfDescription,jobDescription}) => {
    const formData = new FormData()
    formData.append("resume",resumeFile)
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)

    const response = await api.post("/api/interview/",formData, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export const GetAllReports = async() => {
    try{
        const response = await api.get("/api/interview/reports")
        return response.data.reports
    } 
    catch(err){
        console.log(err)
    }

}