import { Grid, Box, Container } from "@mui/material";
import Nav from "./components/Nav";
import Searchbar from "./components/Searchbar";
import Table from "./components/Table";
import React from "react";
import { API_BASE_URL } from './routes'

function App() {
  const [results, setResults] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState<string[]>([]);

  const handleSearch = (value: string, filters: string[]) => {
    const API_URL = `${API_BASE_URL}/students`;
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const filteredResults = data.filter((student: any) => {
          const nameMatch = student.name.toLowerCase().includes(value.toLowerCase());
          const groupMatch = filters.every((filter) => student.groups.includes(filter));
          return nameMatch && groupMatch;
        });
        setResults(filteredResults);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setIsChecked(filters);
  };

  return (
    <Box sx={{marginBottom: '50px'}}>
      <Nav />
      <Container>
        <Grid container sx={{ marginTop: "100px" }}>
          <Grid item xs={4}>
          <Searchbar handleSearch={handleSearch} isChecked={isChecked} />
          </Grid>
          <Grid item xs={8}>
            <Table results={results} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;