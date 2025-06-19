"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Tables } from "@/lib/supabase/types/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { ActionResult } from "../_actions/listings";
import { useImageUpload } from "../_hooks/use-image-upload";
import type {
  CreateListingInput,
  UpdateListingInput,
} from "../_schemas/listing";
import { CreateListingSchema, UpdateListingSchema } from "../_schemas/listing";
import { ListingFormFields } from "./listing-form-fields";
import { ListingImageGallery } from "./listing-image-gallery";

type Listing = Tables<"listings">;
type ListingImage = Tables<"listing_images">;

interface BasicListingFormProps {
  mode: "create" | "edit"; // フォームのモード（作成か編集か）
  listing?: Listing; // 編集時の既存リスティングデータ
  initialImages?: ListingImage[]; // 編集時の既存画像データ
  onSubmit: (
    formData: FormData
  ) => Promise<ActionResult<{ listingId: string }>>;
}

/**
 * 物件情報の作成と編集のための共通フォームコンポーネントです。
 * モード（作成/編集）に応じて適切なフォーム要素と振る舞いを提供します。
 */
export function BasicListingForm({
  mode,
  listing,
  initialImages = [],
  onSubmit,
}: BasicListingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // フォームの初期値を設定
  const defaultValues =
    mode === "edit" && listing
      ? {
          title: listing.title || "",
          description: listing.description || "",
          category: listing.category || "",
          location_value: listing.location_value || "",
          price: listing.price ?? undefined,
          room_count: listing.room_count ?? 1,
          bathroom_count: listing.bathroom_count ?? 1,
          guest_count: listing.guest_count ?? 1,
        }
      : {
          title: "",
          description: "",
          category: "",
          location_value: "",
          price: undefined,
          room_count: 1,
          bathroom_count: 1,
          guest_count: 1,
          images: [],
        };

  // 適切なスキーマを選択
  const schema = mode === "edit" ? UpdateListingSchema : CreateListingSchema;

  // フォームフックの初期化
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm<CreateListingInput | UpdateListingInput>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // 画像処理フック
  const {
    existingImages,
    imagePreviews,
    imageFiles,
    imagesToDelete,
    totalCurrentImageCount,
    handleImageChange,
    removeImage,
    markExistingImageForDeletion,
  } = useImageUpload({
    initialImages,
    onImagesChange: (files) => {
      if (mode === "create") {
        setValue("images", files, { shouldValidate: true, shouldDirty: true });
      } else {
        if (files.length > 0) {
          // 編集モードの場合、フォームを「dirty」状態にして変更を検知
          setValue("title", watch("title"), { shouldDirty: true });
        }
      }
    },
    maxImages: 3,
  });

  const handleFormSubmit = async (
    data: CreateListingInput | UpdateListingInput
  ) => {
    // 編集モードで変更がない場合は何もしない
    const hasImageChanges = imageFiles.length > 0 || imagesToDelete.length > 0;
    if (mode === "edit" && !isDirty && !hasImageChanges) {
      return;
    }

    // 画像は少なくとも1枚必要
    if (totalCurrentImageCount === 0) {
      setServerError("少なくとも1枚の写真が必要です。");
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const formData = new FormData();

    // フォームデータをFormDataに追加
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images" && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // 画像データの追加（モードに応じた処理）
    if (mode === "create") {
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    } else {
      // 編集モードの場合
      imageFiles.forEach((file) => {
        formData.append("newImages", file);
      });

      imagesToDelete.forEach((id) => {
        formData.append("deletedImageIds", id);
      });
    }

    try {
      // サーバー関数を実行
      const result = await onSubmit(formData);

      if (result.success) {
        // 成功時はフォームをリセットしてダッシュボードへリダイレクト
        if (mode === "create") {
          reset();
        } else {
          reset(data);
        }
        router.push("/host/dashboard");
      } else {
        setServerError(result.error || "エラーが発生しました");
      }
    } catch (error) {
      console.error(`Error submitting ${mode} form:`, error);
      setServerError("予期せぬエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-col space-y-6 items-center justify-center p-12">
        <Button
          variant="link"
          size="sm"
          asChild
          className="text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <Link href="/host/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ダッシュボードに戻る
          </Link>
        </Button>

        <h1 className="text-4xl font-bold text-gray-800">
          {mode === "create" ? "新しい物件を登録しましょう" : "物件情報を編集"}
        </h1>
        <p className="text-gray-600">
          {mode === "create"
            ? "内容は、あとから編集することも可能です！"
            : "更新ボタンを押すと、すぐに情報が反映されます！"}
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Card className="shadow-md border-gray-200">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-2xl text-gray-800">
                  <span className="text-emerald-500 mr-2">🏡</span> 掲載情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 px-6 pt-6">
                {/* 物件情報入力フィールド */}
                <ListingFormFields
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                />
                <Separator className="bg-gray-200" />
                {/* 画像ギャラリー */}
                <ListingImageGallery
                  existingImages={existingImages}
                  imagePreviews={imagePreviews}
                  totalCurrentImageCount={totalCurrentImageCount}
                  maxImages={3}
                  onExistingImageDelete={markExistingImageForDeletion}
                  onNewImageDelete={removeImage}
                  onImageAdd={handleImageChange}
                />
                {/* 画像バリデーションエラーの表示 */}
                {mode === "create" &&
                  (errors as FieldErrors<CreateListingInput>).images && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {typeof (errors as FieldErrors<CreateListingInput>).images
                        ?.message === "string"
                        ? (errors as FieldErrors<CreateListingInput>).images
                            ?.message
                        : "写真に関するエラーがあります。"}
                    </p>
                  )}
                {/* サーバーエラー表示 */}
                {serverError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md mt-4">
                    <span
                      className="text-red-600 text-center font-medium"
                      role="alert"
                    >
                      エラー: {serverError}
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t border-gray-100 p-6">
                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    isSubmitting ||
                    (mode === "create" && totalCurrentImageCount === 0) ||
                    (mode === "edit" && totalCurrentImageCount === 0)
                  }
                >
                  {isSubmitting
                    ? "送信中..."
                    : mode === "create"
                    ? "物件を登録する"
                    : "物件情報を更新する"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
