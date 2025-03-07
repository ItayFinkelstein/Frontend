// useMenu.ts
import { useState } from "react";

export function useMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  // Handle the menu open event
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  // Handle the menu close event
  const handleMenuClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return {
    anchorEl,
    open,
    handleMenuClick,
    handleMenuClose,
  };
}
