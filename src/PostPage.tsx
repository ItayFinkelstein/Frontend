import { useState } from 'react';
import PostCard, { Post, User } from './PostCard';
import CommentsPage from './CommentsPage';
import PostCardForm from './PostCardForm';

export default function PostPage() {
    const posts: Post[] = [
        {title: "Gil tries Minecraft", publishDate: "February 28, 2025", user: {id: 2, name: "Gil"}, image: "/src/assets/minecraft.jpg", description: "The best game in the world of 2010. The game taught us important life lessons about " +
            "building a better world through hard work, resources and friendship.", 
            comments:[{writer: "Itay", message: "Awesome :)"}, {writer: "Minecraft player", message: "Creative mode for the win"}]},
            {title: "Super Sonic", publishDate: "February 28, 2025", user: {id: 3, name: "Ofir"}, image: "/src/assets/Sonic.jpg", description: "Sonic sonic, super sonic", 
                comments: [{writer: "Itay", message: "Mario is better"}]}
    ];

    const users: User[] = [
        {id: 1, name: "Itay"}, {id: 2, name: "Gil"}, {id: 3, name: "Ofir"}
    ];

    const [userToFilterBy, setUserToFilterBy] = useState<User | undefined>(undefined);
    const actualUser = users[1];
    const [postToShowComments, setPostToShowComments] = useState<Post | null>(null)
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);
    return (
        postToShowComments === null && postToEdit === null ?
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {posts.filter((post) => userToFilterBy === undefined || post.user.id === userToFilterBy.id).map((post) => {
                return <PostCard post={post} showPostComments={() => setPostToShowComments(post)} editPost={() => setPostToEdit(post)} isActualUser={post.user === actualUser} setUser={(newUser: User) => setUserToFilterBy(newUser)}/>
            })}
        </div>
        : 
        ( postToShowComments !== null ?
            <CommentsPage post={postToShowComments} closeCommentsForm={() => setPostToShowComments(null)} isCurrentUserPost={actualUser.id === postToShowComments.user.id}/>
            : 
            postToEdit && <PostCardForm post={postToEdit} hideForm={() => setPostToEdit(null)}/>
        )
        
    )
}