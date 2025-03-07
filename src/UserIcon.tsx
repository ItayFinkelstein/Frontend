import Avatar from "@mui/material/Avatar/Avatar";
import { User } from "./types/User";
import red from "@mui/material/colors/red";
import { ContextMenuHandler } from "./useMenu";
import Box from "@mui/material/Box/Box";
import { MouseEvent, useState } from "react";
import Menu from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import UserMenu from "./UserMenu";

type UserIconMenuProps =
  | {
      onClick: () => void;
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
} & UserIconMenuProps;

export default function UserIcon(props: UserIconProps) {
  const avatar = (
    <Avatar
      sx={{
        bgcolor: red[500],
        // borderRadius: "50%", // make it circular
        ...(props.onClick !== undefined && {
          "&:hover": {
            outline: "2.5px solid lightgray",
          },
        }),
        ...props.style,
      }}
      aria-label="user icon"
      src={props.user?.iconImage}
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
          actions={props.actions}
          childStyle={props.style}
          child={avatar}
        />
      ) : (
        avatar
      )}
    </Box>
  );
}
