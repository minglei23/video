import React from "react";
import { Radio, RadioGroup, Modal, FormControlLabel, FormControl, Box } from "@mui/material";

const SubtitlesModal = ({ open, onClose, vttType, vttList, handleSubtitlesChange }) => {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxHeight: "50vh",
          bgcolor: "#333",
          p: 3,
          borderRadius: "10px 10px 0 0",
        }}
      >
        <div className="h-[40vh] overflow-y-auto overflow-x-hidden">
          <FormControl component="fieldset">
            <div className="text-[#fff]">Subtitles</div>
            <RadioGroup
              row
              value={vttType}
              aria-label="gender"
              name="row-radio-buttons-group"
              onChange={handleSubtitlesChange}
            >
              {vttList.map((item) => {
                return (
                  <FormControlLabel
                    className="text-[#fff]"
                    key={item.Type}
                    value={item.Type}
                    control={<Radio classes={{ root: 'vtt-radio' }} />}
                    label={item.Name}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
      </Box>
    </Modal>
  );
};

export default SubtitlesModal;
