import Avatar from "@mui/material/Avatar/Avatar";
import { User } from "./types/User";
import red from "@mui/material/colors/red";

type UserIconProps = {
  user: User | undefined;
  style?: React.CSSProperties;
  onclick?: () => void;
};

export default function UserIcon(props: UserIconProps) {
  return (
    <Avatar
      sx={{ bgcolor: red[500], ...props.style }}
      aria-label="recipe"
      src={props.user?.iconImage}
      onClick={props.onclick}
    >
      {props.user?.name[0]}
    </Avatar>
  );
}
