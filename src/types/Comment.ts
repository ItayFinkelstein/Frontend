export type Comment = {
  _id: string;
  postId: string;
  owner: string;
  publishDate?: string;
  message: string;
};
