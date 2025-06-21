import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getListings } from "@/lib/supabase/database/listings";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

/**
 * すべてのリスティングを表示するページ
 */
export default async function ListingsPage() {
  // getListingsには画像を取得する機能がないため、まずリスティングを取得
  const allListings = await getListings();

  // トップページで作成した `getFeaturedListings` を再利用して画像付きデータを取得
  // 件数制限をなくすため、非常に大きな数を指定（※本来はページネーション等を実装）
  // 修正： `getFeaturedListings` は使わず、`getListingsWithDetails` のような関数を準備するのが理想だが、
  // 今回は既存の `getListings` を拡張して画像を取得する
  // 追記：getListingByIdをmap内で使うのはパフォーマンスが悪いので、
  // listings.tsに新しい関数を追加するのがベストプラクティスです。
  // 今回は既存の関数で対応するため、このまま進めます。
  // --> 修正案：getListingsを拡張するのが良さそう。今回は `listings.ts` を直接編集します。

  // (getListingsで画像も一緒に取得するように後で修正します)

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            すべての掲載
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            旅を彩る、ユニークな宿泊先を見つけよう。
          </p>
        </div>

        {/* リスティングがない場合の表示 */}
        {allListings.length === 0 ? (
          <div className="text-center py-20 border border-dashed rounded-lg">
            <h2 className="text-2xl font-semibold text-slate-700">
              掲載がありません
            </h2>
            <p className="mt-2 text-slate-500">
              現在、利用可能な宿泊施設はありません。
            </p>
          </div>
        ) : (
          // リスティング一覧
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {allListings.map((listing) => (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="group"
              >
                <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        fill
                        // 画像がない場合を考慮
                        src={listing.listing_images?.[0]?.url || "/shibuya.jpg"}
                        alt={listing.title}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-4 space-y-2">
                    <CardTitle className="text-lg font-semibold leading-snug truncate">
                      {listing.title}
                    </CardTitle>
                    <CardDescription className="flex items-center text-sm text-slate-500">
                      <MapPin className="h-4 w-4 mr-1.5" />
                      {listing.location_value}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <p className="font-semibold text-slate-800">
                      ¥{listing.price.toLocaleString()}
                      <span className="ml-1 font-normal text-sm text-slate-600">
                        / 泊
                      </span>
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
