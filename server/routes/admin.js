const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { getAllRatings, getAverageRatings } = require("../controllers/ratingController");
const { auth } = require("../middlewares/auth");


router.get("/dashboard", auth(["ADMIN"]), adminController.dashboard);

router.get("/users", auth(["ADMIN"]), adminController.getUsers);
router.post("/users", auth(["ADMIN"]), adminController.createUser);


router.get("/stores", auth(["ADMIN"]), adminController.getStores);
router.post("/stores", auth(["ADMIN"]), adminController.createStore);


router.get("/ratings", auth(["ADMIN"]), getAllRatings);


router.get("/average-ratings", auth(["ADMIN"]), getAverageRatings);

module.exports = router;
