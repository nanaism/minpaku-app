// 宿泊施設（Listing）のダミーデータ
export const featuredListings = [
  // --- ユーザー様ご提示のデータ ---
  {
    id: "listing1",
    title: "京都の風情ある町家一棟貸し",
    category: "町家",
    price: 18500,
    location_value: "京都市東山区",
    listing_images: [
      {
        id: "img1",
        listing_id: "listing1",
        url: "/kyoto_machiya.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 2,
    bathroom_count: 1,
    guest_count: 4,
    user_id: "user_dummy_1",
    description:
      "京都の風情ある町家を一棟貸し切りでご利用いただけます。清水寺や祇園からも徒歩圏内で観光に最適です。伝統的な和の雰囲気をお楽しみください。",
    created_at: new Date("2024-11-15").toISOString(),
  },
  {
    id: "listing2",
    title: "沖縄・恩納村 プライベートビーチ前の絶景ヴィラ",
    category: "ヴィラ",
    price: 32000,
    location_value: "沖縄県恩納村",
    listing_images: [
      {
        id: "img2",
        listing_id: "listing2",
        url: "/okinawa_villa.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 3,
    bathroom_count: 2,
    guest_count: 6,
    user_id: "user_dummy_2",
    description:
      "沖縄本島の美しい海岸線に位置するプライベートヴィラ。目の前はエメラルドグリーンの海。シュノーケリングやBBQを楽しめる設備も完備。家族旅行や友人同士の特別な時間に最適です。",
    created_at: new Date("2024-12-20").toISOString(),
  },
  {
    id: "listing3",
    title: "渋谷駅徒歩5分、モダンなデザイナーズマンション",
    category: "マンション",
    price: 21000,
    location_value: "東京都渋谷区",
    listing_images: [
      {
        id: "img3",
        listing_id: "listing3",
        url: "/shibuya_apartment.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 1, // 1LDKを想定
    bathroom_count: 1,
    guest_count: 2,
    user_id: "user_dummy_3",
    description:
      "渋谷駅から徒歩5分の便利な立地。モダンなデザインのマンションで快適な都市滞在を。観光やビジネスの拠点として最適で、周辺には話題のレストランやショッピングスポットが豊富です。",
    created_at: new Date("2025-01-10").toISOString(),
  },
  {
    id: "listing4",
    title: "世界遺産・白川郷の合掌造りを体験",
    category: "古民家",
    price: 25000,
    location_value: "岐阜県大野郡白川村",
    listing_images: [
      {
        id: "img4",
        listing_id: "listing4",
        url: "/shirakawago.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 3,
    bathroom_count: 1,
    guest_count: 5,
    user_id: "user_dummy_4",
    description:
      "世界遺産・白川郷の集落に佇む伝統的な合掌造りの宿。囲炉裏を囲んで、ゆったりとした時間をお過ごしいただけます。日本の原風景の中で、忘れられない体験をどうぞ。",
    created_at: new Date("2025-02-01").toISOString(),
  },

  // --- ここから追加データ ---
  {
    id: "listing5",
    title: "箱根の森に佇む、源泉掛け流し露天風呂付きの離れ",
    category: "旅館",
    price: 45000,
    location_value: "神奈川県足柄下郡箱根町",
    listing_images: [
      {
        id: "img5",
        listing_id: "listing5",
        url: "/hakone_onsen.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 2,
    bathroom_count: 2,
    guest_count: 4,
    user_id: "user_dummy_5",
    description:
      "箱根の豊かな自然に囲まれたプライベートな離れ。誰にも邪魔されず、源泉掛け流しの専用露天風呂を満喫できます。記念日や特別な日のご利用に最適な、贅沢な空間です。",
    created_at: new Date("2025-02-15").toISOString(),
  },
  {
    id: "listing6",
    title: "札幌・大通公園近くのスタイリッシュなコンドミニアム",
    category: "マンション",
    price: 15000,
    location_value: "札幌市中央区",
    listing_images: [
      {
        id: "img6",
        listing_id: "listing6",
        url: "/sapporo_condo.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 2,
    bathroom_count: 1,
    guest_count: 4,
    user_id: "user_dummy_1", // 既存ホストの別物件
    description:
      "大通公園や狸小路商店街まで徒歩圏内。キッチンや洗濯機も完備しており、長期滞在にも対応。冬の雪まつりや夏のビアガーデンなど、四季を通じて札幌観光の拠点に。",
    created_at: new Date("2025-02-20").toISOString(),
  },
  {
    id: "listing7",
    title: "福岡・博多駅直結！ビジネス＆観光に最適なホテルライク空間",
    category: "アパート",
    price: 9800,
    location_value: "福岡市博多区",
    listing_images: [
      {
        id: "img7",
        listing_id: "listing7",
        url: "/fukuoka_hakata.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 1,
    bathroom_count: 1,
    guest_count: 2,
    user_id: "user_dummy_6",
    description:
      "博多駅直結のビル内にある、コンパクトで機能的なお部屋です。出張や一人旅に最適。天神や中洲へのアクセスも抜群で、福岡のグルメやショッピングを満喫できます。",
    created_at: new Date("2025-03-01").toISOString(),
  },
  {
    id: "listing8",
    title: "軽井沢の森と暖炉、ウッドデッキで過ごすデザイナーズロッジ",
    category: "一軒家",
    price: 38000,
    location_value: "長野県北佐久郡軽井沢町",
    listing_images: [
      {
        id: "img8",
        listing_id: "listing8",
        url: "/karuizawa_lodge.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 3,
    bathroom_count: 2,
    guest_count: 8,
    user_id: "user_dummy_7",
    description:
      "浅間山を望む静かな森に佇む、洗練されたデザインのロッジ。冬は暖炉の火に癒され、夏は広いウッドデッキでBBQを。ご家族や友人グループでのリトリートにどうぞ。",
    created_at: new Date("2025-03-05").toISOString(),
  },
  {
    id: "listing9",
    title: "金沢・ひがし茶屋街、加賀友禅に彩られた古民家宿",
    category: "町家",
    price: 29000,
    location_value: "石川県金沢市",
    listing_images: [
      {
        id: "img9",
        listing_id: "listing9",
        url: "/kanazawa_chaya.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 2,
    bathroom_count: 1,
    guest_count: 4,
    user_id: "user_dummy_4", // 既存ホストの別物件
    description:
      "ひがし茶屋街のメインストリートから一本入った静かな場所。加賀友禅の襖絵や九谷焼の器など、金沢の伝統工芸に触れられる空間です。着物での街歩きの拠点にも最適です。",
    created_at: new Date("2025-03-10").toISOString(),
  },
  {
    id: "listing10",
    title: "富士山を望むグランピングキャビン【焚き火＆BBQ可】",
    category: "キャビン",
    price: 22000,
    location_value: "山梨県南都留郡富士河口湖町",
    listing_images: [
      {
        id: "img10",
        listing_id: "listing10",
        url: "/fuji_glamping.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 1,
    bathroom_count: 1,
    guest_count: 3,
    user_id: "user_dummy_8",
    description:
      "河口湖畔の丘の上から、雄大な富士山を独り占めできるキャビン。面倒な準備は不要、手ぶらで本格的なアウトドア体験が楽しめます。満点の星空の下での焚き火は格別です。",
    created_at: new Date("2025-03-12").toISOString(),
  },
  {
    id: "listing11",
    title: "大阪なんば・道頓堀へ徒歩3分！遊び心のデザイナーズルーム",
    category: "アパート",
    price: 12800,
    location_value: "大阪市中央区",
    listing_images: [
      {
        id: "img11",
        listing_id: "listing11",
        url: "/osaka_namba.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 2,
    bathroom_count: 1,
    guest_count: 5,
    user_id: "user_dummy_6",
    description:
      "大阪ミナミの中心地！グリコの看板まですぐ。ネオンをモチーフにしたユニークな内装で、滞在中もワクワクが止まらない！たこ焼き器も完備し、大阪グルメを部屋でも楽しめます。",
    created_at: new Date("2025-03-18").toISOString(),
  },
  {
    id: "listing12",
    title: "瀬戸内・直島のアートな一棟貸しヴィラ【オーシャンビュー】",
    category: "ヴィラ",
    price: 35000,
    location_value: "香川県香川郡直島町",
    listing_images: [
      {
        id: "img12",
        listing_id: "listing12",
        url: "/naoshima_art.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 1,
    bathroom_count: 1,
    guest_count: 3,
    user_id: "user_dummy_9",
    description:
      "部屋自体がひとつのアート作品。大きな窓からは穏やかな瀬戸内海を一望できます。美術館巡りの拠点として、また、何もしない贅沢を味わう場所としてお使いください。",
    created_at: new Date("2025-03-22").toISOString(),
  },
  {
    id: "listing13",
    title: "ペットと泊まれる！伊豆高原のドッグラン付きコテージ",
    category: "コテージ",
    price: 26000,
    location_value: "静岡県伊東市",
    listing_images: [
      {
        id: "img13",
        listing_id: "listing13",
        url: "/izu_pet.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 2,
    bathroom_count: 1,
    guest_count: 4,
    user_id: "user_dummy_10",
    description:
      "愛犬と一緒に気兼ねなく過ごせる一棟貸しコテージ。広々とした専用ドッグランで、ワンちゃんも大喜び間違いなし。周辺にはペット同伴可能なカフェや観光スポットも多数あります。",
    created_at: new Date("2025-03-25").toISOString(),
  },
  {
    id: "listing14",
    title: "鎌倉・長谷寺近く、海と緑を感じる古民家リノベハウス",
    category: "古民家",
    price: 23500,
    location_value: "神奈川県鎌倉市",
    listing_images: [
      {
        id: "img14",
        listing_id: "listing14",
        url: "/kamakura_kominka.jpg",
        order: 0,
        created_at: new Date().toISOString(),
      },
    ],
    room_count: 3,
    bathroom_count: 2,
    guest_count: 6,
    user_id: "user_dummy_5",
    description:
      "古都・鎌倉の趣とモダンで快適な設備が融合したリノベーション古民家。長谷寺や大仏、由比ヶ浜海岸まで散歩がてら歩いて行けます。縁側でのんびりと読書をするのもおすすめです。",
    created_at: new Date("2025-04-01").toISOString(),
  },
];
