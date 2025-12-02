-- GatorRide seed data for defaultdb

USE defaultdb;

-- Seed users
-- Note: password_hash uses a valid bcrypt hash string.
-- These are mainly for demo data (rides/bookings); you will typically
-- log in using accounts created through the app's /register flow.

INSERT INTO users (first_name, last_name, email, phone, password_hash) VALUES
('Nada',    'Elseifi',  'nada@ufl.edu',    '555-1111', '$2b$10$KYVbZ5JFVfqu0oV98LnF5eTk4QTe2e4PQG7QNYfhumEpGdi/867AO'),
('Trinity', 'Saunders', 'trinity@ufl.edu', '555-2222', '$2b$10$KYVbZ5JFVfqu0oV98LnF5eTk4QTe2e4PQG7QNYfhumEpGdi/867AO'),
('Rylee',   'Brown',    'rylee@ufl.edu',   '555-3333', '$2b$10$KYVbZ5JFVfqu0oV98LnF5eTk4QTe2e4PQG7QNYfhumEpGdi/867AO'),
('Karla',   'Tran',     'karla@ufl.edu',   '555-4444', '$2b$10$KYVbZ5JFVfqu0oV98LnF5eTk4QTe2e4PQG7QNYfhumEpGdi/867AO'),
('Alex',    'Driver',   'alex@ufl.edu',    '555-5555', '$2b$10$KYVbZ5JFVfqu0oV98LnF5eTk4QTe2e4PQG7QNYfhumEpGdi/867AO');

-- Seed rides
INSERT INTO rides (driver_id, origin, destination, ride_date, ride_time, available_seats, gas_cost) VALUES
(1, 'UF Reitz',      'Butler Plaza',     DATE_ADD(CURDATE(), INTERVAL 3 DAY), '15:00', 3, 6.50),
(2, 'Library West',  'Oaks Mall',        DATE_ADD(CURDATE(), INTERVAL 4 DAY), '12:30', 2, 5.25),
(5, 'Newell',        'Airport',          DATE_ADD(CURDATE(), INTERVAL 2 DAY), '09:00', 4, 8.00),
(1, 'Hub',           'Target Archer',    DATE_ADD(CURDATE(), INTERVAL 1 DAY), '18:10', 3, 4.75);

-- Seed bookings
INSERT INTO bookings (ride_id, passenger_id, seats_reserved) VALUES
(1, 3, 1),
(2, 4, 1);
