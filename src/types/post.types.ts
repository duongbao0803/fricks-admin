import { CommonModel } from "./common.types";

export interface PostData extends CommonModel {
  productId: number;
  title: string;
  content: string;
  image: string;
}
