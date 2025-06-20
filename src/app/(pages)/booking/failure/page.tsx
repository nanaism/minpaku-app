"use client"; // このページはURLクエリに依存するため

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BookingFailurePage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");
  const listingId = searchParams.get("listingId");

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-gray-50 p-4">
      <Card className="w-full max-w-lg mx-auto border-destructive shadow-lg animate-in fade-in-50 zoom-in-95">
        <CardHeader className="text-center p-8">
          <div className="mx-auto bg-red-100 rounded-full p-4 w-fit">
            <AlertTriangle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="mt-6 text-3xl font-bold text-slate-900">
            予約処理に失敗しました
          </CardTitle>
          <CardDescription className="mt-4 text-red-600 bg-red-50 p-3 rounded-md">
            {errorMessage ||
              "大変申し訳ありませんが、予約を完了できませんでした。"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-slate-600 text-lg px-8">
          <p>
            お手数ですが、もう一度お試しいただくか、時間をおいてから再度お試しください。
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 p-8">
          {listingId ? (
            <Button asChild size="lg" className="w-full">
              <Link href={`/listings/${listingId}`}>もう一度試す</Link>
            </Button>
          ) : null}
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href="/">トップページへ戻る</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
