import React from "react";
import { Link } from "react-router-dom";
import "./RideCard.css";

const RideCard = ({ ride }) => {
  const date = new Date(ride.ride_date);
  const dateStr = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeStr = ride.ride_time?.slice(0, 5);

  return (
    <Link to={`/rides/${ride.ride_id}`} className="ride-card">
      <div className="ride-card-header">
        <h3>
          {ride.origin} → {ride.destination}
        </h3>
      </div>

      <div className="ride-card-body">
        <p>
          <strong>Date:</strong> {dateStr}
        </p>
        <p>
          <strong>Time:</strong> {timeStr}
        </p>
        <p>
          <strong>Seats Available:</strong> {ride.available_seats}
        </p>
      </div>
    </Link>
  );
};

export default RideCard;
