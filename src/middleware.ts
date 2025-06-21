import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// どのルートを保護対象にするかを定義します。
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/host(.*)",
  "/user-profile(.*)",
]);

// clerkMiddlewareをエクスポートします。
// これがNext.jsのミドルウェアとして機能します。
export default clerkMiddleware((auth, req) => {
  // isProtectedRouteで定義したルートにアクセスしようとしているかチェックします。
  if (isProtectedRoute(req)) {
    // 認証を要求します。
    // このauth()の呼び出し自体が、未認証ユーザーをサインインページに
    // 自動的にリダイレクトさせるトリガーとなります。
    auth();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
