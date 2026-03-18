import { GenerateInterviewReport,GetAllReports } from "../services/interview.api";
import{InterviewContext} from "../interview.context"
import { useContext, useEffect } from "react";


export const useInterview = () =>{

    const context = useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an InterviewContext")
    }

    const { reports,setReports,loading,setLoading } = context

    const generateReport = async ({resumeFile,jobDescription,selfDescription}) => {
        setLoading(true)

        try{
            const  response = await GenerateInterviewReport({
                resumeFile,jobDescription,selfDescription
            })
            setReports(prev => [...prev, response.interviewReport])
            return (response.interviewReport)
        }
        catch(err){
            console.error(err)
        }
        finally{
            setLoading(false)
        }
    }

    const fetchReports = async () =>{
        setLoading(true)

        try{
            const response = await GetAllReports()
            console.log("fetchReports response:", response)
            setReports(response)
        }catch(err){
            console.error(err)
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchReports()
    },[])

    return {loading,generateReport,fetchReports,reports}
}