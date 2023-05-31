import React from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { authUser } from "../apiRequest";

type LoginFormTypes = {
  email: string;
  password: string;
};

function Login () {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loginForm, setLoginForm] = React.useState<LoginFormTypes>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const {email, password} = loginForm;
    try {
      const response = await authUser({ email, password });
      if (response && response.token) {
        const token = response.token;
        localStorage.setItem("token", token);
        setLoginForm({ email: "", password: "" });
        window.location.href = '/';
      } else {
        console.log("Invalid response format");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "An error occurred, Try to use valid Email and Password");
    }
    console.log(loginForm);
  };

  return (
    <Container sx={{ paddingTop: "100px", width: "400px" }} maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          name="email"
          label="Email"
          value={loginForm.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={loginForm.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      {errorMessage && (
        <Snackbar open={true} onClose={() => setErrorMessage("")}>
          <Alert severity="error" onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      <Box sx={{ textAlign: "center", paddingTop: "30px" }}>
        <Typography sx={{ paddingBottom: "5px" }}>Or Sign Up Using</Typography>
        <Link href="/signup">
          <Button variant="outlined">SIGN UP</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Login;
