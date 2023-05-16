import React, { ChangeEvent, useState } from 'react';
import { TextField, Button, Modal, Box } from '@mui/material';

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

interface NewStudentProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inputs: Student) => void;
}

interface Student {
  id: number;
  name: string;
  sex: string;
  dateOfBirth: string;
  place: string;
  groups: string;
}

const NewStudent: React.FC<NewStudentProps> = ({ isOpen, onClose, onSubmit }) => {
  const [inputs, setInputs] = useState<Student>({
    id: 0,
    name: '',
    sex: '',
    dateOfBirth: '',
    place: '',
    groups: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputs);
    setInputs({
      id: 0,
      name: '',
      sex: '',
      dateOfBirth: '',
      place: '',
      groups: '',
    });
    onClose();
  };

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
          <TextField
            name="sex"
            value={inputs.sex}
            onChange={handleChange}
            type="text"
            sx={{ marginBottom: 3, display: 'block' }}
            placeholder="Gender"
            variant="outlined"
            required
          />
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
  );
};

export default NewStudent