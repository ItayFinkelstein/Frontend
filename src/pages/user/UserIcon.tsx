import Avatar from "@mui/material/Avatar/Avatar";
import { User } from "../../types/User";
import Box from "@mui/material/Box/Box";
import UserMenu from "./UserMenu";

type UserIconMenuProps =
  | {
      onClick?: never;
      actions?: never;
    }
  | {
      onClick?: () => void;
      actions?: never;
    }
  | {
      onClick?: never;
      actions: {
        type: string;
        action: () => void;
      }[];
    };
type UserIconProps = {
  user: User | undefined;
  style?: React.CSSProperties;
  iconUrl?: string;
} & UserIconMenuProps;

export default function UserIcon(props: UserIconProps) {
  const avatar = (
    <Avatar
      sx={{
        bgcolor: "#eb9f1c",
        fontSize: props.style?.width
          ? `calc(${props.style.width} / 2.5)`
          : "1rem",
        ...(props.onClick !== undefined && {
          "&:hover": {
            outline: "2.5px solid lightgray",
          },
        }),
        ...props.style,
      }}
      aria-label="user icon"
      src={props.iconUrl ?? props.user?.iconImage}
      onClick={() => {
        props.onClick?.();
      }}
    >
      {props.user?.name[0]}
    </Avatar>
  );
  return (
    <Box>
      {props.actions !== undefined ? (
        <UserMenu
          actions={[...props.actions]}
          childStyle={props.style}
          child={avatar}
        />
      ) : (
        avatar
      )}
    </Box>
  );
}
