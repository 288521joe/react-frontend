import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ResultsPage.jsx
 *
 * Features:
 * - Date filter
 * - Status filter (All / OK / NG)
 * - Search box
 * - Sorting by column (click header)
 * - Export CSV and PDF (opens backend endpoint)
 * - Pagination (client-side)
 * - Back button to dashboard
 *
 * Backend endpoints used:
 * - GET /results?date=YYYY-MM-DD&status=&search=&sort=<col>&order=ASC|DESC
 * - GET /export_results?date=YYYY-MM-DD  (downloads CSV)
 * - GET /export_results_pdf?date=YYYY-MM-DD (downloads PDF)
 */

export default function ResultsPage() {
  const navigate = useNavigate();

  // filters / ui state
  const [date, setDate] = useState(() => {
    // default to today's date in yyyy-mm-dd
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  });
  const [status, setStatus] = useState(""); // ""=all, "OK", "NG"
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(50);

  // data + loading
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // sorting
  const [sortBy, setSortBy] = useState("timestamp");
  const [order, setOrder] = useState("DESC");

  // pagination
  const [page, setPage] = useState(1);

  // fetch results from backend
  const fetchResults = async (opts = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        date: opts.date ?? date,
        status: opts.status ?? status,
        search: opts.search ?? search,
        sort: opts.sort ?? sortBy,
        order: opts.order ?? order,
      });

      const res = await fetch(`/results?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const json = await res.json();

      // backend expected shape: { columns: [...], rows: [...] }
      setColumns(json.columns || []);
      setRows(json.rows || []);
      setPage(1);
    } catch (err) {
      console.error("fetchResults error", err);
      setError(err.message || "Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  // initial load and when filters / sorting change
  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, status, sortBy, order]);

  // derived: sorted/paginated rows (the backend already sorts, but we paginate client-side)
  const paginated = useMemo(() => {
    const total = rows.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const p = Math.min(Math.max(1, page), pages);
    const start = (p - 1) * pageSize;
    const end = start + pageSize;
    return {
      rows: rows.slice(start, end),
      total,
      pages,
      page: p,
      start,
      end: Math.min(end, total),
    };
  }, [rows, page, pageSize]);

  // header click toggles sorting
  const headerClick = (col) => {
    if (sortBy === col) {
      setOrder((o) => (o === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(col);
      setOrder("DESC");
    }
  };

  // export helpers: open backend export endpoints in new tab
  const exportCSV = () => {
    const params = new URLSearchParams({ date });
    window.open(`/export_results?${params.toString()}`, "_blank");
  };
  const exportPDF = () => {
    const params = new URLSearchParams({ date });
    window.open(`/export_results_pdf?${params.toString()}`, "_blank");
  };

  // UI small helpers
  const goBack = () => navigate("/");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Results</h1>
            <p className="text-sm text-gray-500 mt-1">NG / OK records for selected date</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goBack}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
            >
              ← Dashboard
            </button>

            <button
              onClick={exportCSV}
              className="bg-white border px-3 py-2 rounded-lg hover:shadow"
            >
              Export CSV
            </button>

            <button
              onClick={exportPDF}
              className="bg-white border px-3 py-2 rounded-lg hover:shadow"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center md:gap-4 gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="">All</option>
              <option value="OK">OK</option>
              <option value="NG">NG</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <input
              type="search"
              placeholder="Search (QR ID, serial, operator...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") fetchResults({ date, status, search });
              }}
              className="w-full border px-3 py-2 rounded-lg"
            />
            <button
              onClick={() => fetchResults({ date, status, search })}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Search
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Page size</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border px-2 py-2 rounded-lg"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">Error: {error}</div>
          ) : (
            <>
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    {columns.length > 0 ? (
                      columns.map((col) => (
                        <th
                          key={col}
                          className="text-left px-4 py-3 text-sm font-medium text-gray-600 cursor-pointer select-none"
                          onClick={() => headerClick(col)}
                        >
                          <div className="flex items-center gap-2">
                            <span>{col}</span>
                            {sortBy === col && (
                              <span className="text-xs text-gray-500">
                                {order === "ASC" ? "▲" : "▼"}
                              </span>
                            )}
                          </div>
                        </th>
                      ))
                    ) : (
                      <th className="px-4 py-3 text-sm text-gray-600">No columns</th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {paginated.rows.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length || 1} className="p-6 text-center text-gray-500">
                        No records for selected filters
                      </td>
                    </tr>
                  ) : (
                    paginated.rows.map((r, idx) => (
                      <tr
                        key={idx}
                        className="border-t hover:bg-gray-50"
                      >
                        {columns.map((col) => (
                          <td key={col} className="px-4 py-3 text-sm text-gray-700 align-top">
                            {/* backend row may be object; render cell by key or render string */}
                            {renderCell(r, col)}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <div className="text-sm text-gray-600">
                  Showing {paginated.start + 1} - {paginated.end} of {paginated.total}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={paginated.page <= 1}
                  >
                    Prev
                  </button>
                  <span className="px-2 text-sm">Page {paginated.page} / {paginated.pages}</span>
                  <button
                    onClick={() => setPage((p) => Math.min(paginated.pages, p + 1))}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={paginated.page >= paginated.pages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // helper to render cells - handles basic types
  function renderCell(row, col) {
    // if row is array, try to preserve order: backend likely uses objects, but handle both
    if (Array.isArray(row)) {
      // assume columns order matches array order
      const idx = columns.indexOf(col);
      return row[idx] ?? "";
    }

    // if it's an object, return the value at col key (case-insensitive fallback)
    if (typeof row === "object" && row !== null) {
      if (col in row) return row[col];
      // try lowercase match
      const lowerKey = Object.keys(row).find((k) => k.toLowerCase() === col.toLowerCase());
      if (lowerKey) return row[lowerKey];
      // fallback: JSON string
      return JSON.stringify(row);
    }

    return row ?? "";
  }
}
