import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { UseFormSetValue } from "react-hook-form";
import { generateEnhancedCaption } from "./http-connections/aiService";

type EnhanceCaptionProps = {
  currentDescription: string;
  setValue: UseFormSetValue<{ description: string; title: string }>;
  fieldToUpdate: "description" | "title";
};

const EnhanceCaption: React.FC<EnhanceCaptionProps> = ({
  currentDescription,
  setValue,
  fieldToUpdate,
}) => {
  const [enhancedCaption, setEnhancedCaption] = useState<string | null>(null);
  const [showEnhancedCaption, setShowEnhancedCaption] = useState(false);

  const handleEnhanceCaption = async () => {
    console.log("Enhancing caption" + currentDescription);
    const enhanced = await generateEnhancedCaption(currentDescription);
    setEnhancedCaption(enhanced);
    setShowEnhancedCaption(true);
  };

  const acceptEnhancedCaption = () => {
    if (enhancedCaption) {
      setValue(fieldToUpdate, enhancedCaption);
    }
    setShowEnhancedCaption(false);
  };

  const rejectEnhancedCaption = () => {
    setEnhancedCaption(null);
    setShowEnhancedCaption(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        startIcon={<AutoFixHighIcon />}
        onClick={handleEnhanceCaption}
      >
        Enhance Caption
      </Button>
      {showEnhancedCaption && enhancedCaption && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Enhanced Caption:</Typography>
          <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
            {enhancedCaption}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={acceptEnhancedCaption}
            sx={{ mb: 1 }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={rejectEnhancedCaption}
          >
            Reject
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EnhanceCaption;
