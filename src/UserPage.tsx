import Box from '@mui/material/Box';
import PostPage from './PostPage';
import { User } from './types/User';

interface UserPageProps {
  actualUser: User | undefined;
  setActualUser: (user: User | undefined) => void;
}

export default function UserPage({ actualUser, setActualUser }: UserPageProps) {

  return (
    <Box>
      <PostPage
        actualUser={actualUser}
        userToDisplay={actualUser}
        setUserToDisplay={setActualUser}
      />
    </Box>
  );
}