import { Comment } from "./Comment";

export type Post = {
  id: number;
  title: string;
  publishDate: string;
  userId: number;
  image: string;
  description: string;
  comments: Comment[];
};
