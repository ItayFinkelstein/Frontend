import Card from "@mui/material/Card/Card"
import { Post } from "./PostCard"
import CardHeader from "@mui/material/CardHeader/CardHeader"
import CardContent from "@mui/material/CardContent/CardContent"
import Typography from "@mui/material/Typography/Typography"
import Box from "@mui/material/Box/Box"

type CommentsPageProps = {
    post: Post
}

export default function CommentsPage(props: CommentsPageProps) {
    return (
    <Box
      sx={{
        gap: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: '90vw',
        borderRadius: 2,
      }}
    >
        <Typography variant="body2" sx={{fontSize: '2rem', paddingTop: '5vh'}}>Comments of post: {props.post.title}</Typography>
        <Typography variant="body2" sx={{fontSize: '2rem', paddingTop: '5vh'}}>Comment Amount: {props.post.comments.length}</Typography>
        <Box sx={{alignItems: 'center', padding: '10vw', display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {props.post.comments.map((comment) => {
        return <Card sx={{minWidth: 500, maxWidth: 545}}>
            <CardHeader
                title={comment.writer}
                subheader={comment.publishDate}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {comment.message}
                </Typography>
            </CardContent>
        </Card>
        })}
        </Box>
        </Box>
    )
}