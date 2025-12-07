const express = require("express");
const {
  createReview,
  getReports,
  getReportById,
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/", createReview);
router.get("/", getReports);
router.get("/:id", getReportById);

module.exports = router;



