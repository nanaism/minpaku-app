import { createListingAction } from "../_actions/listings";
import { BasicListingForm } from "../_components/basic-listing-form";

/**
 * 新規リスティング作成ページコンポーネント
 * BasicListingFormを「create」モードで表示
 */
export default async function CreateListingPage() {
  return <BasicListingForm mode="create" onSubmit={createListingAction} />;
}
