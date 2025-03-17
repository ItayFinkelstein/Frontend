import { Box, Menu, MenuItem } from "@mui/material";
import { useMenu } from "./useMenu";
import { useRef } from "react";

type UserMenuProps = {
  actions: { type: string; action: () => void }[];
  child: React.ReactNode;
  childStyle?: React.CSSProperties;
};

export default function UserMenu({
  actions,
  child,
  childStyle,
}: UserMenuProps) {
  const { anchorEl, open, handleMenuClick, handleMenuClose } = useMenu();
  const childRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box ref={childRef} style={childStyle} onClick={handleMenuClick}>
        {child}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        disableAutoFocusItem
        aria-hidden={!open}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.action();
              handleMenuClose();
            }}
          >
            {action.type}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
