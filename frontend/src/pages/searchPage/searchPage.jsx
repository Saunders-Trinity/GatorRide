import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./searchPage.css";

//this is a bare skeleton with no dummy data, i didn't want to mess with the database bc i'm scared
const SearchPage = () => {
    //backend connection here i think, we can do this later

    return(
        <div className="search-page">
            <header className="search-header">
                <div className="search-bar-container">
                    <input type="text" className="search-bar" placeholder="Search for rides here" />
                    <button className="search-btn">Search</button>
                </div>
            </header>

            <div className="search-body">
                <aside className="filters">
                    <h3>Filters</h3>
                    <label>Start Date</label>
                    <input type="date" />
                    <label>End Date</label>
                    <input type="date" />
                    <label>Seats</label>
                    <input type="number" min="1" />
                </aside>

                <main className="ride-results">
                    <p>No rides yet, this is just a skeleton layout.</p>
                </main>
            </div>
        </div>
    );
};

export default SearchPage;
