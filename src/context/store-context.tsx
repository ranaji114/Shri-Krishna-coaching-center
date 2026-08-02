"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AdmissionRecord,
  NoticeRecord,
  GalleryRecord,
  MessageRecord,
  supabase,
  isSupabaseConfigured,
} from "@/lib/supabase";
import {
  INITIAL_ADMISSIONS,
  INITIAL_GALLERY,
  INITIAL_MESSAGES,
  INITIAL_NOTICES,
} from "@/lib/initial-data";
import { verifyAdminCredentials } from "@/lib/auth";

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface StoreContextType {
  admissions: AdmissionRecord[];
  notices: NoticeRecord[];
  gallery: GalleryRecord[];
  messages: MessageRecord[];
  toasts: ToastMessage[];
  isAdminAuthenticated: boolean;

  // Actions
  addAdmission: (admission: Omit<AdmissionRecord, "id" | "created_at" | "status">) => Promise<boolean>;
  updateAdmissionStatus: (id: string, status: "pending" | "approved" | "rejected") => Promise<void>;
  deleteAdmission: (id: string) => Promise<void>;

  addNotice: (notice: Omit<NoticeRecord, "id" | "created_at">) => Promise<void>;
  updateNotice: (id: string, notice: Partial<NoticeRecord>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;

  addGalleryItem: (item: Omit<GalleryRecord, "id" | "created_at">) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  addMessage: (msg: Omit<MessageRecord, "id" | "created_at" | "is_read">) => Promise<boolean>;
  markMessageRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  loginAdmin: (userId: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logoutAdmin: () => void;
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>(INITIAL_ADMISSIONS);
  const [notices, setNotices] = useState<NoticeRecord[]>(INITIAL_NOTICES);
  const [gallery, setGallery] = useState<GalleryRecord[]>(INITIAL_GALLERY);
  const [messages, setMessages] = useState<MessageRecord[]>(INITIAL_MESSAGES);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Load local preferences / initial sync
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionStr = sessionStorage.getItem("skcc_admin_session") || localStorage.getItem("skcc_admin_session");
      if (sessionStr) {
        try {
          const { expiry } = JSON.parse(sessionStr);
          if (Date.now() < expiry) {
            setIsAdminAuthenticated(true);
          } else {
            sessionStorage.removeItem("skcc_admin_session");
            localStorage.removeItem("skcc_admin_session");
          }
        } catch (e) {
          sessionStorage.removeItem("skcc_admin_session");
          localStorage.removeItem("skcc_admin_session");
        }
      }

      const localAdm = localStorage.getItem("skcc_admissions");
      if (localAdm) setAdmissions(JSON.parse(localAdm));

      const localNot = localStorage.getItem("skcc_notices");
      if (localNot) setNotices(JSON.parse(localNot));

      const localGal = localStorage.getItem("skcc_gallery");
      if (localGal) setGallery(JSON.parse(localGal));

      const localMsg = localStorage.getItem("skcc_messages");
      if (localMsg) setMessages(JSON.parse(localMsg));
    }

    const client = supabase;
    if (isSupabaseConfigured && client) {
      const fetchSupabaseData = async () => {
        try {
          const { data: adm } = await client.from("admissions").select("*").order("created_at", { ascending: false });
          if (adm && adm.length > 0) setAdmissions(adm as AdmissionRecord[]);

          const { data: not } = await client.from("notices").select("*").order("created_at", { ascending: false });
          if (not && not.length > 0) setNotices(not as NoticeRecord[]);

          const { data: gal } = await client.from("gallery").select("*").order("created_at", { ascending: false });
          if (gal && gal.length > 0) setGallery(gal as GalleryRecord[]);

          const { data: msg } = await client.from("messages").select("*").order("created_at", { ascending: false });
          if (msg && msg.length > 0) setMessages(msg as MessageRecord[]);
        } catch (e) {
          console.warn("Supabase initial fetch warning:", e);
        }
      };
      fetchSupabaseData();
    }
  }, []);

  const syncLocal = (key: string, data: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const addToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ADMISSIONS
  const addAdmission = async (admission: Omit<AdmissionRecord, "id" | "created_at" | "status">) => {
    const newRecord: AdmissionRecord = {
      ...admission,
      id: "adm-" + Date.now(),
      status: "pending",
      created_at: new Date().toISOString(),
    };

    const client = supabase;
    if (isSupabaseConfigured && client) {
      try {
        const { error } = await client.from("admissions").insert([newRecord]);
        if (error) throw error;
      } catch (err) {
        console.error("Supabase admission insert error", err);
      }
    }

    setAdmissions((prev) => {
      const updated = [newRecord, ...prev];
      syncLocal("skcc_admissions", updated);
      return updated;
    });

    addToast("Admission application submitted successfully!", "success");
    return true;
  };

  const updateAdmissionStatus = async (id: string, status: "pending" | "approved" | "rejected") => {
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from("admissions").update({ status }).eq("id", id);
    }
    setAdmissions((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, status } : a));
      syncLocal("skcc_admissions", updated);
      return updated;
    });
    addToast(`Admission marked as ${status}`, "info");
  };

  const deleteAdmission = async (id: string) => {
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from("admissions").delete().eq("id", id);
    }
    setAdmissions((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      syncLocal("skcc_admissions", updated);
      return updated;
    });
    addToast("Admission record deleted", "info");
  };

  // NOTICES
  const addNotice = async (notice: Omit<NoticeRecord, "id" | "created_at">) => {
    const newRecord: NoticeRecord = {
      ...notice,
      id: "not-" + Date.now(),
      created_at: new Date().toISOString(),
    };

    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from("notices").insert([newRecord]);
    }
    setNotices((prev) => {
      const updated = [newRecord, ...prev];
      syncLocal("skcc_notices", updated);
      return updated;
    });
    addToast("Notice published successfully", "success");
  };

  const updateNotice = async (id: string, partial: Partial<NoticeRecord>) => {
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from("notices").update(partial).eq("id", id);
    }
    setNotices((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, ...partial } : n));
      syncLocal("skcc_notices", updated);
      return updated;
    });
    addToast("Notice updated", "success");
  };

  const deleteNotice = async (id: string) => {
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from("notices").delete().eq("id", id);
    }
    setNotices((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      syncLocal("skcc_notices", updated);
      return updated;
    });
    addToast("Notice deleted", "info");
  };

  // GALLERY
  const addGalleryItem = async (item: Omit<GalleryRecord, "id" | "created_at">) => {
    const newRecord: GalleryRecord = {
      ...item,
      id: "gal-" + Date.now(),
      created_at: new Date().toISOString(),
    };
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from("gallery").insert([newRecord]);
    }
    setGallery((prev) => {
      const updated = [newRecord, ...prev];
      syncLocal("skcc_gallery", updated);
      return updated;
    });
    addToast("Photo added to gallery", "success");
  };

  const deleteGalleryItem = async (id: string) => {
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from("gallery").delete().eq("id", id);
    }
    setGallery((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      syncLocal("skcc_gallery", updated);
      return updated;
    });
    addToast("Gallery item deleted", "info");
  };

  // MESSAGES
  const addMessage = async (msg: Omit<MessageRecord, "id" | "created_at" | "is_read">) => {
    const newRecord: MessageRecord = {
      ...msg,
      id: "msg-" + Date.now(),
      is_read: false,
      created_at: new Date().toISOString(),
    };
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from("messages").insert([newRecord]);
    }
    setMessages((prev) => {
      const updated = [newRecord, ...prev];
      syncLocal("skcc_messages", updated);
      return updated;
    });
    addToast("Your message has been sent to the admin team", "success");
    return true;
  };

  const markMessageRead = async (id: string) => {
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from("messages").update({ is_read: true }).eq("id", id);
    }
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, is_read: true } : m));
      syncLocal("skcc_messages", updated);
      return updated;
    });
  };

  const deleteMessage = async (id: string) => {
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from("messages").delete().eq("id", id);
    }
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      syncLocal("skcc_messages", updated);
      return updated;
    });
    addToast("Message deleted", "info");
  };

  // AUTH
  const loginAdmin = async (userId: string, pass: string) => {
    const result = await verifyAdminCredentials(userId, pass);
    if (result.success) {
      setIsAdminAuthenticated(true);
      if (typeof window !== "undefined") {
        const sessionPayload = {
          authenticated: true,
          userId: userId.trim(),
          expiry: Date.now() + 4 * 60 * 60 * 1000, // 4 Hours Session
        };
        sessionStorage.setItem("skcc_admin_session", JSON.stringify(sessionPayload));
      }
      addToast("Successfully authenticated to Admin Portal", "success");
    } else {
      addToast(result.message, "error");
    }
    return result;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("skcc_admin_session");
      localStorage.removeItem("skcc_admin_session");
      localStorage.removeItem("skcc_admin_auth");
    }
    addToast("Logged out of Admin session", "info");
  };

  return (
    <StoreContext.Provider
      value={{
        admissions,
        notices,
        gallery,
        messages,
        toasts,
        isAdminAuthenticated,
        addAdmission,
        updateAdmissionStatus,
        deleteAdmission,
        addNotice,
        updateNotice,
        deleteNotice,
        addGalleryItem,
        deleteGalleryItem,
        addMessage,
        markMessageRead,
        deleteMessage,
        loginAdmin,
        logoutAdmin,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
