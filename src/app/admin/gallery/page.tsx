"use client";

import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useStore } from "@/context/store-context";
import { uploadImageFile } from "@/lib/supabase";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";

const CATEGORY_OPTIONS: ("Campus" | "Classroom" | "Events" | "Achievements")[] = [
  "Campus",
  "Classroom",
  "Events",
  "Achievements",
];

export default function AdminGalleryPage() {
  const { gallery, addGalleryItem, deleteGalleryItem } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState<"Campus" | "Classroom" | "Events" | "Achievements">("Classroom");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const tempUrl = URL.createObjectURL(file);
      setPreviewUrl(tempUrl);
      if (!title) {
        // Auto set title from filename (remove extension)
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setTitle(nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1));
      }
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalImageUrl = url;

    if (uploadMode === "file") {
      if (!selectedFile) return;
      setIsUploading(true);
      try {
        finalImageUrl = await uploadImageFile(selectedFile);
      } catch (err) {
        console.error("Upload error", err);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    } else {
      if (!url) return;
    }

    if (!title || !finalImageUrl) return;

    await addGalleryItem({ title, url: finalImageUrl, category });
    setTitle("");
    setUrl("");
    clearSelectedFile();
  };

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="gold">Media Assets</Badge>
        <h1 className="text-3xl font-bold font-editorial text-[#18181B] mt-1">
          Gallery Management
        </h1>
        <p className="text-xs text-zinc-500">
          Upload photos directly from your phone/device or paste image links to populate the public visual gallery.
        </p>
      </div>

      {/* Upload / Add Form */}
      <Card className="p-8 space-y-6 bg-white rounded-[20px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <h3 className="text-xl font-bold font-editorial text-[#18181B]">
            Add New Image to Gallery
          </h3>
          
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-full text-xs font-semibold">
            <button
              type="button"
              onClick={() => setUploadMode("file")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                uploadMode === "file"
                  ? "bg-[#18181B] text-white shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload From Device / Phone
            </button>
            <button
              type="button"
              onClick={() => setUploadMode("url")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                uploadMode === "url"
                  ? "bg-[#18181B] text-white shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              Paste Image URL
            </button>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-6">
          <div className="space-y-6">
            <Input
              label="Image Title / Caption *"
              required
              placeholder="e.g., Mathematics Classroom Session"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {uploadMode === "file" ? (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
                  Select Photo from Phone / Device *
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="gallery-file-input"
                />

                {previewUrl ? (
                  <div className="relative rounded-[16px] border border-stone-200 p-4 bg-stone-50 flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-32 h-24 rounded-[12px] overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 text-xs flex-1">
                      <p className="font-bold text-[#18181B] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Photo Selected
                      </p>
                      <p className="text-zinc-600 truncate max-w-xs">{selectedFile?.name}</p>
                      <p className="text-zinc-400 text-[10px]">
                        Size: {selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB" : ""}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={clearSelectedFile}
                      className="text-red-600 border-red-200 hover:bg-red-50 shrink-0"
                    >
                      <X className="w-4 h-4 mr-1" /> Change Photo
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="gallery-file-input"
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-stone-300 rounded-[18px] hover:border-[#C48A2A] hover:bg-amber-50/40 transition-all cursor-pointer text-center group bg-stone-50/50"
                  >
                    <div className="w-12 h-12 rounded-[14px] bg-white border border-stone-200 flex items-center justify-center text-[#C48A2A] shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-[#18181B]">
                      Tap to Choose Photo from Phone / Gallery
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Supports JPG, PNG, WEBP, HEIC images directly from your mobile camera or library
                    </p>
                  </label>
                )}
              </div>
            ) : (
              <Input
                label="Image Public Web URL *"
                required
                placeholder="https://images.unsplash.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
              Select Category Tag *
            </label>
            <div className="flex flex-wrap gap-3">
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
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

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isUploading || (uploadMode === "file" && !selectedFile) || (uploadMode === "url" && !url)}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading Photo...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Image to Gallery
              </span>
            )}
          </Button>
        </form>
      </Card>

      {/* Gallery Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-editorial text-[#18181B]">
          Current Gallery Items ({gallery.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <Card key={item.id} className="p-4 space-y-3 relative group rounded-[18px]">
              <div className="aspect-[4/3] rounded-[14px] overflow-hidden bg-zinc-900 border border-stone-200">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <Badge variant="gold" className="text-[9px] mb-0.5">{item.category}</Badge>
                  <h4 className="text-xs font-bold font-editorial text-[#18181B] line-clamp-1">{item.title}</h4>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteTargetId(item.id)}
                  className="text-amber-800 border-amber-200 hover:bg-amber-100 p-2 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        title="Delete Image From Gallery?"
        description="Are you sure you want to remove this photo from the public gallery? It will no longer display on the website."
        isDestructive
        confirmText="Yes, Delete Photo"
        onConfirm={() => {
          if (deleteTargetId) deleteGalleryItem(deleteTargetId);
        }}
      />
    </div>
  );
}
