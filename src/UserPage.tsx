import PostPage from "./PostPage";
import { User } from "./types/User";

type UserPageProps = {
    actualUser: User
}
export default function UserPage(props: UserPageProps) {
    return (
        <PostPage actualUser={props.actualUser}/>
    )
}