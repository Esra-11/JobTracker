import { getApplications } from "../services/applicationService";
import { useState,useEffect } from "react"


function ApplicationsPage() {

  const [applications, setApplications] = useState<any[]>([])
  useEffect(() => {
    getApplications().then((response) => {
      setApplications(response.data);
    }).catch((error) => {
      console.error('Error fetching applications:', error);
    });
  }, [])


  return (
    <div>
      <h1>Applications Page</h1>
      <ul>
        {applications.map((application) => (
          <li key={application.id}> companyName: {application.companyName}, Position: {application.position} </li>
        ))}
      </ul>
    </div>
  )
}

export default ApplicationsPage
