USE defaultdb;

DROP PROCEDURE IF EXISTS sp_post_ride;
DROP PROCEDURE IF EXISTS sp_edit_ride;
DROP PROCEDURE IF EXISTS sp_delete_ride;
DROP PROCEDURE IF EXISTS sp_book_seat;
DROP PROCEDURE IF EXISTS sp_cancel_booking;

DELIMITER $$

-- post a ride
CREATE PROCEDURE sp_post_ride(
  IN p_driver INT,
  IN p_origin VARCHAR(100), IN p_dest VARCHAR(100),
  IN p_date DATE, IN p_time TIME,
  IN p_seats INT, IN p_gas DECIMAL(6,2)
)
BEGIN
  INSERT INTO rides(driver_id, origin, destination, ride_date, ride_time, available_seats, gas_cost)
  VALUES (p_driver, p_origin, p_dest, p_date, p_time, p_seats, p_gas);
END$$

-- edit a ride (driver-only)
CREATE PROCEDURE sp_edit_ride(
  IN p_ride INT, IN p_driver INT,
  IN p_origin VARCHAR(100), IN p_dest VARCHAR(100),
  IN p_date DATE, IN p_time TIME,
  IN p_seats INT, IN p_gas DECIMAL(6,2)
)
BEGIN
  UPDATE rides
     SET origin = p_origin,
         destination = p_dest,
         ride_date = p_date,
         ride_time = p_time,
         available_seats = p_seats,
         gas_cost = p_gas
   WHERE ride_id = p_ride
     AND driver_id = p_driver;
END$$

-- delete a ride (driver-only)
CREATE PROCEDURE sp_delete_ride(
  IN p_ride INT, IN p_driver INT
)
BEGIN
  DELETE FROM rides
   WHERE ride_id = p_ride
     AND driver_id = p_driver;
END$$

-- book seats safely
CREATE PROCEDURE sp_book_seat(
  IN p_ride INT, IN p_passenger INT, IN p_seats INT
)
BEGIN
  -- cannot book your own ride
  IF (SELECT driver_id FROM rides WHERE ride_id = p_ride) = p_passenger THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Driver cannot book own ride';
  END IF;

  -- enough seats?
  IF (SELECT available_seats FROM rides WHERE ride_id = p_ride) < p_seats THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Not enough seats available';
  END IF;

  INSERT INTO bookings(ride_id, passenger_id, seats_reserved)
  VALUES (p_ride, p_passenger, p_seats);

  UPDATE rides
     SET available_seats = available_seats - p_seats
   WHERE ride_id = p_ride;
END$$

-- cancel booking -> seats return
CREATE PROCEDURE sp_cancel_booking(
  IN p_booking INT, IN p_user INT
)
BEGIN
  -- only the passenger who booked can cancel
  IF (SELECT passenger_id FROM bookings WHERE booking_id = p_booking) <> p_user THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Only the booking owner can cancel';
  END IF;

  UPDATE rides r
  JOIN bookings b ON b.ride_id = r.ride_id
     SET r.available_seats = r.available_seats + b.seats_reserved
   WHERE b.booking_id = p_booking;

  DELETE FROM bookings
   WHERE booking_id = p_booking;
END$$

DELIMITER ;
