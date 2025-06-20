"use server";

/**
 * リスティング管理モジュール
 *
 * このモジュールは物件リスティングの操作に関する機能を提供します。
 * リスティングの一覧取得、詳細取得、作成、更新、削除などの
 * 基本的なCRUD操作をサポートします。
 */

import { createServerClient } from "../server";
import { Tables, TablesInsert, TablesUpdate } from "../types/database.types";

type NewListing = TablesInsert<"listings">;
type UpdateListing = TablesUpdate<"listings">;
type Listing = Tables<"listings">;
type ListingImage = Tables<"listing_images">;

/**
 * トップページに表示する特集リスティング用の型
 * リスティング情報に画像配列を含む
 */
export type ListingWithImages = Listing & {
  listing_images: ListingImage[];
};

// ... getFeaturedListings 関数の内部 ...

export const getFeaturedListings = async (
  limit: number = 4
): Promise<ListingWithImages[]> => {
  const supabase = await createServerClient();

  // ▼▼▼ 代替案の修正箇所 ▼▼▼
  const { data, error } = await supabase
    .from("listings")
    // まずlisting_imagesを全て取得。ソートはここで行わない
    .select("*, listing_images(*)")
    .order("created_at", { ascending: false })
    .limit(limit);
  // ▲▲▲ 修正ここまで ▲▲▲

  if (error) {
    console.error("Error fetching featured listings:", error);
    throw new Error(`Error fetching featured listings: ${error.message}`);
  }

  // SupabaseのJOINでは、関連データがない場合にnullになる可能性があるため、
  // listing_imagesが常に配列であることを保証する
  const listingsWithEnsuredImages = data.map((item) => {
    // ▼▼▼ ここでJavaScript側でソートする ▼▼▼
    const sortedImages = item.listing_images
      ? [...item.listing_images].sort((a, b) => a.order - b.order)
      : [];
    return {
      ...item,
      listing_images: sortedImages,
    };
    // ▲▲▲ ソート処理ここまで ▲▲▲
  });

  return listingsWithEnsuredImages as ListingWithImages[];
};

/**
 * 条件付きでリスティングの一覧を取得する
 *
 * オプションのフィルタパラメータを使用して、条件に合うリスティングを
 * データベースから取得します。フィルタが指定されない場合はすべての
 * リスティングを返します。
 *
 * @param params フィルタリング条件（ユーザーID、カテゴリ、場所など）
 * @returns リスティングオブジェクトの配列
 */
// ... 既存のコード ...

// getListings 関数をまるごと以下に置き換えてください

/**
 * 条件付きでリスティングの一覧を画像付きで取得する
 *
 * オプションのフィルタパラメータを使用して、条件に合うリスティングを
 * データベースから画像情報とともに取得します。フィルタが指定されない場合はすべての
 * リスティングを返します。
 *
 * @param params フィルタリング条件（ユーザーID、カテゴリ、場所など）
 * @returns 画像情報を含むリスティングオブジェクトの配列
 */
export const getListings = async (params?: {
  userId?: string;
  category?: string;
  location?: string;
  minBathrooms?: number;
  minRooms?: number;
  minGuests?: number;
  maxPrice?: number;
}) => {
  const supabase = await createServerClient();

  // ▼▼▼ 修正点: select句から order() を削除 ▼▼▼
  let query = supabase
    .from("listings")
    .select("*, listing_images(*)") // ソートはJS側で行うため、シンプルに全画像を取得
    .order("created_at", { ascending: false });
  // ▲▲▲ 修正ここまで ▲▲▲

  // フィルタが提供されている場合は適用 (変更なし)
  if (params) {
    if (params.userId) {
      query = query.eq("user_id", params.userId);
    }
    if (params.category) {
      query = query.eq("category", params.category);
    }
    if (params.location) {
      query = query.eq("location_value", params.location);
    }
    if (params.minBathrooms) {
      query = query.gte("bathroom_count", params.minBathrooms);
    }
    if (params.minRooms) {
      query = query.gte("room_count", params.minRooms);
    }
    if (params.minGuests) {
      query = query.gte("guest_count", params.minGuests);
    }
    if (params.maxPrice) {
      query = query.lte("price", params.maxPrice);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching listings:", error);
    throw new Error(error.message);
  }

  // ▼▼▼ 修正点: 取得後にJSでソート処理を追加 ▼▼▼
  const listingsWithSortedImages = data.map((item) => {
    // 画像が存在する場合のみソートを実行
    const sortedImages = item.listing_images
      ? [...item.listing_images].sort((a, b) => a.order - b.order)
      : [];

    return {
      ...item,
      listing_images: sortedImages,
    };
  });
  // ▲▲▲ 修正ここまで ▲▲▲

  // ListingWithImages型を再利用
  return listingsWithSortedImages as ListingWithImages[];
};

/**
 * ホストの物件一覧と関連情報（画像、予約）を一括で取得する
 *
 * @param userId ホストのユーザーID
 * @returns ホストの物件情報（画像と予約を含む）の配列
 */
export type HostListingWithDetails = Listing & {
  listing_images: ListingImage[];
  reservations: Tables<"reservations">[];
};

export const getHostListingsWithDetails = async (
  userId: string
): Promise<HostListingWithDetails[]> => {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*, listing_images(*), reservations(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching host listings with details:", error);
    throw new Error(
      `Error fetching host listings with details: ${error.message}`
    );
  }

  // 紐付くデータが存在しない場合は空の配列を返す
  const listingsWithEnsuredArrays = data.map((item) => ({
    ...item,
    listing_images: item.listing_images || [],
    reservations: item.reservations || [],
  }));

  return listingsWithEnsuredArrays as HostListingWithDetails[];
};

/**
 * IDでリスティングとその画像を取得する
 */
export const getListingById = async (listingId: string) => {
  const supabase = await createServerClient();

  const { data: listing, error: listingError } = await supabase
    .from("listings")
    .select("*")
    .eq("id", listingId)
    .single();

  if (listingError) {
    console.error("Error fetching listing:", listingError);
    throw new Error(`Error fetching listing: ${listingError.message}`);
  }

  // このリスティングの画像を取得
  const { data: images, error: imagesError } = await supabase
    .from("listing_images")
    .select("*")
    .eq("listing_id", listingId)
    .order("order", { ascending: true });

  if (imagesError) {
    console.error("Error fetching listing images:", imagesError);
    throw new Error(`Error fetching listing images: ${imagesError.message}`);
  }

  return {
    listing: listing as Listing,
    images: images as ListingImage[],
  };
};

/**
 * 新しいリスティングを作成する
 *
 * リスティング情報と、オプションで関連画像を作成します。
 */
export const createListing = async (
  listing: NewListing,
  images?: { url: string; order: number }[]
) => {
  const supabase = await createServerClient();

  const { data: newListing, error: listingError } = await supabase
    .from("listings")
    .insert(listing)
    .select()
    .single();

  if (listingError) {
    console.error("Error creating listing:", listingError);
    throw new Error(`Error creating listing: ${listingError.message}`);
  }

  // 画像が提供されている場合は追加
  if (images && images.length > 0) {
    const listingImages = images.map((image) => ({
      listing_id: newListing.id,
      url: image.url,
      order: image.order,
    }));

    const { error: imagesError } = await supabase
      .from("listing_images")
      .insert(listingImages);

    if (imagesError) {
      console.error("Error adding listing images:", imagesError);
      throw new Error(`Error adding listing images: ${imagesError.message}`);
    }
  }

  return newListing as Listing;
};

export const updateListing = async (
  listingId: string,
  updates: UpdateListing
) => {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("listings")
    .update(updates)
    .eq("id", listingId)
    .select()
    .single();

  if (error) {
    console.error("Error updating listing:", error);
    throw new Error(`Error updating listing: ${error.message}`);
  }

  return data as Listing;
};

/**
 * リスティングとその関連画像を削除する
 *
 * データベーススキーマのCASCADE削除により、リスティングを削除すると
 * 関連するすべての画像も自動的に削除されます。
 */
export const deleteListing = async (listingId: string) => {
  const supabase = await createServerClient();

  const { error } = await supabase
    .from("listings")
    .delete()
    .eq("id", listingId);

  if (error) {
    console.error("Error deleting listing:", error);
    throw new Error(`Error deleting listing: ${error.message}`);
  }

  return true;
};
