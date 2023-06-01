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
  const name = localStorage.getItem("name");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
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
          <Toolbar>
            <Typography sx={{color: "black", width: "200px"}}>Welcome <span style={{fontWeight: "bold", color: "orange"}}>{name}</span></Typography>
            <Button variant="contained" onClick={handleLogout}>
              <Link href="/login" sx={{ color: "white" }}>
                Logout
              </Link>
            </Button>
          </Toolbar>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
