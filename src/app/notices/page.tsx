"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { useStore } from "@/context/store-context";
import { Search, Pin, Calendar, Bell } from "lucide-react";

const CATEGORIES = ["All", "General", "Exam", "Holiday", "Admission"];

export default function NoticesPage() {
  const { notices } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" ? true : n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-2xl space-y-4">
        <Badge variant="gold">Official Bulletins</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-editorial text-[#18181B]">
          Notice Board & Announcements
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          Stay updated with test schedules, holiday notifications, new batch registrations, and special workshop announcements.
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-7 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#18181B] text-[#FAF8F5] shadow-md"
                  : "bg-white text-zinc-600 hover:bg-stone-100 border border-[#E7E5E4]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="md:col-span-5 relative">
          <Input
            label="Search Notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Notice List */}
      {filteredNotices.length === 0 ? (
        <EmptyState
          title="No Notices Found"
          description="Try adjusting your search query or category filter."
          icon={<Bell className="w-8 h-8 text-[#C48A2A]" />}
        />
      ) : (
        <div className="space-y-6">
          {filteredNotices.map((notice) => (
            <Card
              key={notice.id}
              className={`p-8 space-y-4 border ${
                notice.is_pinned ? "border-[#C48A2A]/50 bg-stone-50/50 shadow-md" : "border-[#E7E5E4]"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {notice.is_pinned && (
                    <Badge variant="gold" className="flex items-center gap-1">
                      <Pin className="w-3 h-3 fill-[#C48A2A]" />
                      Pinned Announcement
                    </Badge>
                  )}
                  <Badge variant="stone">{notice.category}</Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-num">
                  <Calendar className="w-3.5 h-3.5 text-[#C48A2A]" />
                  {notice.date}
                </div>
              </div>

              <h3 className="text-2xl font-bold font-editorial text-[#18181B]">
                {notice.title}
              </h3>

              <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                {notice.content}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
