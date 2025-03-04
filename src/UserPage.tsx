import Card from "@mui/material/Card/Card";
import { User } from "./PostCard";
import PostPage from "./PostPage";

type UserPageProps = {
    actualUser: User
}
export default function UserPage(props: UserPageProps) {
    return (
        <PostPage actualUser={props.actualUser}/>
    )
}