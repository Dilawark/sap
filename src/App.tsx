import { Grid, Box, Container } from "@mui/material";
import Nav from "./components/Nav";
import Searchbar from "./components/Searchbar";
import Table from "./components/Table";
import React from "react";
import { useDataFetching } from "./customeHooks/useDataFetching";
import { API_BASE_URL } from './routes/routes';

function App() {
  const [isChecked, setIsChecked] = React.useState<string[]>([]);
  const { data: students, error, isLoading } = useDataFetching(`${API_BASE_URL}/students`);
  const [results, setResults] = React.useState([]);

  const handleSearch = (value: string, filters: string[]) => {
    const filteredResults = students.filter((student: any) => {
      const nameMatch = student.name.toLowerCase().includes(value.toLowerCase());
      const groupMatch = filters.every((filter) => student.groups.includes(filter));
      return nameMatch && groupMatch;
    });
    setResults(filteredResults);
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