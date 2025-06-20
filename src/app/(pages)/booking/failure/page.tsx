import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import FailureContent from "./_components/failure-content"; // 新しいコンポーネント

// ローディング中に表示するスケルトンUI
function FailureSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-gray-50 p-4">
      <div className="w-full max-w-lg mx-auto space-y-6">
        <Skeleton className="h-24 w-24 rounded-full mx-auto" />
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-6 w-full" />
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function BookingFailurePage() {
  return (
    <Suspense fallback={<FailureSkeleton />}>
      <FailureContent />
    </Suspense>
  );
}
