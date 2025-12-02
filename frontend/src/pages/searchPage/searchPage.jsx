import React, { useState } from "react";
import "./searchPage.css";
import { Link } from "react-router-dom";
import RideCard from "../../components/RideCard/RideCard";  

// Connects search page to backend rides endpoint with query params
const SearchPage = () => {
  const [query, setQuery] = useState(""); // main search text
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [seats, setSeats] = useState(1);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      
      const params = new URLSearchParams();

      if (query) params.append("q", query);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (seats) params.append("seats", seats);

      const response = await fetch(
        `http://localhost:8000/api/rides?${params.toString()}`
      );

      const data = await response.json();

      if (response.ok) {
        setResults(Array.isArray(data) ? data : data.rides || []);
      } else {
        setError(data.error || "Search failed.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <form className="search-bar-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search for rides here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn" type="submit">
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </header>

      <div className="search-body">
        <aside className="filters">
          <h3>Filters</h3>

          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <label>Seats</label>
          <input
            type="number"
            min="1"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />

          <button className="filter-btn" onClick={handleSearch}>
          Apply Filters
          </button>
        </aside>

        <main className="ride-results">
          {error && <p className="error">{error}</p>}
          {!error && results.length === 0 && !loading && (
            <p>No rides yet. Try searching for a trip.</p>
          )}

          <div className="ride-cards-container">
            {results.map((ride) => (
              <RideCard key={ride.ride_id} ride={ride} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
