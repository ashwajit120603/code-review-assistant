const { getCodeReview } = require("../services/llmService");
const Report = require("../models/Report");
const mongoose = require("mongoose");

async function createReview(req, res) {
  try {
    const { files } = req.body;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: "No files provided" });
    }

    const processedFiles = files.map((f) => ({
      filename: f.filename || "unnamed",
      language: f.language || "unknown",
      content: (f.content || "").slice(0, 8000),
    }));

    const llmResult = await getCodeReview(processedFiles);

    const report = await Report.create(llmResult);

    return res.status(201).json({
      reportId: report._id,
      ...llmResult,
    });
  } catch (err) {
    console.error("Review error:", err.message);
    return res.status(500).json({ error: "Failed to generate review" });
  }
}

async function getReports(req, res) {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .select("summary scores createdAt");
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
}

async function getReportById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid report ID" });
    }

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch report" });
  }
}

module.exports = {
  createReview,
  getReports,
  getReportById,
};


