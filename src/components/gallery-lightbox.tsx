"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { GalleryRecord } from "@/lib/supabase";

interface LightboxProps {
  items: GalleryRecord[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function GalleryLightbox({ items, currentIndex, onClose, onSelectIndex }: LightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onSelectIndex((currentIndex! + 1) % items.length);
      if (e.key === "ArrowLeft") onSelectIndex((currentIndex! - 1 + items.length) % items.length);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length, onClose, onSelectIndex]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Controls */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={() => onSelectIndex((currentIndex! - 1 + items.length) % items.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => onSelectIndex((currentIndex! + 1) % items.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Container */}
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
          >
            <div className="relative rounded-[20px] overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800">
              <img
                src={currentItem.url}
                alt={currentItem.title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
              <div className="p-4 md:p-6 bg-zinc-950/90 text-white flex items-center justify-between gap-4 border-t border-zinc-800">
                <div>
                  <h4 className="text-lg font-semibold font-editorial text-white">{currentItem.title}</h4>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#C48A2A] mt-1 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    {currentItem.category}
                  </span>
                </div>
                <span className="text-xs text-zinc-500 font-num font-medium">
                  {currentIndex! + 1} / {items.length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
