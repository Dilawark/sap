import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridCellParams } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { API_BASE_URL } from "../routes";

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

//<------------Modal (Form) Styles------------>
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

interface Student {
  id: number;
  name: string;
  sex: string;
  dateOfBirth: string;
  place: string;
  groups: string;
}

interface TableProps {
  results: Student[];
}

const Table: React.FC<TableProps> = ({ results }) => {
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
      setInputs({
        id: editedStudent.id,
        name: editedStudent.name,
        sex: editedStudent.sex,
        dateOfBirth: editedStudent.dateOfBirth,
        place: editedStudent.place,
        groups: editedStudent.groups,
      });

      handleOpen();
    }
  };

  //<------------To Delete Row Functionallity------------>
  const handleDelete = async (studentId: number) => {
    const updatedStudents = student.filter(
      (student) => student.id !== studentId
    );
    setStudent(updatedStudents);
    const deleteStd = { method: "DELETE" };
    const requestUrl = `${API_URL}/${studentId}`;
    const result = await fetch(requestUrl, deleteStd);
    if (!result.ok) {
      const errorResponse = await result.json();
      const errorMessage = errorResponse.message || "An error occurred";
      setFetchError(errorMessage);
    } else {
      setFetchError(null);
    }
  };

  //<------------Modal (Form) useState and Functions------------>
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInputs({
      id: 0,
      name: "",
      sex: "",
      dateOfBirth: "",
      place: "",
      groups: "",
    });
  };

  //<------------REST API to Fetch data from JSON File------------>
  const API_URL = `${API_BASE_URL}/students`;
  const [student, setStudent] = React.useState<Student[]>([]);

  //<------------Read Data from LocalStorage------------>
  // React.useEffect(() => {
  //   const storedStudents = localStorage.getItem('studentData');
  //   if (storedStudents) {
  //     setStudent(JSON.parse(storedStudents));
  //   }
  // }, []);

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Didn't receive the expected data.");
        const studentList = await response.json();
        setStudent(studentList);
        setFetchError(null);
      } catch (error: any) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchStudents();
    }, 500);
  }, []);

  //<------------Store Data to LocalSrorage------------>
  // React.useEffect(() => {
  //   localStorage.setItem("studentData",  JSON.stringify(student))
  // }, [student])

  //<------------User Interaction useState------------>
  const [isLoading, setIsLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState(null);

  //<------------Modal Inputs useState------------>
  const [inputs, setInputs] = React.useState<Student>({
    id: 0,
    name: "",
    sex: "",
    dateOfBirth: "",
    place: "",
    groups: "",
  });

  //<------------Form TextField Change Function------------>
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      const newStudent: Student = {
        id: student.length + 1,
        name: inputs.name,
        sex: inputs.sex,
        dateOfBirth: inputs.dateOfBirth,
        place: inputs.place,
        groups: inputs.groups,
      };
      setStudent((prevStudent) => [...prevStudent, newStudent]);
      const result = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });
      if (!result.ok) {
        const errorResponse = await result.json();
        const errorMessage = errorResponse.message || "An error occurred";
        setFetchError(errorMessage);
      } else {
        setFetchError(null);
      }
    } else {
      const updatedStudents = student.map((student) =>
        student.id === inputs.id ? { ...student, ...inputs } : student
      );
      setStudent(updatedStudents);
      const updatedStudent = updatedStudents.find(
        (std) => std.id === inputs.id
      );
      const update = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      };
      const requestUrl = `${API_URL}/${inputs.id}`;
      const result = await fetch(requestUrl, update);
      if (!result.ok) {
        const errorResponse = await result.json();
        const errorMessage = errorResponse.message || "An error occurred";
        setFetchError(errorMessage);
      } else {
        setFetchError(null);
      }
    }
    setInputs({
      id: 0,
      name: "",
      sex: "",
      dateOfBirth: "",
      place: "",
      groups: "",
    });
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
          <Modal
            open={open}
            onClose={handleClose}
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
                  sx={{ marginBottom: 2, display: "block" }}
                  placeholder="Name"
                  variant="outlined"
                  required
                />
                <TextField
                  name="sex"
                  value={inputs.sex}
                  onChange={handleChange}
                  type="text"
                  sx={{ marginBottom: 3, display: "block" }}
                  placeholder="Gender"
                  variant="outlined"
                  required
                />
                <TextField
                  name="place"
                  value={inputs.place}
                  onChange={handleChange}
                  type="text"
                  sx={{ marginBottom: 3, paddingRight: "12px" }}
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
                  sx={{ marginBottom: 3, display: "block" }}
                  placeholder="Groups"
                  variant="outlined"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginRight: 7 }}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </form>
            </Box>
          </Modal>
        </Toolbar>
      </Grid>
      {isLoading && (
        <Box width="400px">
          <Typography variant="h3">Loading Data...</Typography>
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
