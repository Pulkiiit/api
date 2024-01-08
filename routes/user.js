const express = require("express");
const router = express.Router();
const createHandler = require("../controllers/createHandler");
const infoHandler = require("../controllers/infoHandler");
const listHandler = require("../controllers/listHandler");
const deleteHandler = require("../controllers/deleteHandler");

router.post("/create", createHandler);
router.get("/self", infoHandler);
router.get("/list", listHandler);
router.post("/delete/:userId", deleteHandler);

module.exports = router;
