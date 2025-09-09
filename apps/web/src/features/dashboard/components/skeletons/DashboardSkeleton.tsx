import React from "react";
import LockPanelSkeleton from "./LockPanelSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="mx-auto mt-6 mb-12" aria-busy="true" role="status">
      <div className="w-120 min-h-80 rounded-2xl p-4 bg-custom-dashboard-primary-color">
        {/* tabs header skeleton */}
        <div className="w-120 bg-transparent flex items-center mb-4">
          <div className="flex gap-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>

        <div className="px-4">
          {/* center the panel skeleton */}
          <div className="flex justify-center">
            <LockPanelSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
