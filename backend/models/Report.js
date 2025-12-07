const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  line: Number,
  type: String,
  message: String,
  suggestion: String,
  severity: String,
});

const FileReviewSchema = new mongoose.Schema({
  filename: String,
  comments: [CommentSchema],
});

const ReportSchema = new mongoose.Schema(
  {
    summary: String,
    scores: {
      readability: Number,
      modularity: Number,
      potentialBugs: Number,
      bestPractices: Number,
    },
    complexity: {
      overallTime: String,
      overallSpace: String,
      notes: String,
    },
    fileReviews: [FileReviewSchema],
    globalSuggestions: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);



