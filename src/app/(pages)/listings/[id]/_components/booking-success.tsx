import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const BookingSuccess = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto bg-emerald-100 rounded-full p-4 w-fit">
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </div>
        <CardTitle className="mt-4 text-2xl font-bold text-slate-900">
          ご予約が完了しました！
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-slate-600 space-y-4">
        <p>この度はご予約いただき、誠にありがとうございます。</p>
        <p>予約内容の詳細は、ダッシュボードからご確認いただけます。</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600">
          <Link href="/dashboard">予約を確認する</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">トップページへ戻る</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
