import { DynamicForm } from "@mui/icons-material";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

const Navbar = () => {

  return (
    <AppBar position="static" color="primary">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <DynamicForm sx={{ display: { md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: "secondary"
          }}
        >
          PRUEBAS TÉCNICAS
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
  );
}

export default Navbar;