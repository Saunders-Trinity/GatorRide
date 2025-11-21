-- GatorRide extra constraints for defaultdb

USE defaultdb;

-- Seats must be between 0 and 8 (inclusive)
ALTER TABLE rides
  ADD CONSTRAINT chk_rides_seats
  CHECK (available_seats BETWEEN 0 AND 8);

-- Note: ratings.score already has CHECK (score BETWEEN 1 AND 5)
-- in schema.sql, so no extra constraint is needed here.
