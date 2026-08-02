"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/store-context";
import {
  Users,
  Image as ImageIcon,
  Bell,
  MessageSquare,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { admissions, notices, gallery, messages } = useStore();

  const pendingAdmissions = admissions.filter((a) => a.status === "pending");
  const approvedAdmissions = admissions.filter((a) => a.status === "approved");
  const unreadMessages = messages.filter((m) => !m.is_read);

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E7E5E4] p-8 rounded-[20px] shadow-sm">
        <div className="space-y-1">
          <Badge variant="gold">Management Control Panel</Badge>
          <h1 className="text-3xl font-bold font-editorial text-[#18181B]">
            Welcome Back, Founder Krishna Sir
          </h1>
          <p className="text-xs text-zinc-500">
            Shri Krishna Coaching Center • Live Database & Operational Metrics
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/admissions">
            <Button variant="primary" size="sm">
              Review Pending Admissions ({pendingAdmissions.length})
            </Button>
          </Link>
          <Link href="/admin/notices">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1 text-[#C48A2A]" /> Add Notice
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Total Applications
            </span>
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[#18181B]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-num font-bold text-[#18181B]">{admissions.length}</p>
          <p className="text-[11px] text-zinc-500 flex items-center gap-1 pt-1">
            <span className="font-semibold text-amber-700">{pendingAdmissions.length} pending review</span>
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Approved Students
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-100/60 flex items-center justify-center text-[#C48A2A]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-num font-bold text-[#C48A2A]">{approvedAdmissions.length}</p>
          <p className="text-[11px] text-zinc-500 pt-1">Permanently stored records</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Active Notices
            </span>
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[#18181B]">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-num font-bold text-[#18181B]">{notices.length}</p>
          <p className="text-[11px] text-zinc-500 pt-1">Publicly displayed updates</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Inbound Messages
            </span>
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[#18181B]">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-num font-bold text-[#18181B]">{messages.length}</p>
          <p className="text-[11px] text-zinc-500 pt-1">
            <span className="font-semibold text-amber-700">{unreadMessages.length} unread</span>
          </p>
        </Card>
      </div>

      {/* Two Column Layout: Recent Admissions & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Admissions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-editorial text-[#18181B]">
              Recent Admission Registrations
            </h3>
            <Link href="/admin/admissions" className="text-xs font-semibold text-[#C48A2A] hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {admissions.slice(0, 4).map((adm) => (
              <Card key={adm.id} className="p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#18181B]">{adm.student_name}</span>
                    <Badge variant={adm.status === "approved" ? "gold" : "stone"}>
                      {adm.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500">
                    {adm.target_class} • {adm.phone} • {adm.school_name}
                  </p>
                </div>
                <Link href="/admin/admissions">
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-editorial text-[#18181B]">
              Inbound Contact Messages
            </h3>
            <Link href="/admin/messages" className="text-xs font-semibold text-[#C48A2A] hover:underline">
              View Inbox →
            </Link>
          </div>

          <div className="space-y-3">
            {messages.length === 0 ? (
              <Card className="p-6 text-center text-xs text-zinc-500">
                No contact messages received yet.
              </Card>
            ) : (
              messages.slice(0, 3).map((msg) => (
                <Card key={msg.id} className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#18181B]">{msg.name}</span>
                    <span className="text-[10px] text-zinc-400 font-num">{msg.phone}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#C48A2A] line-clamp-1">{msg.subject}</p>
                  <p className="text-xs text-zinc-600 line-clamp-2">{msg.message}</p>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
