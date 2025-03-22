import React from "react";
import { IconButton, Tooltip } from "@mui/material";

interface GenericIconButtonProps {
  title: string;
  icon: React.ReactElement;
  onClick?: () => void;
  disabled?: boolean;
}

export const GenericIconButton: React.FC<GenericIconButtonProps> = ({
  title,
  icon,
  onClick,
  disabled,
}) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        aria-label={title}
        style={{ outline: "none" }}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
