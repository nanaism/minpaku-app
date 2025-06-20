"use client"; // このページはインタラクティブな要素を持つため

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWindowSize } from "@uidotdev/usehooks";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";

export default function BookingSuccessPage() {
  const { width, height } = useWindowSize();

  return (
    <>
      {width && height && (
        <Confetti width={width} height={height} recycle={false} />
      )}
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-gray-50 p-4">
        <Card className="w-full max-w-lg mx-auto shadow-lg animate-in fade-in-50 zoom-in-95">
          <CardHeader className="text-center p-8">
            <div className="mx-auto bg-emerald-100 rounded-full p-4 w-fit">
              <CheckCircle2 className="h-16 w-16 text-emerald-500" />
            </div>
            <CardTitle className="mt-6 text-3xl font-bold text-slate-900">
              ご予約が完了しました！
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-slate-600 text-lg px-8">
            <p>この度はご予約いただき、誠にありがとうございます。</p>
            <p className="mt-2">
              旅の準備を始めましょう！予約内容の詳細は、ダッシュボードからご確認いただけます。
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-8">
            <Button
              asChild
              size="lg"
              className="w-full bg-emerald-500 hover:bg-emerald-600"
            >
              <Link href="/dashboard">予約を確認する</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/">トップページへ戻る</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
