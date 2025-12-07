
// NewReviewPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createReview } from "../api/reviewApi.js";
import FileEditorForm from "../components/FileEditorForm.jsx";
import ReviewResult from "../components/ReviewResult.jsx";
import Loader from "../components/Loader.jsx";

function NewReviewPage() {
  const [files, setFiles] = useState([
    { id: Date.now(), filename: "main.js", language: "javascript", content: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [error, setError] = useState("");
  const resultRef = useRef(null);

  useEffect(() => {
    if (review && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [review]);

  const handleFileChange = (id, field, value) => {
    setFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, [field]: value } : file))
    );
  };

  const addFile = () => {
    setFiles((prev) => [
      ...prev,
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        filename: `file-${prev.length + 1}.js`,
        language: "javascript",
        content: "",
      },
    ]);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setError("");
    setReview(null);

    const cleanedFiles = files
      .filter((file) => file.content.trim().length > 0)
      .map(({ filename, language, content }) => ({
        filename,
        language,
        content,
      }));

    if (cleanedFiles.length === 0) {
      setError("Please add at least one file with content.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await createReview(cleanedFiles);
      setReview(result);
    } catch (err) {
      console.error(err);
      setError(
        err?.message ||
          err?.response?.data?.error ||
          "Failed to generate review. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <header className="w-full bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              CR
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-800">
                Code Review Assistant
              </h1>
              <p className="text-xs text-slate-500">
                AI-powered code feedback
              </p>
            </div>
          </div>

          <nav className="text-sm text-slate-600 hidden md:flex items-center gap-4">
            <a href="/" className="hover:text-slate-900">
              New review
            </a>
            <a href="/reports" className="hover:text-slate-900">
              Reports
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN PAGE */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* ===== BRIGHT HERO CARD ===== */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border bg-white shadow-md px-6 py-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* LEFT */}
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                AI Code Review Workspace
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Paste your code, run an AI-powered review, and instantly get 
                suggestions, readability scores, complexity analysis, security warnings,
                and file-level comments.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-[12px] font-medium text-indigo-700 border border-indigo-200">
                  <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                  LLM-powered real-time analysis
                </span>

                <span className="text-xs text-slate-500">
                  Supports multiple languages
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden md:flex items-center justify-center">
              <div className="rounded-xl bg-slate-50 border border-slate-200 px-6 py-5 shadow-sm">
                <div className="font-mono text-xs text-slate-700">
                  &gt; npm run analyze
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  Instant feedback • Quality scores • Suggestions
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== WORKSPACE GRID ===== */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* LEFT PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-white rounded-xl shadow-sm p-4 md:p-5 flex flex-col"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-base font-semibold">Source files</h3>
                <p className="text-xs text-slate-500">
                  Add multiple files for a better, more accurate review.
                </p>
              </div>
              <button
                type="button"
                onClick={addFile}
                className="text-xs border rounded-full px-3 py-1 text-slate-700 hover:bg-slate-50"
              >
                + Add file
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3">
              <div className="space-y-3 overflow-y-auto pr-1">
                {files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <FileEditorForm
                      file={file}
                      index={index}
                      onChange={handleFileChange}
                      onRemove={
                        files.length > 1 ? () => removeFile(file.id) : null
                      }
                    />
                  </motion.div>
                ))}
              </div>

              {error && (
                <div className="mt-2">
                  <p className="text-xs md:text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
                    {error}
                  </p>
                </div>
              )}

              {/* RUN BUTTON AT BOTTOM */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Ready to run?
                </div>

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="ml-auto w-full md:w-auto px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow hover:bg-indigo-700 disabled:opacity-60"
                >
                  {isLoading ? "Running review..." : "Run Code Review"}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            ref={resultRef}
            className="bg-white rounded-xl shadow-sm p-4 md:p-5 flex flex-col min-h-[220px]"
          >
            <div className="mb-3">
              <h3 className="text-base font-semibold">Review result</h3>
              <p className="text-xs text-slate-500">
                Output will appear here after running the review.
              </p>
            </div>

            {isLoading && (
              <div className="flex-1 flex items-center justify-center">
                <Loader />
              </div>
            )}

            {!isLoading && !review && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-xs md:text-sm text-slate-500 text-center max-w-xs">
                  Paste your code on the left and click{" "}
                  <span className="font-semibold">Run Code Review</span> to
                  generate analysis.
                </p>
              </div>
            )}

            {!isLoading && review && (
              <div className="mt-1">
                <ReviewResult review={review} />
              </div>
            )}
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default NewReviewPage;
