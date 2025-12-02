//import Navbar from "../../components/Navbar/Navbar";
import "./reportManager.css";
import React, {useEffect, useState} from "react";
import ReportCard from "../components/ReportCard";

const ReportManager = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        const fetchReports = async () => {
            try{
                const result = await fetch("http://localhost:8000/api/reports");
                const data = await result.json();

                if (result.ok){
                    setReports(Array.isArray(data) ? data:[]);
                }
                else{
                    setError(data.error || "Failed to fetch reports");
                }
            }
            catch (err){
                console.error("Fetch reports error: ", err);
                setError()
            }
            finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleDelete = async (id) => {
        try{
            const res = await fetch(`http://localhost:8000/api/reports/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok){
                alert(data.error || "Failed to delete report.");
                return;
            }

            setReports((prev)=>prev.filter((rep)=> rep.id !== id));
        }
        catch (err){
            console.error("Delete report error: ", err);
            alert("Server error deleteing report.");
        }
    };
    
    return (
        <div className="report-manager">
        <h1>Report Manager</h1>

        {loading && <p>Loading reports...</p>}

        <div className="report-cards-container">
            {reports.map((report) => (
            <ReportCard
                key={report.id}
                report={report}
                onDelete={handleDelete}
            />
            ))}
        </div>
        </div>
    );
};

export default ReportManager;
