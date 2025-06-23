# Yadori - フルスタック民泊予約プラットフォーム

[![Deploy on yadori.aiichiro.jp](https://img.shields.io/badge/Live%20Demo-yadori.aiichiro.jp-brightgreen?style=for-the-badge&logo=vercel)](https://yadori.aiichiro.jp/)

泊まる人（ゲスト）と、泊める人（ホスト）を繋ぐ、Airbnbライクな民泊予約アプリケーションです。
物件の登録から予約、そして管理まで、民泊プラットフォームに求められる全ての機能を網羅しています。

**👇 今すぐサイトを体験！**
### [https://yadori.aiichiro.jp/](https://yadori.aiichiro.jp/)

![Yadoriのスクリーンショット](https://github.com/user-attachments/assets/1d2ef327-87f1-4d4d-80e7-91eeb4f0a4ea)

---

## 🌟 プロジェクトの特徴 (Features)

「Yadori」は、ゲストとホスト、双方のユーザーに最適化された機能と体験を提供します。

-   **👤 安全で簡単なユーザー認証**
    -   先進的な認証プラットフォーム **Clerk** を導入。メールアドレス、Google/GitHubアカウントなど多彩な方法で、安全かつ簡単にサインアップ/ログインできます。

-   **🏠 ホスト向け：包括的な物件管理機能**
    -   物件の種類（一軒家、マンション等）、設備、宿泊料金、写真などを登録・編集できる、直感的なインターフェース。
    -   自身の登録物件や予約状況を一覧できる、専用のホストダッシュボード。

-   **✈️ ゲスト向け：シームレスな予約体験**
    -   豊富な写真や詳細な設備情報から、泊まりたい物件を簡単に検索・閲覧。
    -   カレンダーベースのUIで空室状況を視覚的に確認し、希望の日程でスムーズに予約を完了できます。
    -   自身の予約状況や過去の宿泊履歴を確認できる、専用のゲストダッシュボード。

-   **✨ モダンで高速なUI/UX**
    -   **shadcn/ui** と **Tailwind CSS** を採用し、美しく、直感的で、完全にレスポンシブなデザインを実現。
    -   **Next.js** のサーバーコンポーネントとクライアントコンポーネントを適切に使い分け、高速なページ表示とリッチなインタラクションを両立。

## 💡 こだわりのポイント： 設計思想

### 二つの側面を持つマーケットプレイスの構築

「Yadori」の設計の核心は、**ホスト（供給側）**と**ゲスト（需要側）**という、異なるニーズを持つ2種類のユーザーが共存する「ツーサイドマーケットプレイス」をいかにスムーズに機能させるか、という点にあります。
-   **役割に応じたUI/UX**: ログインしたユーザーの役割（ホストかゲストか、あるいは両方か）に応じて、表示されるメニューやダッシュボードが動的に変化し、それぞれのタスクに集中できる設計になっています。

### マネージドサービスの活用による迅速で堅牢な開発

このプロジェクトでは、認証に **Clerk**、データベースに **Supabase** という強力なマネージドサービス（BaaS/IDaaS）を積極的に採用しました。
これにより、複雑でセキュリティ要件の厳しい認証システムやデータベース管理を自分たちで構築する手間を省き、**アプリケーション本来のユニークな機能（物件管理や予約ロジック）の開発に集中**することができました。
これは、モダンなWeb開発における、効率性と堅牢性を両立するための戦略的な技術選定です。

## 🛠️ 使用技術 (Tech Stack)

このプラットフォームは、スケーラビリティと開発者体験を重視した最新の技術スタックで構築されています。

-   **Framework**: **Next.js** (App Router), **React**, **TypeScript**
-   **Authentication**: **Clerk**
-   **Database**: **Supabase**
-   **UI & Styling**: **shadcn/ui**, **Tailwind CSS**
-   **Deployment**: **Vercel**

## 🚀 ローカルでの実行方法 (Getting Started)

このプロジェクトは、ClerkとSupabaseとの連携が必須です。

1.  **リポジトリをクローン**
    ```sh
    git clone https://github.com/your-username/your-repository.git
    ```
2.  **ディレクトリに移動**
    ```sh
    cd your-repository
    ```
3.  **依存関係をインストール**
    ```sh
    npm install
    # または yarn install
    ```
4.  **環境変数を設定**
    `.env.local.example` を参考に `.env.local` ファイルを作成し、ClerkとSupabaseのプロジェクトから取得したAPIキーやURLを設定してください。
    -   Clerk (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)
    -   Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

5.  **開発サーバーを起動**
    ```sh
    npm run dev
    # または yarn dev
    ```
    ブラウザで `http://localhost:3000` を開いてください。
