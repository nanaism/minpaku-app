"use client"; // フックやインタラクティブな要素を使うため

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { deleteReservation } from "@/lib/supabase/database/reservations";
import { Bed, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

// ▼▼▼ 型定義を少し修正 ▼▼▼
type UserReservationDetails = {
  created_at: string | null;
  // durationを具体的な型に（もし Supabase の型と違う場合は調整してください）
  duration: unknown; // DBからの生の値をそのまま受け取るため
  guest_count: number;
  id: string;
  listing_id: string;
  total_price: number;
  user_id: string;
  listings: {
    id: string;
    user_id: string;
    location_value: string;
    price: number;
    title: string;
    listing_images: { url: string }[];
  };
};

type ReservationCardProps = {
  reservation: UserReservationDetails;
  type: "upcoming" | "past";
};

// ▼▼▼ formatDateRange ヘルパー関数を完全に置き換える ▼▼▼
const formatDateRange = (duration: unknown): string => {
  // 1. durationが文字列であることを確認
  if (typeof duration !== "string") {
    return "日付不明";
  }

  // 2. 文字列から開始日と終了日を抽出
  // 例: "[2024-07-30 15:00:00+00,2024-07-31 15:00:00+00)"
  let matches = duration.match(/\["([^"]+)"\s*,\s*"([^"]+)"\)/);

  if (!matches || matches.length < 3) {
    // 別の形式 "[YYYY-MM-DD,YYYY-MM-DD)" の場合も試す
    const simpleMatches = duration.match(
      /\[(20\d{2}-\d{2}-\d{2}),(20\d{2}-\d{2}-\d{2})\)/
    );
    if (!simpleMatches || simpleMatches.length < 3) {
      console.error("Could not parse date range string:", duration);
      return "日付形式エラー";
    }
    matches = simpleMatches;
  }

  // 抽出した文字列からDateオブジェクトを生成
  const startDate = new Date(matches[1]);
  const endDate = new Date(matches[2]);

  // 3. Dateオブジェクトが有効かチェック
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    console.error(
      "Invalid date created from parsed string:",
      matches[1],
      matches[2]
    );
    return "日付変換エラー";
  }

  // 4. 日本語ロケールでフォーマット
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // 終了日は「その日の始まり」を指すため、ユーザーには前日を表示するのが一般的
  // 例: 6/11チェックアウトなら、宿泊は6/10まで
  const displayEndDate = new Date(endDate);
  displayEndDate.setDate(displayEndDate.getDate() - 1);

  if (startDate.getTime() === displayEndDate.getTime()) {
    // 1泊の場合
    return `${startDate.toLocaleDateString("ja-JP", options)}`;
  }

  return `${startDate.toLocaleDateString(
    "ja-JP",
    options
  )} ~ ${displayEndDate.toLocaleDateString("ja-JP", options)}`;
};

export default function ReservationCard({
  reservation,
  type,
}: ReservationCardProps) {
  const router = useRouter();
  const isPast = type === "past";
  const [isPending, startTransition] = useTransition();

  const {
    listings,
    total_price,
    guest_count,
    id: reservationId,
    user_id,
    duration,
  } = reservation;
  const { title, location_value, listing_images } = listings;
  const imageUrl = listing_images?.[0]?.url;

  // 日付の表示
  const dateRangeString = formatDateRange(duration);

  const handleCancel = () => {
    startTransition(async () => {
      try {
        await deleteReservation(reservationId, user_id);
        toast.success("予約が正常にキャンセルされました。");
        // ページをリフレッシュしてリストを更新
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`キャンセルに失敗しました: ${error.message}`);
        } else {
          toast.error("キャンセルに失敗しました。不明なエラーです。");
        }
      }
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title ?? "リスティング画像"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 256px"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              画像なし
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold">{title ?? "タイトル不明"}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-4 text-sm text-slate-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-emerald-500 mr-2" />
                <span>{dateRangeString}</span>
              </div>
              <div className="flex items-center">
                <Bed className="h-4 w-4 text-emerald-500 mr-2" />
                <span>{guest_count ?? "?"}名</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-emerald-500 mr-2" />
                <span>{location_value ?? "場所不明"}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="text-lg font-bold">
              ¥{(total_price ?? 0).toLocaleString()}
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={`/listings/${reservation.listing_id}`}>
                  詳細を見る
                </Link>
              </Button>
              {!isPast && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isPending}>
                      {isPending ? "処理中..." : "キャンセルする"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        本当に予約をキャンセルしますか？
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        この操作は元に戻すことができません。予約をキャンセルすると、宿泊する権利が失われます。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>いいえ</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleCancel}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        はい、キャンセルします
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
