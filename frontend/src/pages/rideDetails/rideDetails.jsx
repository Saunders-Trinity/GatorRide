// frontend/src/pages/rideDetails/rideDetails.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./rideDetails.css";
import { useParams, useNavigate } from "react-router-dom";

//Citation: https://stackoverflow.com/questions/61749580/how-to-create-an-overlay-with-react
const Popup = ({children, onClose}) => {
  const modalRoot = document.getElementById("modal-root");
  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

const RideDetails = ({ user }) => {
  const { rideId } = useParams();
  const navigate = useNavigate();

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchRide = async () => {
      try {
        setError("");
        setLoading(true);

        const res = await fetch(
          `http://localhost:8000/api/rides/${rideId}`
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load ride details.");
        } else {
          // support both { ride: {...} } or {...}
          setRide(data.ride || data);
        }
      } catch (err) {
        console.error("Ride details error:", err);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (rideId) fetchRide();
  }, [rideId]);

const handleConfirm = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ride_id: rideId,
        passenger_id: user.user_id,   
        seats_reserved: 1,
        payment_link: paymentLink,    
      }),
    });

    const data = await res.json();
    console.log("Booking result:", data);

    
    navigate("/profile");
  } catch (err) {
    console.error("Booking error:", err);
  }
};
  const handleCancel = () => {
    navigate(-1);
  };

  const submitReport = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reporter_id: user.user_id,
          reported_user_id: ride.driver_id,
          reason: "User Reported",
        }),
      });

      const data = await res.json();
      console.log("Report submitted:", data);
      setShowPopup(false);
      alert("User reported successfully.");
      }
    catch (err) {
      console.error("Report error:", err);
      }
    };

  if (loading) {
    return (
      <div className="ridedetails-page">
        <main className="ridedetails-content">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  if (error || !ride) {
    return (
      <div className="ridedetails-page">
        <main className="ridedetails-content">
          <p className="error">{error || "Ride not found."}</p>
          <button onClick={() => navigate(-1)}>Back</button>
        </main>
      </div>
    );
  }

  // Format date/time
  const dateObj = new Date(ride.ride_date);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = ride.ride_time?.slice(0, 5);

  
  const posterName =
    ride.driver_name ||
    ride.driver_full_name ||
    ride.poster_name ||
    "Ride Poster";

  return (
    <div className="ridedetails-page">
      {/* header */}
      <header className="ridedetails-header">
        <div className="header-right">
          <input
            type="text"
            className="search-bar"
            placeholder="Search rides..."
          />
          <button className="search-btn">Search</button>
        </div>
      </header>

      {/* main content */}
      <main className="ridedetails-content">
        {/* left side */}
        <div className="ride-box">
          <h2 className="ride-title">Ride Details</h2>

        <div className="ride-details-card">
          <div className="details-row">
            <div className="detail-item">
              <span className="label">From:</span>
              <span className="value">{ride.origin}</span>
            </div>

        <div className="detail-item">
          <span className="label">To:</span>
          <span className="value">{ride.destination}</span>
        </div>
      </div>

      <div className="details-row">
        <div className="detail-item">
          <span className="label">Date:</span>
          <span className="value">{dateStr}</span>
      </div>

      <div className="detail-item">
        <span className="label">Time:</span>
        <span className="value">{timeStr}</span>
      </div>
    </div>

    <div className="details-row">
      <div className="detail-item">
        <span className="label">Seats Available:</span>
        <span className="value">{ride.available_seats}</span>
      </div>

      {ride.gas_cost != null && (
        <div className="detail-item">
          <span className="label">Gas Cost:</span>
          <span className="value">${Number(ride.gas_cost).toFixed(2)}</span>
        </div>
      )}
    </div>
  </div>
</div>

        {/* right side */}
        <div className="poster-box">
          <div className="poster-header">
            <div className="poster-icon">👤</div>
            <button className="poster-button" onClick={()=>setShowPopup(true)}>
              {posterName}
            </button>
          </div>

          <div className="payment-links">

            <div className="payment-placeholder">
              Driver’s Payment Link: {ride.payment_link || "None provided"}
            </div>

            <input
              type="text"
              placeholder="Paste your payment link"
              value={paymentLink}
              onChange={(e) => setPaymentLink(e.target.value)}
              className="payment-input"
            />
          </div>

          <div className="action-buttons">
            <button className="confirm-btn" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </main>

      {/* Report User Popup */}
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <h3>Report User</h3>
          <div className="popup-buttons">
            <button className="popup-report-button" onClick={submitReport}>Report User</button>
            <button className="popup-cancel-button" onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default RideDetails;
