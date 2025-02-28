import Card from "@mui/material/Card/Card"
import { Post } from "./PostCard"
import CardHeader from "@mui/material/CardHeader/CardHeader"
import CardMedia from "@mui/material/CardMedia/CardMedia"
import CardContent from "@mui/material/CardContent/CardContent"
import { useForm } from 'react-hook-form';
import { Button, IconButton, TextField} from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ImageIcon from '@mui/icons-material/Image';

type PostCardForm = {
    post?: Post,
    hideForm?: () => void
}

export default function PostCardForm(props: PostCardForm) {

    const schema = z.object({
        description: z
          .string()
          .min(3, { message: 'Description must be at least 3 characters' })
          .max(200, { message: 'Description must be no more than 200 letters' }),
        // email: z
        //   .string()
        //   .email({ message: 'Please enter a valid email address' })
        //   .min(5, { message: 'Email must be at least 5 characters long' }),
      });
    
      // Set up react-hook-form with Zod resolver for validation
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
      });
    
      // Form submission handler
      const onSubmit = (data: any) => {
        console.log(data);
        props.hideForm?.(); // todo: when adding it, closing the form should be after receiving success from the server.
      };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{minWidth: 400, maxWidth: 445}}>
            <CardHeader
                title={props.post?.title}
                subheader={props.post?.publishDate}
            />
            <CardMedia
                component="img"
                height="194"
                image={props.post?.image}
                // alt={props.post.title}
            />
            <IconButton aria-label="edit post" style={{outline: 'none'}} onClick={() => console.log("button to change image")}>
                <ImageIcon/>
            </IconButton>
            <CardContent>
                <TextField
                          label="Description"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          {...register('description')}
                          error={!!errors.description}
                          helperText={errors.description?.message}
                />
                <Button type="submit" variant="contained" fullWidth>
                    Submit
                </Button>
            </CardContent>
        </Card>
        </form>
    )
}