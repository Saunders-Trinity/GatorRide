import React from "react";
import "./postRide.css";

const PostRide = () => {
  return (
    <div className="postride-page">
      <header className="postride-header">
        <button className="return-btn">← Return</button>
        <div className="search-bar-container">
          <input type="text" className="search-bar" placeholder="Search for rides here" />
          <button className="search-btn">Search</button>
        </div>
      </header>

      {/* main content */}
      <main className="postride-content">
        <h1 className="post-title">POST NAME</h1>

        <div className="post-body">
          {/* left column (map + car info) */}
          <div className="left-column">
            <div className="map-box">Map</div>
            <div className="car-info">
              <h3>Car Info</h3>
              <p>Make: _______</p>
              <p>Model: _______</p>
              <p>Year: _______</p>
            </div>
          </div>

          {/* right column (ride details) */}
          <div className="right-column">
            <h3>Details</h3>
            <div className="detail-row">
              <label>Time:</label> <span>____ to ____</span>
            </div>
            <div className="detail-row">
              <label>Date:</label> <span>____ to ____</span>
            </div>
            <div className="detail-row">
              <label>Location:</label> <span>____ to ____</span>
            </div>
            <div className="detail-row">
              <label>Seats Avail:</label> <span># / #</span>
            </div>
            <div className="detail-row">
              <label>Cost:</label> <span>$ ____</span>
            </div>
            <button className="ride-share-btn">Ride Share</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostRide;
