import { Comment } from "./Comment";

export type Post = {
  _id: string;
  title: string;
  publishDate: string;
  owner: string;
  image?: string;
  message: string;
  commentAmount: number;
  likes: string[];
};
