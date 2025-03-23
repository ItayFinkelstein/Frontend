import { useEffect, useState } from "react";
import Card from "@mui/material/Card/Card";
import { Post } from "../../types/Post";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import CardContent from "@mui/material/CardContent/CardContent";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatedTextField from "../../ValidatedTextField";
import EnhanceCaption from "../../EnhanceCaption";
import { uploadImage } from "../../http-connections/userService";
import PhotoIcon from "../../PhotoIcon";

type PostCardForm = {
  post?: Post;
  updatePost: ((post: Post) => void) | ((post: Omit<Post, "_id">) => void);
  isMain?: boolean;
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
    img: z.instanceof(FileList).optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: props.post?.message || "",
      title: props.post?.title || "",
    },
  });

  const [image, setImage] = useState<File | null>(null);
  const [allowRenderPhoto, setAllowRenderPhoto] = useState(false);
  const [img] = watch(["img"]);
  const inputFileRef: { current: HTMLInputElement | null } = { current: null };
  const { ref, ...restRegisterParams } = register("img");
  useEffect(() => {
    if (img !== undefined && img[0]) {
      setImage(img[0]);
    }
  }, [img]);

  const onSubmit = async (data: any) => {
    let avatarUrl = "";
    if (props.post?.image !== undefined && data.img !== props.post.image) {
      avatarUrl = props.post.image;
    } else if (data.img && data.img[0]) {
      const { request } = uploadImage(data.img[0]);
      const response = await request;
      avatarUrl = response.data.url;
    }
    const updatedPost = {
      ...props.post!,
      title: data.title,
      message: data.description,
      image: avatarUrl,
    };
    await props.updatePost(updatedPost);
    setAllowRenderPhoto(false);
    if (props.post === undefined) {
      reset({
        description: "",
        title: "",
        img: undefined,
      });
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          title={
            <Box display="flex" alignItems="center">
              <ValidatedTextField
                name="title"
                register={register}
                error={errors.title}
                defaultValue={props.post?.title}
              />
              <Box style={{ width: "2vw" }}>
                <PhotoIcon
                  inputFileRef={inputFileRef}
                  refCallback={ref}
                  restRegisterParams={restRegisterParams}
                  onClick={() => {
                    setValue("img", undefined);
                    setAllowRenderPhoto(true);
                  }}
                />
              </Box>
            </Box>
          }
        />
        {(!props.isMain || allowRenderPhoto) &&
          (image !== null ||
            (props.post?.image !== undefined && props.post?.image !== "")) && (
            <CardMedia
              component="img"
              height="194"
              image={
                image !== null ? URL.createObjectURL(image) : props.post?.image
              }
              alt="Selected image preview"
              sx={{ mb: 2 }}
            />
          )}
        <CardContent sx={{ paddingTop: 0 }}>
          <ValidatedTextField
            name="description"
            register={register}
            error={errors.description}
            defaultValue={props.post?.message}
          />
          <Box display="flex" gap={2}>
            <EnhanceCaption
              currentDescription={watch("description") || ""}
              setValue={setValue}
              fieldToUpdate="description"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, maxHeight: "2.5rem" }}
            >
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
}
