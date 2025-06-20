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

interface BookingFailureProps {
  listingId: string;
  errorMessage?: string;
}

export const BookingFailure = ({
  listingId,
  errorMessage,
}: BookingFailureProps) => {
  return (
    <Card className="w-full max-w-md mx-auto border-destructive">
      <CardHeader className="text-center">
        <div className="mx-auto bg-red-100 rounded-full p-4 w-fit">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <CardTitle className="mt-4 text-2xl font-bold text-slate-900">
          予約処理に失敗しました
        </CardTitle>
        <CardDescription className="mt-2 text-red-600">
          {errorMessage ||
            "大変申し訳ありませんが、予約を完了できませんでした。"}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center text-slate-600">
        <p>
          お手数ですが、もう一度お試しいただくか、時間をおいてから再度お試しください。
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="w-full">
          <Link href={`/listings/${listingId}`}>もう一度試す</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">トップページへ戻る</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
