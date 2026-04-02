import { Modal, Box, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from 'react';
import type { StudentTypes } from '../types/student';

type StudentAddModalTypeProps = {
  isOpen: boolean,
  onClose: () => void,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  inputs: StudentTypes,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function StudentAddModal({ isOpen, onClose, handleSubmit, inputs, handleChange }: StudentAddModalTypeProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            value={inputs.name}
            onChange={handleChange}
            type="text"
            sx={{ marginBottom: 2, display: 'block' }}
            placeholder="Name"
            variant="outlined"
            required
          />

          <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup name="sex" value={inputs.sex} onChange={handleChange} row>
              <FormControlLabel value="Male" control={<Radio color='warning' />} label="Male" />
              <FormControlLabel value="Female" control={<Radio color='warning' />} label="Female" />
            </RadioGroup>
          </FormControl>

          <TextField
            name="place"
            value={inputs.place}
            onChange={handleChange}
            type="text"
            sx={{ marginBottom: 3, paddingRight: '12px' }}
            placeholder="Place of Birth"
            variant="outlined"
            required
          />

          <TextField
            name="dateOfBirth"
            value={inputs.dateOfBirth}
            onChange={handleChange}
            type="date"
            sx={{ marginBottom: 3 }}
            placeholder="Date of Birth"
            variant="outlined"
            required
          />

          <TextField
            name="groups"
            value={inputs.groups}
            onChange={handleChange}
            type="text"
            sx={{ marginBottom: 3, display: 'block' }}
            placeholder="Groups"
            variant="outlined"
            required
          />

          <Button type="submit" variant="contained" sx={{ marginRight: 7 }}>
            Save
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default StudentAddModal;