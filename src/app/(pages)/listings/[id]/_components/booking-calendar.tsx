"use client";
 
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { ReservationDateRange } from "@/lib/supabase/database/reservations";
import { Tables } from "@/lib/supabase/types/database.types";
 
interface BookingCalendarProps {
  listing: Tables<"listings">;
  reservations: ReservationDateRange[];
}
 
/**
 * 予約カレンダーコンポーネント
 *
 * 物件の予約フォームを提供するクライアントコンポーネントです。
 * 日付選択、ゲスト数指定、予約確認の一連のフローを管理します。
 */
const BookingCalendar = ({ listing, reservations }: BookingCalendarProps) => {
  return (
    <Card className="border-2 border-emerald-500/10 sticky top-24">
      <CardContent className="p-6">
        <h3 id="booking" className="text-xl font-bold mb-4">
          予約する
        </h3>
        <Calendar
          mode="range"
          classNames={{
            day_range_start: "bg-emerald-500 text-white rounded-full",
            day_range_end: "bg-emerald-500 text-white rounded-full",
            day_range_middle: "bg-emerald-50 text-emerald-500",
            day_selected: "bg-emerald-500 text-white",
            day_today: "border border-slate-300",
          }}
        />
      </CardContent>
    </Card>
  );
};
 
export default BookingCalendar;