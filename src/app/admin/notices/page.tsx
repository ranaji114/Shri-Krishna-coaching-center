"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useStore } from "@/context/store-context";
import { Plus, Trash2, Pin, Calendar, Edit3 } from "lucide-react";
import { NoticeRecord } from "@/lib/supabase";

export default function AdminNoticesPage() {
  const { notices, addNotice, updateNotice, deleteNotice } = useStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"General" | "Exam" | "Holiday" | "Admission">("General");
  const [isPinned, setIsPinned] = useState(false);

  const [editingNotice, setEditingNotice] = useState<NoticeRecord | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    if (editingNotice) {
      await updateNotice(editingNotice.id, { title, content, category, is_pinned: isPinned });
      setEditingNotice(null);
    } else {
      await addNotice({
        title,
        content,
        category,
        is_pinned: isPinned,
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      });
    }

    setTitle("");
    setContent("");
    setIsPinned(false);
  };

  const startEdit = (notice: NoticeRecord) => {
    setEditingNotice(notice);
    setTitle(notice.title);
    setContent(notice.content);
    setCategory(notice.category);
    setIsPinned(notice.is_pinned);
  };

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="gold">Public Bulletins</Badge>
        <h1 className="text-3xl font-bold font-editorial text-[#18181B] mt-1">
          Notice Board Management
        </h1>
        <p className="text-xs text-zinc-500">
          Publish, pin, or delete announcements on the public notice board.
        </p>
      </div>

      {/* Form */}
      <Card className="p-8 space-y-6 bg-white">
        <h3 className="text-xl font-bold font-editorial text-[#18181B]">
          {editingNotice ? "Edit Notice Bulletin" : "Publish New Notice"}
        </h3>

        <form onSubmit={handleCreate} className="space-y-6">
          <Input
            label="Notice Title *"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Notice Full Content *"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
                Category *
              </label>
              <div className="flex flex-wrap gap-2">
                {(["General", "Exam", "Holiday", "Admission"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                      category === cat
                        ? "bg-[#18181B] text-white border-[#18181B]"
                        : "bg-white text-zinc-600 border-[#E7E5E4]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="pinnedCheck"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-5 h-5 accent-[#C48A2A] rounded cursor-pointer"
              />
              <label htmlFor="pinnedCheck" className="text-xs font-bold text-zinc-700 cursor-pointer">
                Pin to top of homepage notice feed
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="primary" size="md">
              {editingNotice ? "Save Notice Changes" : "Publish Notice Now"}
            </Button>
            {editingNotice && (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  setEditingNotice(null);
                  setTitle("");
                  setContent("");
                }}
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* Notice List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-editorial text-[#18181B]">
          Published Notices ({notices.length})
        </h3>

        <div className="space-y-4">
          {notices.map((n) => (
            <Card key={n.id} className="p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {n.is_pinned && <Badge variant="gold">Pinned</Badge>}
                  <Badge variant="stone">{n.category}</Badge>
                  <span className="text-xs text-zinc-400 font-num">{n.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => startEdit(n)}>
                    <Edit3 className="w-4 h-4 text-zinc-700" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteTargetId(n.id)}
                    className="text-amber-800 border-amber-200 hover:bg-amber-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <h4 className="text-lg font-bold font-editorial text-[#18181B]">{n.title}</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">{n.content}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        title="Delete Notice Bulletin?"
        description="Are you sure you want to delete this notice? It will immediately be removed from the public website."
        isDestructive
        confirmText="Yes, Delete Notice"
        onConfirm={() => {
          if (deleteTargetId) deleteNotice(deleteTargetId);
        }}
      />
    </div>
  );
}
