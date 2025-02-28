import PostCard, { Post } from './PostCard';

export default function PostPage() {
    const posts: Post[] = [
        {title: "Gil tries Minecraft", publishDate: "February 28, 2025", image: "/src/assets/minecraft.jpg", description: "The best game in the world of 2010. The game taught us important life lessons about " +
            "building a better world through hard work, resources and friendship."},
            {title: "Super Sonic", publishDate: "February 28, 2025", image: "/src/assets/Sonic.jpg", description: "Sonic sonic, super sonic"}
    ];
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {posts.map((post) => {
            return <PostCard post={post}/>
        })}
        </div>
        
    )
}