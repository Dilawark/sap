import React from "react";
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";

function Nav() {
  return (
    <AppBar variant="outlined">
      <Toolbar sx={{ bgcolor: "rgba(196,207,217,255)" }}>
        <Container>
          <Typography color='orange' variant="h3" fontSize='bold'>SAF</Typography>
          <Typography variant="subtitle2" color="gray">Student Administration Framework</Typography>
        </Container>
        <Button sx={{marginLeft: "auto", color: "black"}}>Admin</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;