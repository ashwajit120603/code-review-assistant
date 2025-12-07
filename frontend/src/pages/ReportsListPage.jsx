import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReports } from "../api/reviewApi.js";
import Loader from "../components/Loader.jsx";

function ReportsListPage() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const data = await getReports();
        setReports(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load reports.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Saved Reports</h2>
        <Link to="/" className="text-sm text-slate-600 hover:underline">
          + New review
        </Link>
      </div>

      {isLoading && <Loader />}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
          {error}
        </p>
      )}

      {reports.length === 0 && !isLoading ? (
        <p className="text-sm text-slate-600">
          No reports yet. Run your first review!
        </p>
      ) : (
        <ul className="divide-y">
          {reports.map((report) => (
            <li key={report._id} className="py-3">
              <Link
                to={`/reports/${report._id}`}
                className="flex flex-col gap-1 hover:text-slate-900"
              >
                <span className="text-sm font-medium">{report.summary}</span>
                <span className="text-xs text-slate-500">
                  {new Date(report.createdAt).toLocaleString()}
                </span>
                {report.scores && (
                  <span className="text-xs text-slate-500">
                    Readability {report.scores.readability}/10 · Modularity{" "}
                    {report.scores.modularity}/10
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ReportsListPage;



