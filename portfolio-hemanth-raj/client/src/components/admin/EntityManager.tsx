import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Search, Filter, AlertTriangle } from "lucide-react";
import { api, ApiClientError } from "@/lib/api";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";
import { useFetch } from "@/hooks/useFetch";
import type { FieldConfig } from "./fieldConfig";
import { parseTags } from "./fieldConfig";

interface EntityManagerProps<T extends { _id: string }> {
  title: string;
  endpoint: string; // e.g. "/skills"
  fields: FieldConfig[];
  renderTitle: (item: T) => string;
  renderSubtitle?: (item: T) => string;
}

export default function EntityManager<T extends { _id: string }>({
  title,
  endpoint,
  fields,
  renderTitle,
  renderSubtitle,
}: EntityManagerProps<T>) {
  const { data, loading, error, retry } = useFetch<T[]>(() => api.get<T[]>(endpoint), [endpoint]);
  const [editing, setEditing] = useState<T | "new" | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);

  // Escape key handler for modals
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (editing) closeForm();
        if (deleteTarget) setDeleteTarget(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editing, deleteTarget]);

  // Extract available categories if any field is named 'category'
  const categoryField = fields.find((f) => f.key === "category");
  const availableCategories = categoryField?.options || [];

  // Filtered dataset
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      const itemRecord = item as unknown as Record<string, unknown>;
      // Search match
      const titleMatch = renderTitle(item).toLowerCase().includes(searchQuery.toLowerCase());
      const subMatch = renderSubtitle ? renderSubtitle(item).toLowerCase().includes(searchQuery.toLowerCase()) : false;
      const matchesSearch = !searchQuery || titleMatch || subMatch;

      // Category match
      const itemCategory = String(itemRecord.category || "");
      const matchesCategory = selectedCategory === "all" || itemCategory === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchQuery, selectedCategory, renderTitle, renderSubtitle]);

  function openNew() {
    const initial: Record<string, unknown> = {};
    fields.forEach((f) => {
      initial[f.key] = f.type === "checkbox" ? false : f.type === "tags" ? "" : "";
    });
    setFormValues(initial);
    setEditing("new");
    setFormError(null);
  }

  function openEdit(item: T) {
    const initial: Record<string, unknown> = {};
    fields.forEach((f) => {
      const raw = (item as unknown as Record<string, unknown>)[f.key];
      initial[f.key] = f.type === "tags" ? (Array.isArray(raw) ? (raw as string[]).join(", ") : "") : raw ?? "";
    });
    setFormValues(initial);
    setEditing(item);
    setFormError(null);
  }

  function closeForm() {
    setEditing(null);
    setFormError(null);
  }

  async function handleSave() {
    setSaving(true);
    setFormError(null);
    try {
      const payload: Record<string, unknown> = {};
      fields.forEach((f) => {
        const v = formValues[f.key];
        if (f.type === "tags") {
          payload[f.key] = parseTags(String(v ?? ""));
        } else if (f.type === "number") {
          payload[f.key] = v === "" ? undefined : Number(v);
        } else {
          payload[f.key] = v;
        }
      });

      if (editing === "new") {
        await api.post(endpoint, payload);
      } else if (editing) {
        await api.put(`${endpoint}/${editing._id}`, payload);
      }
      closeForm();
      retry();
    } catch (err) {
      setFormError(err instanceof ApiClientError ? err.message : "Failed to save. Please check the fields.");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await api.delete(`${endpoint}/${deleteTarget._id}`);
      setDeleteTarget(null);
      retry();
    } catch (err) {
      alert(err instanceof ApiClientError ? err.message : "Failed to delete.");
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Total items: {data?.length ?? 0}</p>
        </div>

        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add {title.slice(0, -1)}
        </button>
      </div>

      {/* Search and Category Filter Bar */}
      {data && data.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {availableCategories.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Categories</option>
                {availableCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {loading && <LoadingState label={`Loading ${title.toLowerCase()}...`} />}
      {error && <ErrorState message={`Unable to load ${title.toLowerCase()}.`} onRetry={retry} />}
      {!loading && !error && (data?.length ?? 0) === 0 && <EmptyState label={`No ${title.toLowerCase()} yet.`} />}
      {!loading && !error && (data?.length ?? 0) > 0 && filteredData.length === 0 && (
        <EmptyState label={`No matching ${title.toLowerCase()} found.`} />
      )}

      {!loading && !error && filteredData.length > 0 && (
        <div className="space-y-2">
          {filteredData.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                  {renderTitle(item)}
                </p>
                {renderSubtitle && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{renderSubtitle(item)}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                  aria-label="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Confirm Delete</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Are you sure you want to delete <span className="font-bold">{renderTitle(deleteTarget)}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Create Form Modal */}
      {editing && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-6"
          onClick={closeForm}
        >
          <div
            className="w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900 dark:text-white">
                {editing === "new" ? `Add ${title.slice(0, -1)}` : `Edit ${title.slice(0, -1)}`}
              </h3>
              <button onClick={closeForm} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  {f.type !== "checkbox" && (
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {f.label}
                      {f.required && <span className="text-red-500"> *</span>}
                    </label>
                  )}

                  {f.type === "textarea" && (
                    <textarea
                      rows={3}
                      value={String(formValues[f.key] ?? "")}
                      onChange={(e) => setFormValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  )}

                  {(f.type === "text" || f.type === "number") && (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      value={String(formValues[f.key] ?? "")}
                      onChange={(e) => setFormValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  )}

                  {f.type === "tags" && (
                    <input
                      type="text"
                      value={String(formValues[f.key] ?? "")}
                      onChange={(e) => setFormValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      placeholder={f.placeholder || "Comma-separated values"}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  )}

                  {f.type === "select" && (
                    <select
                      value={String(formValues[f.key] ?? "")}
                      onChange={(e) => setFormValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Select...</option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  )}

                  {f.type === "checkbox" && (
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(formValues[f.key])}
                        onChange={(e) => setFormValues((v) => ({ ...v, [f.key]: e.target.checked }))}
                        className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      {f.label}
                    </label>
                  )}
                </div>
              ))}

              {formError && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                  {formError}
                </p>
              )}

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors shadow-md shadow-brand-600/20"
              >
                {saving ? "Saving..." : "Save Item"} <Save className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

