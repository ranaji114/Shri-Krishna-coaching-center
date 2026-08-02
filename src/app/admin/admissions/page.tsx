"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";
import { useStore } from "@/context/store-context";
import { CheckCircle2, Trash2, Phone, School, UserCheck, Inbox } from "lucide-react";

export default function AdminAdmissionsPage() {
  const { admissions, updateAdmissionStatus, deleteAdmission } = useStore();
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved">("all");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredAdmissions = admissions.filter((a) => {
    if (filterStatus === "all") return true;
    return a.status === filterStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="gold">Student Management</Badge>
          <h1 className="text-3xl font-bold font-editorial text-[#18181B] mt-1">
            Admission Applications
          </h1>
          <p className="text-xs text-zinc-500">
            Review submitted registrations, approve applicants, or delete record entries.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 border border-[#E7E5E4] bg-white p-1 rounded-[14px]">
          {(["all", "pending", "approved"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-[10px] capitalize transition-all cursor-pointer ${
                filterStatus === st
                  ? "bg-[#18181B] text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {filteredAdmissions.length === 0 ? (
        <EmptyState
          title="No Admissions Records"
          description="There are currently no student applications under this status filter."
          icon={<Inbox className="w-8 h-8 text-[#C48A2A]" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAdmissions.map((adm) => (
            <Card key={adm.id} className="p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold font-editorial text-[#18181B]">
                      {adm.student_name}
                    </h3>
                    <p className="text-xs font-semibold text-[#C48A2A] mt-0.5">
                      Target: {adm.target_class}
                    </p>
                  </div>
                  <Badge variant={adm.status === "approved" ? "gold" : "stone"}>
                    {adm.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs text-zinc-600 bg-stone-50 p-4 rounded-[14px] border border-stone-200">
                  <p><strong>Father:</strong> {adm.father_name}</p>
                  <p><strong>Mother:</strong> {adm.mother_name}</p>
                  <p><strong>Phone:</strong> <a href={`tel:${adm.phone}`} className="text-[#18181B] font-bold hover:underline">{adm.phone}</a></p>
                  <p><strong>School:</strong> {adm.school_name}</p>
                  <p><strong>Address:</strong> {adm.address}</p>
                  <p className="pt-1">
                    <strong>Enrolled Subjects:</strong>{" "}
                    <span className="text-[#18181B] font-medium">{adm.subjects.join(", ")}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                {adm.status !== "approved" ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => updateAdmissionStatus(adm.id, "approved")}
                  >
                    <UserCheck className="w-4 h-4 mr-1.5" /> Approve Admission
                  </Button>
                ) : (
                  <span className="text-xs font-semibold text-[#C48A2A] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Permanently Approved
                  </span>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteTargetId(adm.id)}
                  className="text-amber-800 border-amber-200 hover:bg-amber-100"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        title="Delete Admission Record?"
        description="Are you sure you want to permanently remove this student application from the system? This action cannot be undone."
        isDestructive
        confirmText="Yes, Delete Record"
        onConfirm={() => {
          if (deleteTargetId) deleteAdmission(deleteTargetId);
        }}
      />
    </div>
  );
}
