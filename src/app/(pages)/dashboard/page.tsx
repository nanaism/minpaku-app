import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";
import EmptyReservations from "./_components/empty-reservations";
import ReservationCard from "./_components/reservation-card";

type UserReservationDetails = {
  created_at: string | null;
  duration: unknown;
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

export default async function UserDashboardPage() {
  const user = await currentUser();

  // ユーザーがログインしていない場合はリダイレクト
  if (!user) {
    return (
      <div>
        ログインが必要なページです。ページファイルで制御し、リダイレクトを実装できます
      </div>
    );
  }

  // ダミーデータ（後でデータベースからの取得に置き換え）
  const upcomingReservations: UserReservationDetails[] = [
    {
      id: "1",
      listing_id: "listing1",
      user_id: "user_dummy_1",
      created_at: "2025-05-01T00:00:00.000Z",
      duration: "2025-06-05T00:00:00.000Z/2025-06-11T00:00:00.000Z",
      guest_count: 4,
      total_price: 40000,
      listings: {
        user_id: "user_dummy_2",
        id: "listing1",
        title: "京都の風情ある町家一棟貸し",
        location_value: "京都市東山区",
        price: 18500,
        listing_images: [{ url: "/kyoto.jpg" }],
      },
    },
  ];

  const pastReservations: UserReservationDetails[] = [];

  // ユーザーのプロフィール情報
  const userProfile = {
    name: user.username ?? "ユーザー名不明",
    email: user.emailAddresses[0].emailAddress ?? "メールアドレス不明",
    avatar: user.imageUrl ?? "/user1.jpg",
    joinDate: user.createdAt
      ? format(new Date(user.createdAt), "yyyy年M月")
      : "参加日不明",
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダーセクション */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                  <p className="text-slate-600">{userProfile.email}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="flex items-center"
                  >
                    <Link href="/host/dashboard">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>ホストになる</span>
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                <div className="flex items-center">
                  {userProfile.joinDate}に参加
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ  */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6 bg-slate-100">
              <TabsTrigger value="upcoming" className="flex-1">
                予約中
              </TabsTrigger>
              <TabsTrigger value="past" className="flex-1">
                予約履歴
              </TabsTrigger>
            </TabsList>

            {/* 予約中の宿泊施設タブ */}
            <TabsContent value="upcoming">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">予約中の宿泊施設</h2>
                </div>

                {upcomingReservations.length === 0 ? (
                  <EmptyReservations type="upcoming" />
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {upcomingReservations.map((reservation) => (
                      <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                        type="upcoming"
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* 過去の宿泊履歴タブ */}
            <TabsContent value="past">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">過去の宿泊履歴</h2>

                {pastReservations.length === 0 ? (
                  <EmptyReservations type="past" />
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {pastReservations.map((reservation) => (
                      <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                        type="past"
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
