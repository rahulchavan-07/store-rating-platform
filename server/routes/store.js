const router = require("express").Router();
const storeController = require("../controllers/storeController");
const { auth } = require("../middlewares/auth");

// List stores with avg + user rating

router.get("/", auth(["USER", "OWNER", "ADMIN"]), storeController.listStores);

module.exports = router;
