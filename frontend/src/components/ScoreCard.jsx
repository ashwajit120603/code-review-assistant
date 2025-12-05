



// ScoreCard.jsx
import React from "react";
import { motion } from "framer-motion";

function getGradientForScore(score) {
  // returns CSS gradient based on score 0-10
  if (score >= 8) return "bg-gradient-to-r from-green-400 to-green-600";
  if (score >= 5) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
  return "bg-gradient-to-r from-red-400 to-red-600";
}

function ScoreCard({ label, value }) {
  const normalized = Math.max(0, Math.min(10, value || 0));
  const pct = (normalized / 10) * 100;
  const gradientClass = getGradientForScore(normalized);

  return (
    <div className="border rounded-xl p-3 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-semibold">{normalized}/10</p>
      </div>

      <div className="mt-3 h-3 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7 }}
          className={`h-full ${gradientClass}`}
        />
      </div>
    </div>
  );
}

export default ScoreCard;
