import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridCellParams } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StudentAddModal from "./StudentAddModal";
import { fetchStudents, addStudent, updateStudent, deleteStudent } from '../apiRequest';

//<------------Change DataGrid Checkbox Color------------>
const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#f57c00",
          },
        },
      },
    },
  },
});

type StudentTypes = {
  id: number;
  name: string;
  sex: string;
  dateOfBirth: string;
  place: string;
  groups: string;
};

type TablePropTypes = {
  results: StudentTypes[];
};

const initialInputsState = {
  id: 0,
  name: "",
  sex: "",
  dateOfBirth: "",
  place: "",
  groups: "",
};

function Table({ results }: TablePropTypes) {
  //<------------DataDrid Columns------------>
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60, sortable: false },
    { field: "name", headerName: "NAME", width: 150 },
    { field: "sex", headerName: "SEX", width: 100, sortable: false },
    {
      field: "dateOfBirth",
      headerName: "PLACE AND DATE OF BIRTH",
      width: 200,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.place || ""}, ${params.row.dateOfBirth || ""} `,
    },
    {
      field: "groups",
      headerName: "GROUPS",
      width: 190,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <>
          {params.row.id && (
            <>
              <IconButton onClick={() => handleUpdate(params.row.id as number)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.row.id as number)}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </>
      ),
    },
  ];

  //<------------To Update Row Functionallity------------>
  const handleUpdate = (studentId: number) => {
    const editedStudent = student.find((student) => student.id === studentId);
    if (editedStudent) {
      setInputs(editedStudent);
      handleOpen();
    }
  };

  //<------------To Delete Row Functionallity------------>
  const handleDelete = async (studentId: number) => {
    try {
      await deleteStudent(studentId);
      const updatedStudents = student.filter((student) => student.id !== studentId);
      setStudent(updatedStudents);
      setFetchError(null);
    } catch (error: any) {
      setFetchError(error.message);
    }
  };

  //<------------Modal (Form) useState and Functions------------>
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setInputs(initialInputsState);
  };

  //<------------REST API to Fetch data from JSON File------------>
  const [student, setStudent] = React.useState<StudentTypes[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const studentList = await fetchStudents();
        setStudent(studentList);
        setFetchError(null);
      } catch (error: any) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 200);
  }, []);

  //<------------User Interaction useState------------>
  const [isLoading, setIsLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState(null);

  //<------------Modal Inputs useState------------>
  const [inputs, setInputs] = React.useState<StudentTypes>(initialInputsState);

  //<------------Form TextField Change Function------------>
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let updatedValue = value;
    if (name === "name") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }
    if (name === "sex") {
      updatedValue = value.replace(/[^A-Za-z]/g, "");
    }
    if (name === "place" || name === "groups") {
      updatedValue = value.replace(/[^A-Za-z\s/,]/g, "");
    }
    setInputs((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  //<------------Form Submit Function------------>
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputs.id === 0) {
      const newStudent: StudentTypes = {
        id: student.length + 1,
        name: inputs.name,
        sex: inputs.sex,
        dateOfBirth: inputs.dateOfBirth,
        place: inputs.place,
        groups: inputs.groups,
      };
      try {
        await addStudent(newStudent);
        setFetchError(null);
        setStudent((prevStudent) => [...prevStudent, newStudent]);
      } catch (error: any) {
        setFetchError(error.message || "An error occurred");
      }
    } else {
      const updatedStudents = student.map((std) =>
        std.id === inputs.id ? { ...std, ...inputs } : std
      );
      try {
        await updateStudent(inputs);
        setFetchError(null);
        setStudent(updatedStudents);
      } catch (error: any) {
        setFetchError(error.message || "An error occurred");
      }
    }
  
    setInputs(initialInputsState);
    handleClose();
  };

  return (
    <Box
      bgcolor="white"
      sx={{
        marginLeft: "0",
        paddingRight: "20px",
        width: "750px",
        height: "550px",
      }}
    >
      <Grid container sx={{ paddingTop: "20px", paddingBottom: "40px" }}>
        <Toolbar>
          <Toolbar>
            <PersonOutlineIcon />
            <Typography>
              {student.length} {student.length > 1 ? "STUDENTS" : "STUDENT"}
            </Typography>
          </Toolbar>
          <Button variant="contained" onClick={handleOpen}>
            <RateReviewIcon sx={{ marginRight: "15px" }} />
            New
          </Button>
          {/* <------------Modal Form------------> */}
          <StudentAddModal
            isOpen={isOpen}
            onClose={handleClose}
            handleSubmit={handleSubmit}
            inputs={inputs}
            handleChange={handleChange}
          />
        </Toolbar>
      </Grid>
      {isLoading && (
        <Box width="400px">
          <Typography variant="h5">Loading...</Typography>
        </Box>
      )}
      {fetchError && (
        <Box width="200px">
          <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
        </Box>
      )}
      {!isLoading && !fetchError && (
        <Box style={{ height: 400, width: "100%" }}>
          <ThemeProvider theme={theme}>
            <DataGrid
              rows={results.length === 0 ? student : results}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
              checkboxSelection
              sx={{ align: "right" }}
            />
          </ThemeProvider>
        </Box>
      )}
    </Box>
  );
};

export default Table;
