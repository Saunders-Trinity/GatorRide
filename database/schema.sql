-- GatorRide Schema (drop & recreate cleanly)
DROP DATABASE IF EXISTS gatorride;
CREATE DATABASE gatorride;
USE gatorride;

-- USERS: UF students & drivers
CREATE TABLE users (
  user_id     INT AUTO_INCREMENT PRIMARY KEY,
  first_name  VARCHAR(50)  NOT NULL,
  last_name   VARCHAR(50)  NOT NULL,
  email       VARCHAR(100) NOT NULL UNIQUE,
  phone         VARCHAR(20),
  payment_link  VARCHAR(255) NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('User','Admin') NOT NULL DEFAULT 'User',
  rating        DECIMAL(2,1) DEFAULT 5.0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- RIDES: listings posted by drivers
CREATE TABLE rides (
  ride_id         INT AUTO_INCREMENT PRIMARY KEY,
  driver_id       INT NOT NULL,
  origin          VARCHAR(100) NOT NULL,
  destination     VARCHAR(100) NOT NULL,
  ride_date       DATE NOT NULL,
  ride_time       TIME NOT NULL,
  available_seats INT DEFAULT 3,
  gas_cost        DECIMAL(6,2),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rides_driver
    FOREIGN KEY (driver_id) REFERENCES users(user_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- BOOKINGS: passengers reserving seats
CREATE TABLE bookings (
  booking_id     INT AUTO_INCREMENT PRIMARY KEY,
  ride_id        INT NOT NULL,
  passenger_id   INT NOT NULL,
  seats_reserved INT DEFAULT 1,
  booked_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_ride
    FOREIGN KEY (ride_id) REFERENCES rides(ride_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_bookings_passenger
    FOREIGN KEY (passenger_id) REFERENCES users(user_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- RATINGS: feedback after a ride
CREATE TABLE ratings (
  rating_id   INT AUTO_INCREMENT PRIMARY KEY,
  ride_id     INT NOT NULL,
  reviewer_id INT NOT NULL,
  reviewee_id INT NOT NULL,
  score       INT NOT NULL CHECK (score BETWEEN 1 AND 5),
  comment     VARCHAR(255),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ratings_ride
    FOREIGN KEY (ride_id) REFERENCES rides(ride_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_ratings_reviewer
    FOREIGN KEY (reviewer_id) REFERENCES users(user_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_ratings_reviewee
    FOREIGN KEY (reviewee_id) REFERENCES users(user_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- REPORTS: safety/misconduct reports
CREATE TABLE reports (
  report_id        INT AUTO_INCREMENT PRIMARY KEY,
  reporter_id      INT NOT NULL,
  reported_user_id INT NOT NULL,
  reason           VARCHAR(255),
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reports_reporter
    FOREIGN KEY (reporter_id) REFERENCES users(user_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_reports_reported
    FOREIGN KEY (reported_user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- Useful indexes
CREATE INDEX idx_rides_date_time ON rides (ride_date, ride_time);
CREATE INDEX idx_rides_origin_dest ON rides (origin, destination);


