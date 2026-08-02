"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";
import { useStore } from "@/context/store-context";
import { MessageSquare, Trash2, CheckCircle2, Phone, Mail, ArrowUpRight, Inbox } from "lucide-react";

export default function AdminMessagesPage() {
  const { messages, markMessageRead, deleteMessage } = useStore();
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="gold">Inbound Communications</Badge>
        <h1 className="text-3xl font-bold font-editorial text-[#18181B] mt-1">
          Contact Form Messages
        </h1>
        <p className="text-xs text-zinc-500">
          Review visitor inquiries sent through the public contact page and send quick responses.
        </p>
      </div>

      {messages.length === 0 ? (
        <EmptyState
          title="No Contact Messages"
          description="Your inbox is empty. Contact form submissions will appear here automatically."
          icon={<Inbox className="w-8 h-8 text-[#C48A2A]" />}
        />
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={`p-6 space-y-4 border ${
                msg.is_read ? "border-[#E7E5E4] bg-white" : "border-[#C48A2A]/40 bg-stone-50/70"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Badge variant={msg.is_read ? "stone" : "gold"}>
                    {msg.is_read ? "Read" : "Unread Inquiry"}
                  </Badge>
                  <span className="font-bold text-sm text-[#18181B]">{msg.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {!msg.is_read && (
                    <Button variant="outline" size="sm" onClick={() => markMessageRead(msg.id)}>
                      <CheckCircle2 className="w-4 h-4 mr-1 text-[#C48A2A]" /> Mark Read
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteTargetId(msg.id)}
                    className="text-amber-800 border-amber-200 hover:bg-amber-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold font-editorial text-[#18181B]">{msg.subject}</h4>
                <p className="text-xs text-zinc-700 leading-relaxed bg-white p-4 rounded-[12px] border border-stone-200">
                  {msg.message}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 border-t border-stone-100">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-semibold text-[#18181B]">
                    <Phone className="w-3.5 h-3.5 text-[#C48A2A]" /> {msg.phone}
                  </span>
                  {msg.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> {msg.email}
                    </span>
                  )}
                </div>

                <a
                  href={`https://wa.me/91${msg.phone.replace(/[^0-9]/g, "")}?text=Namaste%20${encodeURIComponent(
                    msg.name
                  )},%20regarding%20your%20query%20at%20Shri%20Krishna%20Coaching%20Center...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#C48A2A] hover:underline flex items-center gap-1"
                >
                  Reply via WhatsApp <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        title="Delete Contact Message?"
        description="Are you sure you want to delete this message record? Action cannot be reverted."
        isDestructive
        confirmText="Yes, Delete Message"
        onConfirm={() => {
          if (deleteTargetId) deleteMessage(deleteTargetId);
        }}
      />
    </div>
  );
}
