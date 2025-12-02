import React from "react";
import "./ReportCard.css";

const ReportCard = (report, onDelete) =>{
    const reportedAt = new Date(report.created_at).toLocaleString();
    return (
        <div className = "report-card">
            <div className="report-card-header">
                <h3>Report #{report.report_id}</h3>
            </div>
            
            <button className="report-delete button" onClick={()=>onDelete(report.report_id)}>X</button>
            
            <div className="report-card-body">
                <p> <label>Reported User ID: </label> {report.reported_user_id}</p>
                <p> <label>Reported ID: </label> {report.reporter_id}</p>
                <p> <label>Reason: </label> {report.reason}</p>
                <p> <label>Reported On: </label> {reportedAt} </p>
            </div>
        </div>
    )
}

export default ReportCard;