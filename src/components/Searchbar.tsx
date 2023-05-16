import {
  Box,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

type SearchbarProps = {
  handleSearch: (value: string, filters: string[]) => void;
  isChecked: string[];
};

const Searchbar: React.FC<SearchbarProps> = ({ handleSearch, isChecked }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    handleSearch(value, isChecked);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      handleSearch(searchValue, [...isChecked, value]);
    } else {
      handleSearch(searchValue, isChecked.filter((filter) => filter !== value));
    }
  };
  
  return (
    <Box bgcolor="white" height="524px">
      <Box sx={{ paddingLeft: "20px", paddingTop: "20px" }}>
        <Typography variant="subtitle2">SEARCH FOR NAME</Typography>
        <TextField
          type="search"
          id="search"
          size="small"
          label={<SearchIcon />}
          sx={{
            height: "20px",
            width: "150px",
            marginBottom: "70px",
            marginTop: "5px",
          }}
          value={searchValue}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ paddingLeft: "20px" }}>
        <Typography variant="subtitle2">FILTERS FOR STUDY GROUPS</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox color="warning" onChange={handleFilterChange} value="Typography" />}
            label="Typography"
          />
          <FormControlLabel
            control={<Checkbox color="warning" onChange={handleFilterChange} value="Biologists" />}
            label="Biologists"
          />
          <FormControlLabel
            control={<Checkbox color="warning" onChange={handleFilterChange} value="Chemistry Capital" />}
            label="Chemistry Capital"
          />
          <FormControlLabel
            control={<Checkbox color="warning" onChange={handleFilterChange} value="Web designers" />}
            label="Web designers"
          />
          <FormControlLabel
            control={<Checkbox color="warning" onChange={handleFilterChange} value="Black magicians" />}
            label="Black magicians"
          />
          <FormControlLabel
            control={<Checkbox color="warning" onChange={handleFilterChange} value="Lame gamer boys" />}
            label="Lame gamer boys"
          />
        </FormGroup>
      </Box>
    </Box>
  );
};

export default Searchbar;