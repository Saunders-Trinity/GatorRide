import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import "./generalProfile.css";

const GeneralProfile = ({localUser}) => {
    if (!localUser || localUser.role === "Guest"){
        return <Navigate to="/login" replace/>;
    }

    //Modes
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    //Form to Edit Profile
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        ufEmail: "",
        password: "",
        phone: "",                 // NEW to match DB
        paymentLink: "",           // single optional link
        profilePic: null,
    });

    const handleChange = (e) => {
        // Edits to user profile would go here
        
    }

    const handleSave = (e) => {
        // Save changes
        setFormData(formData);
        setEditMode(false);
    }

    const handleCancel = () => {
        //Cancel edits - revert to original user data
        setFormData({
            firstName: localUser.firstName,
            lastName: localUser.lastName,
            email: localUser.ufEmail,
            phone: localUser.phone || "",
            paymentLink: localUser.paymentLink || "",
        });

        setEditMode(false);
    }

    // Star Rating: https://www.youtube.com/watch?v=MzhJmcuyMZI

    return(
        <div>
            <h1> Welcome {localUser.firstName} {localUser.lastName}!</h1>      
        </div>
    )
}
export default GeneralProfile;