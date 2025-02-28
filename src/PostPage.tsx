import { useState } from 'react';
import PostCard, { Post } from './PostCard';
import CommentsPage from './CommentsPage';

export default function PostPage() {
    const posts: Post[] = [
        {title: "Gil tries Minecraft", publishDate: "February 28, 2025", user: "Gil", image: "/src/assets/minecraft.jpg", description: "The best game in the world of 2010. The game taught us important life lessons about " +
            "building a better world through hard work, resources and friendship.", 
            comments:[{writer: "Itay", message: "Awesome :)"}, {writer: "Minecraft player", message: "Creative mode for the win"}]},
            {title: "Super Sonic", publishDate: "February 28, 2025", user: "Ofir", image: "/src/assets/Sonic.jpg", description: "Sonic sonic, super sonic", 
                comments: [{writer: "Itay", message: "Mario is better"}]}
    ];
    const [postToShowComments, setPostToShowComments] = useState<Post | null>(null)
    return (
        postToShowComments === null ?
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {posts.map((post) => {
                return <PostCard post={post} showPostComments={() => setPostToShowComments(post)} isUser={post.user === "Gil"}/> /** Obviously user check is stub for now */
            })}
        </div>
        : 
        <CommentsPage post={postToShowComments}/>
        
    )
}