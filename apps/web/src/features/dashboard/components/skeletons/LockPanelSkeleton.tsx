import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function LockPanelSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="flex flex-col items-center animate-pulse"
    >
      {/* top token row */}
      <div className="w-112 h-30 rounded-2xl bg-custom-background px-4 py-2">
        <div className="text-xs text-custom-muted-text">
          <Skeleton className="w-28 h-3" />
        </div>

        <div className="flex justify-between items-start mt-2">
          {/* token image + name */}
          <div className="flex items-center me-6">
            <Skeleton className="w-10 h-10 rounded-md me-3" />
            <div className="flex flex-col">
              <Skeleton className="w-28 h-6 mb-1" />
              <Skeleton className="w-20 h-3" />
            </div>
          </div>

          {/* amount input */}
          <div className="flex items-center">
            <Skeleton className="w-36 h-12" />
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <Skeleton className="w-32 h-3" />
          <Skeleton className="w-36 h-4" />
        </div>
      </div>

      {/* collapsible trigger */}
      <div className="border border-white/10 mt-2 rounded-2xl w-112">
        <div className="w-112 py-3 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-36 h-4" />
          </div>
          <Skeleton className="w-6 h-6" />
        </div>
      </div>

      {/* info card */}
      <Card className="w-112 rounded-2xl bg-custom-background text-custom-primary-text border-none mt-2">
        <CardContent className="px-4">
          <Skeleton className="w-40 h-4 mb-3" />
          <div className="w-104 flex justify-between">
            <Skeleton className="w-28 h-4" />
            <Skeleton className="w-12 h-4" />
          </div>
          <div className="w-104 flex justify-between mt-2">
            <Skeleton className="w-28 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
        </CardContent>
      </Card>

      {/* action buttons */}
      <div className="w-112 mt-3 space-y-3">
        <Skeleton className="w-full h-10 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
    </div>
  );
}
