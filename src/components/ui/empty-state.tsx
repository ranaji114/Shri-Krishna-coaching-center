import React from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-stone-200 rounded-[20px] bg-white/50">
      <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-[#C48A2A] mb-4 shadow-sm">
        {icon || <Inbox className="w-7 h-7" />}
      </div>
      <h3 className="text-lg font-bold font-editorial text-[#18181B]">{title}</h3>
      {description && <p className="text-xs text-zinc-500 max-w-sm mt-1 mb-6 leading-relaxed">{description}</p>}
      {action}
    </div>
  );
}
