"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { useStore } from "@/context/store-context";
import { Maximize2, Image as ImageIcon } from "lucide-react";

const CATEGORIES = ["All", "Campus", "Classroom", "Events", "Achievements"];

export default function GalleryPage() {
  const { gallery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = gallery.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-2xl space-y-4">
        <Badge variant="gold">Visual Archives</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-editorial text-[#18181B]">
          Shri Krishna Gallery
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          Moments of classroom focus, student achievements, weekly evaluations, and campus life at Mudila Bazar.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
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

      {/* Gallery Masonry */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No Images in This Category"
          description="Check back soon or select a different category filter above."
          icon={<ImageIcon className="w-8 h-8 text-[#C48A2A]" />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-[20px] overflow-hidden border border-[#E7E5E4] bg-zinc-900 aspect-[4/3] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <Badge variant="gold" className="text-[9px] mb-1">{item.category}</Badge>
                <h4 className="text-sm font-bold font-editorial text-white line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <GalleryLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(index) => setLightboxIndex(index)}
      />
    </div>
  );
}
