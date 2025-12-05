import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReportById } from "../api/reviewApi.js";
import Loader from "../components/Loader.jsx";
import ReviewResult from "../components/ReviewResult.jsx";

function ReportDetailPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        const data = await getReportById(id);
        setReport(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load report.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  return (
    <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Report Detail</h2>
          <p className="text-xs text-slate-500">ID: {id}</p>
        </div>
        <div className="space-x-3 text-sm">
          <Link to="/reports" className="text-slate-600 hover:underline">
            Back to list
          </Link>
          <Link to="/" className="text-slate-600 hover:underline">
            New review
          </Link>
        </div>
      </div>

      {isLoading && <Loader />}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
          {error}
        </p>
      )}

      {report && <ReviewResult review={report} />}
    </section>
  );
}

export default ReportDetailPage;



