const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");

// Get all ratings
router.get("/", ratingController.getAllRatings);

// Add a new rating
router.post("/", ratingController.addRating);

// Update a rating
router.put("/:id", ratingController.updateRating);

// Delete a rating
router.delete("/:id", ratingController.deleteRating);

module.exports = router;
