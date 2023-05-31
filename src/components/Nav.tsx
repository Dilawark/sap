import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Link,
} from "@mui/material";

function Nav() {
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <AppBar variant="outlined">
      <Toolbar sx={{ bgcolor: "rgba(196,207,217,255)" }}>
        <Container>
          <Typography color="orange" variant="h3" fontSize="bold">
            SAF
          </Typography>
          <Typography variant="subtitle2" color="gray">
            Student Administration Framework
          </Typography>
        </Container>
        {token && (
          <Button variant="contained" onClick={handleLogout}>
            <Link href="/login" sx={{ color: "white" }}>
              Logout
            </Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
