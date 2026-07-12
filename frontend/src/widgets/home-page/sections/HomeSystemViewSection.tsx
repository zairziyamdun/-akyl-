import { homeSystemViewContent } from "../model/home-system-view.data";

import { HomePhotoSplitSection } from "./HomePhotoSplitSection";

export function HomeSystemViewSection() {
  return <HomePhotoSplitSection {...homeSystemViewContent} />;
}
