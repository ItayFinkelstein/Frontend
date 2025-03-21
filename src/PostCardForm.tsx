import { useState } from "react";
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
import ValidatedTextField from "./ValidatedTextField";
import { GenericIconButton } from "./GenericIconButton";
import postService from "./http-connections/postService";
import EnhanceCaption from "./EnhanceCaption";

type PostCardForm = {
  post?: Post;
  hideForm?: () => void;
  onUpdate?: (updatedPost: Post) => void;
};

export default function PostCardForm(props: PostCardForm) {
  const schema = z.object({
    description: z
      .string()
      .min(3, { message: "Description must be at least 3 characters" })
      .max(200, { message: "Description must be no more than 200 letters" }),
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" })
      .max(200, { message: "Title must be no more than 200 letters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: props.post?.message || "",
      title: props.post?.title || "",
    },
  });

  const [image, setImage] = useState(props.post?.image);

  const onSubmit = async (data: any) => {
    const updatedPost = {
      ...props.post!,
      title: data.title,
      message: data.description,
    };
    await postService.update(updatedPost);
    props.onUpdate?.(updatedPost);
    props.hideForm?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ width: "30vw" }}>
        <CardHeader
          title={
            <ValidatedTextField
              name="title"
              register={register}
              error={errors.title}
              defaultValue={props.post?.title}
            />
          }
          subheader={
            props.post !== undefined
              ? new Date(props.post.publishDate).toLocaleDateString()
              : undefined
          }
        />
        <CardMedia component="img" height="194" image={image} />
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
            defaultValue={props.post?.message}
          />
          <EnhanceCaption
            currentDescription={getValues("description")}
            setValue={setValue}
            fieldToUpdate="description"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
