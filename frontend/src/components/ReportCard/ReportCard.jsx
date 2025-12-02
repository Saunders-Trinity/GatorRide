import React from "react";
import "./ReportCard.css";

const ReportCard = ({report, onDelete}) =>{
    const reportedAt = new Date(report.created_at).toLocaleString();
    return (
        <div className = "report-card">
            <div className="report-card-header">
                <h3>Report #{report.report_id}</h3>
            </div>
            
            <button className="report-delete-button" onClick={()=>onDelete(report.report_id)}>Remove</button>
            
            <div className="report-card-body">
                <p> <strong>Reported User ID: </strong> {report.reported_user_id}</p>
                <p> <strong>Reported ID: </strong> {report.reporter_id}</p>
                <p> <strong>Reason: </strong> {report.reason}</p>
                <p> <strong>Reported On: </strong> {reportedAt} </p>
            </div>
        </div>
    )
}

export default ReportCard;