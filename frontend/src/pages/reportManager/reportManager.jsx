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
        }
    })

    return(
        <div>
            <h1>TEMPORARY: admin only report manager</h1>
        </div>
    );
};

export default ReportManager;
