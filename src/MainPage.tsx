import { User } from "./PostCard";
import PostPage from "./PostPage";
import { users } from "./SharedData";
import UserPage from "./UserPage";

export default function MainPage() {
        const actualUser = users[1];
    return (
        <>
        {actualUser !== undefined ? <UserPage actualUser={actualUser}/>:
        <PostPage />}
        </>
    )
}