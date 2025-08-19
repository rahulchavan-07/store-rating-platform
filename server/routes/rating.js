const router = require("express").Router();
const ratingController = require("../controllers/ratingController");
const { auth } = require("../middlewares/auth");

// Submit or update rating

router.post("/", auth(["USER", "OWNER", "ADMIN"]), ratingController.submitRating);

//Average ratings

router.get("/average/all", ratingController.getAverageRatings);

router.get("/average/:store_id", ratingController.getAverageRatingForStore);

// Get rating of logged-in user for a store

router.get("/:store_id", auth(["USER", "OWNER", "ADMIN"]), ratingController.getUserRating);

module.exports = router;
