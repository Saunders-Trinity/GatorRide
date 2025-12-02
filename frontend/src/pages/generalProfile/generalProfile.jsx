import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import {FaEye, FaEyeSlash, FaStar} from "react-icons/fa"; //https://dev.to/annaqharder/hideshow-password-in-react-513a
import "./generalProfile.css";

const GeneralProfile = ({user}) => {
    //Password Toggling
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    //Bookings
    const [bookings, setBookings] = useState({driverBookings: [], passengerBookings: []});

    // Edit Mode
    const [editMode, setEditMode] = useState(false);

    //Form to Edit Profile
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        ufEmail: "", // Not Edittable
        password: "",
        confirmPassword: "",
        phone: "",
        paymentLink: "",
        profilePic: null,
        rating: 0.0,
        userId: null,
    });

    const [originalData, setOriginalData] = useState(null);


    //User Id with fallback to local
    const userIdState = user?.user_id ?? user?.id ?? null;
    const userIdLocal = localStorage.getItem("user_id") ? Number(localStorage.getItem("user_id")) : null;
    const userId = formData.userId ?? userIdState ?? userIdLocal;

    const[loading, setLoading] = useState(true); //prevent rendering when not loaded
    if (loading && userId){
        (async () => {
            try {
                //Load in the User Profile
                const userId =localStorage.getItem("user_id");
                const profileLoad = await fetch(`http://localhost:8000/api/users/profile?userId=${userId}`);
                const profileData = await profileLoad.json();

                if (!profileLoad.ok){
                    console.error("Failed to load profile");
                    return;
                }

                setFormData({
                    firstName: profileData.first_name,
                    lastName: profileData.last_name,
                    ufEmail: profileData.email, // Not Edittable
                    password: "",
                    confirmPassword: "",
                    phone: profileData.phone || "",
                    paymentLink: profileData.payment_link || "",
                    profilePic: null, // We don't store this
                    rating: profileData.rating || 5.0,
                    userId: profileData.user_id,
                })

                setOriginalData({
                    firstName: profileData.first_name,
                    lastName: profileData.last_name,
                    ufEmail: profileData.email,
                    phone: profileData.phone || "",
                    paymentLink: profileData.payment_link || "",
                    rating: profileData.rating || 5.0,
                    userId: profileData.user_id,
                });


                //Handle Bookings
                const bookingsLoaded = await fetch(`http://localhost:8000/api/bookings/user/${profileData.user_id}`);
                if (!bookingsLoaded.ok){
                    console.error("Failed to load bookings for User");
                }
                const bookingsData =await bookingsLoaded.json();
                setBookings({
                    driverBookings: bookingsData.driverBookings || [],
                    passengerBookings: bookingsData.passengerBookings || [],
                });

                setLoading(false);
            }
            catch (err){
                console.error("Error loading user data: ", err);
                alert("Backend server error");
            }
        })();
    }

    //Edits the user information
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfilePic = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, profilePic: file}));
    };

const handleSave = async () => {
  // Passwords must match
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Build payload
  const payload = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    phone: formData.phone || null,
    payment_link: formData.paymentLink || null,
  };

  // Only include password if typed
  if (formData.password && formData.password.length > 0) {
    payload.password = formData.password;
  }

  console.log("UPDATE payload:", payload);

  try {
    const response = await fetch(
      `http://localhost:8000/api/users/profile?userId=${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Update Profile Failed.");
      console.log("Update error:", data);
      return;
    }

    alert("Profile saved!");

    // Clear password fields, exit edit mode
    setFormData((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));

    setEditMode(false);

  } catch (err) {
    console.error("Update error:", err);
    alert("Backend server error.");
  }
};



    const handleCancel = () => {
        if (originalData) {
            setFormData({
                ...originalData,
                password: "",
                confirmPassword: "",
                profilePic: null,
            });
        }
        setEditMode(false);
    };


    // Star Rating: https://www.youtube.com/watch?v=MzhJmcuyMZI
    const starRating = (rating) => {
        const stars = [];
        for(let i=1; i<=5;i++){
            stars.push(
                <FaStar key={i}
                    color={i<=rating ? "gold":"lightgray"}
                    size={20}
                    style={{marginRight:2}}
                />
            );
        }
        return stars;
    }

    return(
        <div className="general-profile-container">
            <div className="general-profile-left">
                <img 
                    src={formData.profilePic || "/profilepics/DefaultPFP.png"}
                    alt="GeneralProfilePic"
                    className="general-profile-image"
                />

                <div className="general-profile-booked-rides">
                    <h4> Booked Rides </h4>
                    
                    {/* FIXME: change to cards maybe*/}
                    <h4>Booked Rides (Driver)</h4>
                    {bookings.driverBookings.length ? (
                        bookings.driverBookings.map((b) => (
                        <p key={b.booking_id}>Ride #{b.ride_id} - Passenger: {b.passenger_name}</p>
                        ))
                    ) : (
                        <p>No rides as driver.</p>
                    )}

                    <h4>Booked Rides (Passenger)</h4>
                    {bookings.passengerBookings.length ? (
                        bookings.passengerBookings.map((b) => (
                        <p key={b.booking_id}>Ride #{b.ride_id} - Driver: {b.driver_name}</p>
                        ))
                    ) : (
                        <p>No rides as passenger.</p>
                    )}
                </div>
            </div>

            <div className="general-profile-right">
                <h2> {formData.firstName} {formData.lastName} </h2>

                <form>
                    <div className="general-profile-field">
                        <label>First Name:</label>
                        { editMode ? (
                            <input type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}/>
                        ) : (<span>{formData.firstName}</span>)
                        }
                    </div>

                    <div className="general-profile-field">
                        <label>Last Name:</label>
                        { editMode ? (
                            <input type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}/>
                        ) : (<span>{formData.lastName}</span>)
                        }
                    </div>

                    <div className="general-profile-field">
                        <label>Email:</label>
                        <span>{formData.ufEmail}</span>
                    </div>

                    <div className="general-profile-field">
                        <label>Password:</label>
                        { editMode ? (
                            <div className="password-wrapper">
                                <input
                                    type={passwordVisible ? "text":"password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span className="eye-icon" onClick={()=>setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <FaEyeSlash/>:<FaEye/>}
                                </span>
                            </div>
                        ) : (<span>********</span>)
                        }
                    </div>

                    {editMode && (
                        <div className="general-profile-field">
                            <label>Confirm Password:</label>
                            <div className="password-wrapper">
                                <input
                                    type={passwordVisible ? "text":"password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <span className="eye-icon" onClick={()=>setConfirmPasswordVisible(!passwordVisible)}>
                                    {confirmPasswordVisible ? <FaEyeSlash/>:<FaEye/>}
                                </span>
                            </div>
                        </div>
                        )   
                    }

                    <div className="general-profile-field">
                        <label>Phone:</label>
                        { editMode ? (
                            <input type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}/>
                        ) : (<span>{formData.phone || "None"}</span>)
                        }
                    </div>

                    <div className="general-profile-field">
                        <label>Payment Link:</label>
                        { editMode ? (
                            <input type="text"
                                name="paymentLink"
                                value={formData.paymentLink}
                                onChange={handleChange}/>
                        ) : (<span>{formData.paymentLink || "None"}</span>)
                        }
                    </div>

                    <div className = "general-profile-buttons">
                        {editMode ? (
                            <>
                                <button type="button" className="update-save-button" onClick={handleSave}>Save</button>
                                <button type="button" className="update-cancel-button" onClick={handleCancel}>Cancel</button>
                            </>
                        ) : (
                            <button type="button" className="edit-profile-button" onClick={()=>setEditMode(true)}>Edit</button>
                        )}    
                    </div>
                </form>

                {/* Star Rating*/}
                <div className="profile-rating">
                    <label>Rating:</label>
                    <div className="stars">{starRating(formData.rating || 5.0)}</div>
                    <span>{Number(formData.rating ?? 5).toFixed(1)}/5.0</span>
                </div>
            </div>
        </div>
    );
}

export default GeneralProfile;