import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const Layout = ({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Expense Tracker</Typography>
      </Toolbar>
    </AppBar>

    <Box mt={6}>
      <Container>{children}</Container>
    </Box>
  </>
);

export default Layout;
