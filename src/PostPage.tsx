import { useState } from 'react';
import PostCard, { User } from './PostCard';
import { Post } from './types/Post';
import CommentsPage from './CommentsPage';
import PostCardForm from './PostCardForm';
import Card from '@mui/material/Card/Card';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import Avatar from '@mui/material/Avatar/Avatar';
import red from '@mui/material/colors/red';
import { CardContent, IconButton } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

type PostPageProps = {
    actualUser?: User
}
export default function PostPage(props: PostPageProps) {
    const posts: Post[] = [
        {title: "Gil tries Minecraft", publishDate: "February 28, 2025", user: {id: 2, name: "Gil", iconImage: "/src/assets/minecraft.jpg"}, image: "/src/assets/minecraft.jpg", description: "The best game in the world of 2010. The game taught us important life lessons about " +
            "building a better world through hard work, resources and friendship.", 
            comments:[{writer: "Itay", message: "Awesome :)"}, {writer: "Minecraft player", message: "Creative mode for the win"}]},
            {title: "Super Sonic", publishDate: "February 28, 2025", user: {id: 3, name: "Ofir"}, image: "/src/assets/Sonic.jpg", description: "Sonic sonic, super sonic", 
                comments: [{writer: "Itay", message: "Mario is better"}]}
    ];

    const [userToFilterBy, setUserToFilterBy] = useState<User | undefined>(undefined);
    
    const [postToShowComments, setPostToShowComments] = useState<Post | null>(null)
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);
    return (
        postToShowComments === null && postToEdit === null ?
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {userToFilterBy &&
             <Card sx={{minWidth: 400, maxWidth: 445}}>
            <CardHeader
                title={userToFilterBy.name}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={userToFilterBy.iconImage}>
                      {userToFilterBy.name[0]}
                    </Avatar>
                  }
            />
            <CardContent>
            <IconButton aria-label="comments" style={{outline: 'none'}} onClick={() => setUserToFilterBy(undefined)}>
                    <KeyboardReturnIcon style={{marginRight: '5px'}}/>
                </IconButton>
            </CardContent>
            </Card>
            }
            {posts.filter((post) => userToFilterBy === undefined || post.user.id === userToFilterBy.id).map((post) => {
                return <PostCard post={post} showPostComments={() => setPostToShowComments(post)} editPost={() => setPostToEdit(post)} isActualUser={post.user === props.actualUser} setUser={(newUser: User) => setUserToFilterBy(newUser)}/>
            })}
        </div>
        : 
        ( postToShowComments !== null ?
            <CommentsPage post={postToShowComments} closeCommentsForm={() => setPostToShowComments(null)} isCurrentUserPost={props.actualUser?.id === postToShowComments.user.id}/>
            : 
            postToEdit && <PostCardForm post={postToEdit} hideForm={() => setPostToEdit(null)}/>
        )
        
    )
}