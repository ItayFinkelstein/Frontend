import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions, IconButton } from '@mui/material';
import FavoriteSelectedIcon from '@mui/icons-material/Favorite';
import FavoriteUnselectedIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';

export type Post = {
    title: string,
    publishDate: string,
    image: string,
    description: string
}

type PostCardProps = {
    post: Post
}

export default function PostCard(props: PostCardProps) {
    const [isLiked, setIsLiked] = useState(false)
    return (
        <Card sx={{maxWidth: 445}}>
            <CardHeader
                title={props.post.title}
                subheader={props.post.publishDate}
            />
            <CardMedia
                component="img"
                height="194"
                image={props.post.image}
                // alt={props.post.title}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {props.post.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" style={{outline: 'none'}} onClick={() => setIsLiked((curr) => !curr)}>
                    {isLiked ? <FavoriteSelectedIcon style={{color: 'red'}}/> : <FavoriteUnselectedIcon />}
                </IconButton>
            </CardActions>
        </Card>
    )
}