import Card from "@mui/material/Card/Card";
import { Post } from "./types/Post";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import CardContent from "@mui/material/CardContent/CardContent";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import ValidatedTextField from "./ValidatedTextField";
import { GenericIconButton } from "./GenericIconButton";

type PostCardForm = {
  post?: Post;
  hideForm?: () => void;
};

export default function PostCardForm(props: PostCardForm) {
  const schema = z.object({
    description: z
      .string()
      .min(3, { message: "Description must be at least 3 characters" })
      .max(200, { message: "Description must be no more than 200 letters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    props.hideForm?.(); // todo: when adding it, closing the form should be after receiving success from the server.
  };

  const [image, setImage] = useState(props.post?.image);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ minWidth: 400, maxWidth: 445 }}>
        <CardHeader
          title={props.post?.title}
          subheader={props.post?.publishDate}
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          // alt={props.post.title}
        />
        <GenericIconButton
          title="Edit post"
          icon={<ImageIcon />}
          onClick={() => {
            console.log("button to change image");
            setImage(undefined);
          }}
        />
        <CardContent>
          <ValidatedTextField
            name="description"
            register={register}
            error={errors.description}
          />
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
