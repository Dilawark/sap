import React from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAddUserMutation } from "../customeHooks/useAddUser";

type SignupFormTypes = {
  name: string;
  email: string;
  password: string;
};

function SignUp () {
  const addUserMutation = useAddUserMutation();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [signupSuccess, setSignupSuccess] = React.useState(false);
  const [signupForm, setSignupForm] = React.useState<SignupFormTypes>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { name, email, password } = signupForm;

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least one number, one special character, and be at least 8 characters long."
      );
      return;
    }

    try {
      await addUserMutation.mutateAsync({ name, email, password });
      setSignupSuccess(true);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred, Try to use another Email..."
      );
    }
    setSignupForm({
      name: "",
      email: "",
      password: "",
    });
    console.log(signupForm);
  };

  return (
    <Container sx={{ paddingTop: "100px", width: "400px" }} maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          label="Name"
          value={signupForm.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          value={signupForm.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={signupForm.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Signup
        </Button>
      </form>
      {errorMessage && (
        <Snackbar open={true} onClose={() => setErrorMessage("")}>
          <Alert severity="error" onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      <Snackbar open={signupSuccess} onClose={() => setSignupSuccess(false)}>
        <Alert severity="success">
          You have signed up successfully! Please{" "}
          <Link href="/login">log in</Link>.
        </Alert>
      </Snackbar>
      <Box sx={{ textAlign: "center", paddingTop: "30px" }}>
        <Typography sx={{ paddingBottom: "5px" }}>Or Sign In Using</Typography>
        <Link href="/login">
          <Button variant="outlined">SIGN IN</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default SignUp;
