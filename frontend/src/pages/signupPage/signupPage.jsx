//import Navbar from "../../components/Navbar/Navbar";
import React, { useState } from "react";
import "./signupPage.css";

const SignUpPage = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        ufEmail: "",
        password: "",
        confirmPassword: "",
        paymentLinks: [""],
        profilePic: null,
    });

    /* these functions are to handle when the user updates their profile */
    /* prev is the previous val before the user enters anything  */
    /* ... copies existing state so updating one field doesn't wipe out entire formData */
    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addPaymentLink = () => {
        setFormData((prev) => ({
            ...prev,
            paymentLinks: [...prev.paymentLinks, ""],
          }));
    };

    const handleLinkChange = (index, value) => {
        const updatedLinks = [ ...formData.paymentLinks];
        updatedLinks[index] = value;
        setFormData((prev) => ({ ...prev, paymentLinks: updatedLinks}));
    };

    const handleProfilePic = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, profilePic: file}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        //add backend connection to add user to database
    }

    return(
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-left">
                    <label>First Name:</label>
                    <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />

                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />

                <label>UF Email:</label>
                <input
                    type="email"
                    name="ufEmail"
                    placeholder="UF Email"
                    value={formData.ufEmail}
                    onChange={handleChange}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <label>Payment Links (Zelle, Venmo, etc.):</label>
                {formData.paymentLinks.map((link, index) => (

                <input
                    key={index}
                    type="text"
                    placeholder={`Link ${index + 1}`}
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                />
            ))}
            <button type="button" className="add-link-btn" onClick={addPaymentLink}>+</button>

            <div className="form-actions">
                <button type="submit" className="signup-button">SIGN UP</button>
                <button type="button" className="cancel-button">Cancel</button>
            </div>
                </div>

                <div className="form-right">
                    <div className="profile-pic">
                        {formData.profilePic ? (
                            <img
                                src={URL.createObjectURL(formData.profilePic)}
                                alt="Profile Preview"
                                className="profile-preview"
                            />
                        ) : (
                        <div className="profile-placeholder"></div>
                        )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePic}
                        className="profile-input"
                    />
                    <label className="edit-pfp">Edit PFP</label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;