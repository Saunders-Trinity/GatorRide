// frontend/src/pages/postRide/postRide.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./postRide.css";

const PostRide = ({ user }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [seats, setSeats] = useState(3);
  const [gasCost, setGasCost] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // --- Figure out the driver id ---

  // prefer the id that comes from React state
  // try user.user_id first; fall back to user.id if your backend uses that
  const driverIdFromUser = user?.user_id ?? user?.id ?? null;

  // fall back to localStorage (set in App.js after login/signup)
  const storedUserId = localStorage.getItem("user_id");
  const driverIdFromLS =
    storedUserId && storedUserId !== "undefined"
      ? Number(storedUserId)
      : null;

  // final driverId we’ll use
  const driverId = driverIdFromUser ?? driverIdFromLS;

  console.log("PostRide user:", user);
  console.log("driverIdFromUser:", driverIdFromUser);
  console.log("driverIdFromLS:", driverIdFromLS);
  console.log("driverId used:", driverId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!driverId) {
        setError("You must be logged in to post a ride.");
        setLoading(false);
        return;
      }

      const body = {
        driver_id: driverId,
        origin,
        destination,
        ride_date: rideDate, // "YYYY-MM-DD"
        ride_time: rideTime, // "HH:MM"
        available_seats: Number(seats),
        gas_cost: gasCost === "" ? null : Number(gasCost),
        // you can also send make/model/year here if your backend supports it
      };

      const res = await fetch("http://localhost:8000/api/rides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to post ride.");
      } else {
        setSuccess("Ride posted successfully!");
        const newId =
          data.ride_id || data.id || (data.ride && data.ride.ride_id);
        if (newId) {
          setTimeout(() => navigate(`/rides/${newId}`), 800);
        }
      }
    } catch (err) {
      console.error("Post ride error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="postride-page">
      <header className="postride-header">
        <Link to="/" className="return-btn">
          ← Return
        </Link>
      </header>

      {/* main content */}
      <main className="postride-content">
        <h1 className="post-title">Post a Ride</h1>

        <div className="post-body">
          {/* left column (map + car info) */}
          <div className="left-column">
            <div className="map-box">Map</div>

            <div className="car-info">
              <h3>Car Info</h3>
              <p>
                Make:{" "}
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  placeholder="Optional"
                />
              </p>
              <p>
                Model:{" "}
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Optional"
                />
              </p>
              <p>
                Year:{" "}
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Optional"
                />
              </p>
            </div>
          </div>

          {/* right column (ride details form) */}
          <div className="right-column">
            <h3>Details</h3>

            {driverId && (
              <p className="info">
                Posting as {user?.first_name || user?.email || "User"}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}

              <div className="detail-row">
                <label>Origin:</label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                />
              </div>

              <div className="detail-row">
                <label>Destination:</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div className="detail-row">
                <label>Date:</label>
                <input
                  type="date"
                  value={rideDate}
                  onChange={(e) => setRideDate(e.target.value)}
                  required
                />
              </div>

              <div className="detail-row">
                <label>Time:</label>
                <input
                  type="time"
                  value={rideTime}
                  onChange={(e) => setRideTime(e.target.value)}
                  required
                />
              </div>

              <div className="detail-row">
                <label>Seats Avail:</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                />
              </div>

              <div className="detail-row">
                <label>Cost ($):</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={gasCost}
                  onChange={(e) => setGasCost(e.target.value)}
                />
              </div>

              <button
                className="ride-share-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Posting..." : "Ride Share"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostRide;
