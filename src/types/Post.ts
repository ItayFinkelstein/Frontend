import { Comment } from "./Comment";

export type Post = {
  title: string;
  publishDate: string;
  userId: number;
  image: string;
  description: string;
  comments: Comment[];
};
