import { useState } from 'react';
import PostCard, { Post } from './PostCard';
import CommentsPage from './CommentsPage';
import PostCardForm from './PostCardForm';

export default function PostPage() {
    const posts: Post[] = [
        {title: "Gil tries Minecraft", publishDate: "February 28, 2025", user: "Gil", image: "/src/assets/minecraft.jpg", description: "The best game in the world of 2010. The game taught us important life lessons about " +
            "building a better world through hard work, resources and friendship.", 
            comments:[{writer: "Itay", message: "Awesome :)"}, {writer: "Minecraft player", message: "Creative mode for the win"}]},
            {title: "Super Sonic", publishDate: "February 28, 2025", user: "Ofir", image: "/src/assets/Sonic.jpg", description: "Sonic sonic, super sonic", 
                comments: [{writer: "Itay", message: "Mario is better"}]}
    ];
    const [userPosts, setUserPosts] = useState<string | undefined>(undefined);
    const [postToShowComments, setPostToShowComments] = useState<Post | null>(null)
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);
    return (
        postToShowComments === null && postToEdit === null ?
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {posts.filter((post) => userPosts === undefined || post.user === userPosts).map((post) => {
                return <PostCard post={post} showPostComments={() => setPostToShowComments(post)} editPost={() => setPostToEdit(post)} isUser={post.user === userPosts} setUser={(newUser: string) => setUserPosts(newUser)}/>
            })}
        </div>
        : 
        ( postToShowComments !== null ?
            <CommentsPage post={postToShowComments} closeCommentsForm={() => setPostToShowComments(null)}/>
            : 
            postToEdit && <PostCardForm post={postToEdit} hideForm={() => setPostToEdit(null)}/>
        )
        
    )
}