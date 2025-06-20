import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getListingById } from "@/lib/supabase/database/listings";
import {
  getReservationsForListingInRange,
  ReservationDateRange,
} from "@/lib/supabase/database/reservations";
import { addMonths } from "date-fns";
import { Calendar, Home, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingCalendar from "./_components/booking-calendar";
import ListingDetails from "./_components/listing-details";
import ListingImageGallery from "./_components/listing-image-gallery";

// ▼▼▼ ステップ1で作成したコンポーネントをインポート ▼▼▼
import { BookingFailure } from "./_components/booking-failure";
import { BookingSuccess } from "./_components/booking-success";

export const dynamic = "force-dynamic";

interface ListingDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams も Promise でラップ
}

export default async function ListingDetailPage({
  params,
  searchParams: searchParamsPromise, // 変数名を変更して、Promiseであることを明確にする
}: ListingDetailPageProps) {
  // ▲▲▲ 引数の型定義を修正 ▲▲▲
  const { id } = await params;

  const searchParams = await searchParamsPromise;

  const { listing, images } = await getListingById(id);
  if (!listing) {
    notFound();
  }

  const today = new Date();
  const twoMonthsLater = addMonths(today, 2);

  const reservationsData: ReservationDateRange[] | null =
    await getReservationsForListingInRange(id, today, twoMonthsLater);

  const reservations: ReservationDateRange[] = reservationsData || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section (変更なし) */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="md:max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                  {listing.category}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {listing.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>{listing.location_value}</span>
                </div>
              </div>

              <p className="text-lg text-slate-700">{listing.description}</p>
            </div>

            <div className="hidden md:block md:w-80 flex-shrink-0">
              <Card className="border-2 border-emerald-500/10">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold mb-2">
                    ¥{listing.price.toLocaleString()}
                    <span className="text-sm font-normal text-slate-600 ml-1">
                      / 1泊あたり
                    </span>
                  </div>

                  <ListingDetails listing={listing} isCard={true} />

                  <Button
                    asChild
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                    size="lg"
                  >
                    <Link href="#booking-section">
                      {" "}
                      {/* booking-sectionへのアンカーリンクに修正 */}
                      <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                      予約する
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <ListingImageGallery images={images} listingTitle={listing.title} />

      {/* Main Content */}
      <section className="py-8" id="booking-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Listing Details (変更なし) */}
            <div className="flex-1">
              <div className="space-y-8">
                <section aria-labelledby="description-section">
                  <h2
                    id="description-section"
                    className="text-2xl font-bold mb-4"
                  >
                    宿泊施設について
                  </h2>
                  <p className="text-slate-700 mb-6">{listing.description}</p>
                </section>

                <Separator />

                <section aria-labelledby="details-section">
                  <h2 id="details-section" className="text-xl font-bold mb-4">
                    宿泊施設の詳細
                  </h2>
                  <ListingDetails listing={listing} isCard={false} />
                </section>

                <Separator />

                <section aria-labelledby="category-section">
                  <h2 id="category-section" className="text-xl font-bold mb-4">
                    カテゴリー
                  </h2>
                  <div className="grid grid-cols-1">
                    <div className="flex items-center p-4 bg-slate-50 rounded-lg">
                      <Home
                        className="h-16 w-16 text-emerald-500 mr-8"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="font-medium">
                          タイプ：{listing.category}
                        </div>
                        <div className="text-slate-700">
                          一軒家を自由に堪能できる宿泊です。
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Right Column: Booking Widget */}
            <div className="lg:w-96 flex-shrink-0">
              {/* ▼▼▼ ここに表示切り替えロジックを追加 ▼▼▼ */}
              <div className="sticky top-24">
                {searchParams.status === "success" ? (
                  <BookingSuccess />
                ) : searchParams.status === "failure" ? (
                  <BookingFailure
                    listingId={id}
                    errorMessage={
                      typeof searchParams.message === "string"
                        ? decodeURIComponent(searchParams.message)
                        : "予期せぬエラーが発生しました。"
                    }
                  />
                ) : (
                  <BookingCalendar
                    listing={listing}
                    reservations={reservations}
                  />
                )}
              </div>
              {/* ▲▲▲ ここまで ▲▲▲ */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
