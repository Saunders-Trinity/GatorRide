USE gatorride;

-- Seats must be 0..8
ALTER TABLE rides
  ADD CONSTRAINT chk_rides_seats CHECK (available_seats BETWEEN 0 AND 8);

-- Score already has CHECK 1..5 in your schema 👍
