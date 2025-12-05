




// FileEditorForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

/**
 * Props:
 *  - file: { id, filename, language, content }
 *  - index: number
 *  - onChange(id, field, value)
 *  - onRemove(id)
 */
const LANG_OPTIONS = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "cpp",
  "go",
  "rust",
];

function FileEditorForm({ file, index, onChange, onRemove }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(file.content || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="border rounded-2xl p-4 bg-white shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 flex-wrap items-center">
            <input
              type="text"
              value={file.filename}
              onChange={(e) => onChange(file.id, "filename", e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder={`File ${index + 1} name (e.g. solution.js)`}
            />

            <select
              value={file.language}
              onChange={(e) => onChange(file.id, "language", e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none"
            >
              {LANG_OPTIONS.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => onRemove && onRemove(file.id)}
              title="Remove file"
              className="ml-2 inline-flex items-center gap-1 text-red-600 text-sm hover:underline"
            >
              <TrashIcon className="w-4 h-4" /> Remove
            </button>
          </div>

          <textarea
            value={file.content}
            onChange={(e) => onChange(file.id, "content", e.target.value)}
            rows={10}
            className="mt-3 w-full border rounded-lg px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-indigo-100"
            placeholder={`// Paste your code here...`}
          />
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 rounded-lg border text-sm hover:bg-slate-50"
          >
            {copied ? <CheckIcon className="w-4 h-4 text-green-600" /> : <ClipboardIcon className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </button>

          <div className="text-xs text-slate-500 mt-2">
            {file.content ? `${file.content.length} characters` : "Empty"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FileEditorForm;
