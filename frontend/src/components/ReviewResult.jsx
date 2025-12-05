


// ReviewResult.jsx
import React, { useState } from "react";
import ScoreCard from "./ScoreCard";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";

function FilePanel({ file }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100"
      >
        <div>
          <div className="text-sm font-medium">{file.filename}</div>
          <div className="text-xs text-slate-500">{file.comments?.length ?? 0} issues</div>
        </div>
        <div className="text-xs text-indigo-600">{open ? "Hide" : "View"}</div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="px-4 py-3 bg-white"
          >
            {file.comments && file.comments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-2 py-2 text-left">Line</th>
                      <th className="px-2 py-2 text-left">Type</th>
                      <th className="px-2 py-2 text-left">Severity</th>
                      <th className="px-2 py-2 text-left">Issue</th>
                      <th className="px-2 py-2 text-left">Suggestion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {file.comments.map((c, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="px-2 py-2">{c.line ?? "-"}</td>
                        <td className="px-2 py-2 capitalize">{c.type}</td>
                        <td className="px-2 py-2 capitalize">{c.severity || "-"}</td>
                        <td className="px-2 py-2">{c.message}</td>
                        <td className="px-2 py-2">{c.suggestion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-sm text-slate-500">No comments found for this file.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReviewResult({ review, loading }) {
  if (loading) {
    return (
      <div className="w-full py-8 flex justify-center">
        <Loader text="Generating review..." />
      </div>
    );
  }

  if (!review) {
    return <div className="text-sm text-slate-500">No review data.</div>;
  }

  const {
    summary,
    scores,
    complexity,
    fileReviews = [],
    globalSuggestions = [],
    reportId,
  } = review;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Review Report</h2>
          {reportId && <p className="text-xs text-slate-500">Report ID: {reportId}</p>}
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => navigator.clipboard.writeText(JSON.stringify(review, null, 2))}
            className="px-3 py-2 text-sm rounded-lg border hover:bg-slate-50"
          >
            Copy JSON
          </button>
        </div>
      </div>

      {summary && <p className="text-sm text-slate-700">{summary}</p>}

      {scores && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <ScoreCard label="Readability" value={scores.readability} />
          <ScoreCard label="Modularity" value={scores.modularity} />
          <ScoreCard label="Potential Bugs" value={scores.potentialBugs} />
          <ScoreCard label="Best Practices" value={scores.bestPractices} />
        </div>
      )}

      {complexity && (complexity.overallTime || complexity.overallSpace) && (
        <div className="border rounded-xl p-4 bg-slate-50 text-sm">
          <h3 className="font-semibold mb-2">Time & Space Complexity</h3>
          {complexity.overallTime && (
            <p>
              <span className="font-medium">Time:</span> {complexity.overallTime}
            </p>
          )}
          {complexity.overallSpace && (
            <p>
              <span className="font-medium">Space:</span> {complexity.overallSpace}
            </p>
          )}
          {complexity.notes && <p className="text-slate-600 mt-2">{complexity.notes}</p>}
        </div>
      )}

      {fileReviews.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">File-wise comments</h3>
          <div className="grid gap-3">
            {fileReviews.map((f) => (
              <FilePanel key={f.filename} file={f} />
            ))}
          </div>
        </div>
      )}

      {globalSuggestions.length > 0 && (
        <div className="border rounded-xl p-4 bg-white">
          <h3 className="text-sm font-semibold">Global suggestions</h3>
          <ul className="list-disc ml-5 mt-2 text-sm">
            {globalSuggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
