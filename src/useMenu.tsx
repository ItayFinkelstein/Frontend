import { useState } from "react";

export function useMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

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
