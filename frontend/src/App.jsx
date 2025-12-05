import { NavLink, Route, Routes } from "react-router-dom";
import NewReviewPage from "./pages/NewReviewPage.jsx";
import ReportsListPage from "./pages/ReportsListPage.jsx";
import ReportDetailPage from "./pages/ReportDetailPage.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-semibold text-lg">Code Review Assistant</h1>
          <nav className="space-x-4 text-sm">
            <NavLink to="/" end>
              New Review
            </NavLink>
            <NavLink to="/reports">Reports</NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<NewReviewPage />} />
          <Route path="/reports" element={<ReportsListPage />} />
          <Route path="/reports/:id" element={<ReportDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
