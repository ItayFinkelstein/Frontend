import UserData from "../../UserData";
import { User } from "../../types/User";

interface UserProfileProps {
  userToDisplay: User;
  setUserToDisplay: (user: User | undefined) => void;
  isActualUser: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userToDisplay,
  setUserToDisplay,
  isActualUser,
}) => {
  return (
    <UserData
      userToDisplay={userToDisplay}
      setUserToDisplay={setUserToDisplay}
      isActualUser={isActualUser}
      isSuggestion={false}
    />
  );
};

export default UserProfile;
