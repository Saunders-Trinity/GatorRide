// frontend/src/pages/rideDetails/rideDetails.jsx
import React, { useEffect, useState } from "react";
import "./rideDetails.css";
import { useParams, useNavigate } from "react-router-dom";

const RideDetails = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleConfirm = () => {
    // later: call booking endpoint here (POST /api/bookings)
    console.log("Confirm clicked for ride", rideId);
  };

  const handleCancel = () => {
    navigate(-1);
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

  // Format date/time nicely
  const dateObj = new Date(ride.ride_date);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = ride.ride_time?.slice(0, 5);

  // Poster info if backend sent it (e.g. driver_name, payment_link)
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
          <h2>Ride Details</h2>
          <p>
            <strong>From:</strong> {ride.origin}
          </p>
          <p>
            <strong>To:</strong> {ride.destination}
          </p>
          <p>
            <strong>Date:</strong> {dateStr}
          </p>
          <p>
            <strong>Time:</strong> {timeStr}
          </p>
          <p>
            <strong>Seats Available:</strong> {ride.available_seats}
          </p>
          {ride.gas_cost != null && (
            <p>
              <strong>Gas Cost:</strong> ${Number(ride.gas_cost).toFixed(2)}
            </p>
          )}
        </div>

        {/* right side */}
        <div className="poster-box">
          <div className="poster-header">
            <div className="poster-icon">👤</div>
            <h3>{posterName}</h3>
          </div>

          <div className="payment-links">
            <div className="payment-placeholder">
              {ride.payment_link || "Payment Link 1"}
            </div>
            <div className="payment-placeholder">Payment Link 2</div>
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
    </div>
  );
};

export default RideDetails;
