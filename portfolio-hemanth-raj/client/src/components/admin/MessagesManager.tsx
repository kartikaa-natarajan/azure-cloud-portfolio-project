import { useState, useMemo, useEffect } from "react";
import { Mail, MailOpen, Trash2, Search, X, AlertTriangle, Eye, Send, MessageSquare } from "lucide-react";
import { api, ApiClientError } from "@/lib/api";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";
import { useFetch } from "@/hooks/useFetch";
import type { ContactMessage } from "@/types";

export default function MessagesManager() {
  const { data, loading, error, retry } = useFetch<ContactMessage[]>(
    () => api.get<ContactMessage[]>("/contact"),
    []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "unread">("all");
  const [viewingMsg, setViewingMsg] = useState<ContactMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);

  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // Auto-polling every 10 seconds for real-time inbox updates
  useEffect(() => {
    const timer = setInterval(() => {
      retry();
    }, 10000);
    return () => clearInterval(timer);
  }, [retry]);

  // Keep viewingMsg synced when data updates via polling
  useEffect(() => {
    if (viewingMsg && data) {
      const updated = data.find((m) => m._id === viewingMsg._id || m.conversationId === viewingMsg.conversationId);
      if (updated) setViewingMsg(updated);
    }
  }, [data]);

  // Escape listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (viewingMsg) setViewingMsg(null);
        if (deleteTarget) setDeleteTarget(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewingMsg, deleteTarget]);

  const filteredMessages = useMemo(() => {
    if (!data) return [];
    return data.filter((msg) => {
      const matchesFilter = filterMode === "all" || (filterMode === "unread" && !msg.read);
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        msg.name.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        msg.subject.toLowerCase().includes(q) ||
        msg.message.toLowerCase().includes(q) ||
        (msg.replies && msg.replies.some((r) => r.message.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)));
      return matchesFilter && matchesSearch;
    });
  }, [data, searchQuery, filterMode]);

  async function toggleRead(msg: ContactMessage) {
    try {
      await api.patch(`/contact/${msg._id}/read`, { read: !msg.read });
      if (viewingMsg && viewingMsg._id === msg._id) {
        setViewingMsg({ ...viewingMsg, read: !msg.read });
      }
      retry();
    } catch (err) {
      alert(err instanceof ApiClientError ? err.message : "Failed to update message.");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await api.delete(`/contact/${deleteTarget._id}`);
      setDeleteTarget(null);
      if (viewingMsg && (viewingMsg._id === deleteTarget._id || viewingMsg.conversationId === deleteTarget.conversationId)) {
        setViewingMsg(null);
      }
      retry();
    } catch (err) {
      alert(err instanceof ApiClientError ? err.message : "Failed to delete message.");
    }
  }

  function openDetail(msg: ContactMessage) {
    setViewingMsg(msg);
    setReplyText("");
    if (!msg.read) {
      toggleRead(msg);
    }
  }

  async function handleSendReply() {
    if (!viewingMsg || !replyText.trim()) return;
    setSendingReply(true);
    try {
      await api.post(`/contact/${viewingMsg._id}/reply`, { message: replyText.trim() });
      setReplyText("");
      retry();
    } catch (err) {
      alert(err instanceof ApiClientError ? err.message : "Failed to send reply.");
    } finally {
      setSendingReply(false);
    }
  }

  const unreadCount = data?.filter((m) => !m.read).length ?? 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Contact Messages & Replies</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {unreadCount > 0 ? `${unreadCount} unread message(s)` : "All messages read"} · Auto-synced
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      {data && data.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search sender, email, subject, reply content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                filterMode === "all"
                  ? "bg-brand-600 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              All ({data.length})
            </button>
            <button
              onClick={() => setFilterMode("unread")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                filterMode === "unread"
                  ? "bg-brand-600 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>
      )}

      {loading && <LoadingState label="Loading messages..." />}
      {error && <ErrorState message="Unable to load messages." onRetry={retry} />}
      {!loading && !error && (data?.length ?? 0) === 0 && <EmptyState label="No messages received yet." />}
      {!loading && !error && (data?.length ?? 0) > 0 && filteredMessages.length === 0 && (
        <EmptyState label="No matching messages found." />
      )}

      {!loading && !error && filteredMessages.length > 0 && (
        <div className="space-y-3">
          {filteredMessages.map((msg) => {
            const replyCount = msg.replies?.length ?? 0;
            return (
              <div
                key={msg._id}
                className={`p-4 rounded-xl border transition-all ${
                  msg.read
                    ? "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    : "border-brand-300 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-900/10 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 cursor-pointer flex-1" onClick={() => openDetail(msg)}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{msg.subject}</p>
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-600 text-white">
                          New
                        </span>
                      )}
                      {replyCount > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                          <MessageSquare className="w-3 h-3" /> {replyCount} reply/replies
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{msg.name}</span> ({msg.email}) ·{" "}
                      {new Date(msg.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => openDetail(msg)}
                      className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                      aria-label="View thread"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleRead(msg)}
                      className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                      aria-label={msg.read ? "Mark unread" : "Mark read"}
                    >
                      {msg.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4 text-brand-600" />}
                    </button>
                    <button
                      onClick={() => setDeleteTarget(msg)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Conversation Detail & Timeline Modal */}
      {viewingMsg && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setViewingMsg(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4 shrink-0">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{viewingMsg.subject}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Conversation Thread · Started {new Date(viewingMsg.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setViewingMsg(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Messages Timeline */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Initial Message */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {viewingMsg.name} <span className="font-normal text-slate-500">({viewingMsg.email})</span>
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(viewingMsg.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {viewingMsg.message}
                </p>
              </div>

              {/* Nested Replies */}
              {viewingMsg.replies && viewingMsg.replies.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversation History</h4>
                  {viewingMsg.replies.map((reply) => {
                    const isAdmin = reply.sender === "admin";
                    return (
                      <div
                        key={reply._id}
                        className={`p-4 rounded-xl border transition-all ${
                          isAdmin
                            ? "border-brand-200 dark:border-brand-800 bg-brand-50/40 dark:bg-brand-950/20 ml-6"
                            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mr-6"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            {reply.name}{" "}
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                isAdmin
                                  ? "bg-brand-600 text-white"
                                  : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                              }`}
                            >
                              {isAdmin ? "Admin Reply" : "Visitor Reply"}
                            </span>
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(reply.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                          {reply.message}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Admin Reply Form */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <div className="space-y-2">
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Write a reply to ${viewingMsg.name}...`}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${viewingMsg.email}?subject=Re: ${encodeURIComponent(viewingMsg.subject)}`}
                    className="text-xs font-medium text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" /> External Email Client
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDeleteTarget(viewingMsg)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Delete Thread
                    </button>
                    <button
                      onClick={handleSendReply}
                      disabled={sendingReply || !replyText.trim()}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white disabled:opacity-50 transition-all shadow-md shadow-brand-600/20"
                    >
                      <Send className="w-3.5 h-3.5" /> {sendingReply ? "Sending..." : "Send Reply"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              Delete entire conversation thread from <span className="font-bold">{deleteTarget.name}</span>? This action cannot be undone.
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
    </div>
  );
}
