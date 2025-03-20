import { Comment } from "./Comment";

export type Post = {
  _id: string;
  title: string;
  publishDate: string;
  owner: string;
  image?: string;
  message: string;
  comments: Comment[];
  likes: string[];
};
