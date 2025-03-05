import { Comment } from './Comment';
import { User } from './User';

export type Post = {
    title: string;
    publishDate: string;
    user: User;
    image: string;
    description: string;
    comments: Comment[];
};
