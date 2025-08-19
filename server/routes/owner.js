const router = require("express").Router();
const { getOwnerRatings } = require("../controllers/ownerController");
const { auth } = require("../middlewares/auth");

// Owner Dashboard API
router.get("/ratings", auth(["OWNER"]), getOwnerRatings);

module.exports = router;
