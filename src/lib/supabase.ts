import { createClient } from "@supabase/supabase-js";

export type AdmissionRecord = {
  id: string;
  student_name: string;
  father_name: string;
  mother_name: string;
  phone: string;
  address: string;
  target_class: string;
  subjects: string[];
  school_name: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export type NoticeRecord = {
  id: string;
  title: string;
  content: string;
  category: "General" | "Exam" | "Holiday" | "Admission";
  is_pinned: boolean;
  date: string;
  created_at: string;
};

export type GalleryRecord = {
  id: string;
  url: string;
  title: string;
  category: "Campus" | "Classroom" | "Events" | "Achievements";
  created_at: string;
};

export type MessageRecord = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function uploadImageFile(file: File): Promise<string> {
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { data, error } = await supabase.storage.from("gallery").upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from("gallery").getPublicUrl(filePath);
        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (e) {
      console.warn("Supabase storage fallback to DataURL:", e);
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

