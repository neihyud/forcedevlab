"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { RefreshCw, Clock } from "lucide-react";

interface RefreshStatusBarProps {
  lastFetched: string | null;
}

export default function RefreshStatusBar({
  lastFetched,
}: RefreshStatusBarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-muted/50 backdrop-blur-sm border border-border/50">
      <div className="flex items-center gap-3">
        <div
          className={`size-2.5 rounded-full ${isPending ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`}
        />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-3.5" />
          {lastFetched ? (
            <span>Cập nhật lúc: {formatTime(lastFetched)}</span>
          ) : (
            <span>Đang tải...</span>
          )}
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRefresh}
        loading={isPending}
        className="rounded-xl"
      >
        <RefreshCw className={`size-3.5 ${isPending ? "animate-spin" : ""}`} />
        Làm mới
      </Button>
    </div>
  );
}
