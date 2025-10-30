import React from "react";
import "./rideDetails.css";

const RideDetails = () => {
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
        </div>

        {/* right side */}
        <div className="poster-box">
          <div className="poster-header">
            <div className="poster-icon">👤</div>
            <h3>Poster</h3>
          </div>

          <div className="payment-links">
            <div className="payment-placeholder">Payment Link 1</div>
            <div className="payment-placeholder">Payment Link 2</div>
          </div>

          <div className="action-buttons">
            <button className="confirm-btn">Confirm</button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RideDetails;
