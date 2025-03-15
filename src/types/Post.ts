import { Comment } from "./Comment";

export type Post = {
  _id: string;
  title: string;
  publishDate: string;
  userId: number;
  image: string;
  description: string;
  comments: Comment[];
};
