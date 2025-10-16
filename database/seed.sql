USE gatorride;

INSERT INTO users (first_name,last_name,email,phone) VALUES
('Nada','Elseifi','nada@ufl.edu','555-1111'),
('Trinity','Saunders','trinity@ufl.edu','555-2222'),
('Rylee','Brown','rylee@ufl.edu','555-3333'),
('Karla','Tran','karla@ufl.edu','555-4444'),
('Alex','Driver','alex@ufl.edu','555-5555');

INSERT INTO rides (driver_id,origin,destination,ride_date,ride_time,available_seats,gas_cost) VALUES
(1,'UF Reitz','Butler Plaza',      DATE_ADD(CURDATE(), INTERVAL 3 DAY),'15:00',3,6.50),
(2,'Library West','Oaks Mall',      DATE_ADD(CURDATE(), INTERVAL 4 DAY),'12:30',2,5.25),
(5,'Newell','Airport',              DATE_ADD(CURDATE(), INTERVAL 2 DAY),'09:00',4,8.00),
(1,'Hub','Target Archer',           DATE_ADD(CURDATE(), INTERVAL 1 DAY),'18:10',3,4.75);

-- A couple of bookings
INSERT INTO bookings (ride_id, passenger_id, seats_reserved) VALUES
(1,3,1),(2,4,1);
