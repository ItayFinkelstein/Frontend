import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Tooltip } from "@mui/material";

type PhotoIconProps = {
  inputFileRef: React.MutableRefObject<HTMLInputElement | null>;
  refCallback: (item: HTMLInputElement | null) => void;
  restRegisterParams: Record<string, any>;
  onClick?: () => void
};

export default function PhotoIcon({
  inputFileRef,
  refCallback,
  restRegisterParams,
  onClick
}: PhotoIconProps) {
  return (
    <Tooltip title={"Upload photo"} arrow>
      <IconButton
        color="primary"
        component="label"
        sx={{
          mb: 2,
          "&:hover": {
            color: "blue",
          },
        }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faImage} />
        <input
          ref={(item) => {
            inputFileRef.current = item;
            refCallback(item);
          }}
          {...restRegisterParams}
          type="file"
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
        />
      </IconButton>
    </Tooltip>
  );
}
