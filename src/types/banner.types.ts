import { CommonModel } from "./common.types";

export interface BannerData extends CommonModel {
  name?: string;
  title?: string;
  image?: string;
  index?: number;
}
