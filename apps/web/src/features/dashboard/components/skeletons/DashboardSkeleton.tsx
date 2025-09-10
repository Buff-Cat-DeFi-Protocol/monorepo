import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="mx-auto mt-6 mb-12 w-120 h-119 rounded-2xl p-4 border border-white/30 flex flex-col">
      <div className="flex items-center gap-4 h-9 p-[3px]">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="px-8 w-112 h-32 py-2" />
      <Skeleton className="w-[448px] h-10 mt-2 rounded-2xl" />
      <Skeleton className="w-112 h-31 rounded-2xl mt-2" />
      <Skeleton className="w-[448px] h-10 mt-2 rounded-md" />
      <Skeleton className="w-[448px] h-10 mt-2 rounded-md" />
    </div>
  );
}
