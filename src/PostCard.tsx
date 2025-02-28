import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {props.post.description}
                </Typography>
            </CardContent>
        </Card>
    )
}