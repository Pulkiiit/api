const express = require("express");
const router = express.Router();
const createHandler = require("../controllers/createHandler");
const infoHandler = require("../controllers/infoHandler");
const listHandler = require("../controllers/listHandler");

router.post("/create", createHandler);
router.get("/self", infoHandler);
router.get("/list", listHandler);

module.exports = router;
