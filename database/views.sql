USE gatorride;

-- Upcoming, open rides with driver name
CREATE OR REPLACE VIEW v_available_rides AS
SELECT r.ride_id,
       CONCAT(u.first_name,' ',u.last_name) AS driver_name,
       r.origin, r.destination, r.ride_date, r.ride_time,
       r.available_seats, r.gas_cost
FROM rides r
JOIN users u ON u.user_id = r.driver_id
WHERE (r.ride_date > CURDATE()
       OR (r.ride_date = CURDATE() AND r.ride_time > CURTIME()))
  AND r.available_seats > 0
ORDER BY r.ride_date, r.ride_time;

-- One-row per user: rides posted, seats offered, avg rating
CREATE OR REPLACE VIEW v_user_profile_summary AS
SELECT u.user_id,
       CONCAT(u.first_name,' ',u.last_name) AS full_name,
       u.email, u.phone,
       COUNT(DISTINCT r.ride_id)      AS rides_posted,
       COALESCE(SUM(r.available_seats),0) AS seats_currently_open,
       ROUND(AVG(CASE WHEN ra.reviewee_id=u.user_id THEN ra.score END),2) AS avg_rating
FROM users u
LEFT JOIN rides r ON r.driver_id = u.user_id
LEFT JOIN ratings ra ON ra.reviewee_id = u.user_id
GROUP BY u.user_id, full_name, u.email, u.phone;
