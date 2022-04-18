import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import {
  Alert,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Box, width } from "@mui/system";
function Home() {
  const [login, setLogin] = useState("");

  useEffect(() => {
    setLogin(new URLSearchParams(window.location.search).get("login"));
  }, []);

  return (
    <div>
      {!login && (
        <div>
          <h1>
            <b>Welcome</b>
          </h1>
          <Button
            href="https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.coql.READ&scope=ZohoCRM.modules.all,ZohoCRM.modules.accounts.all&client_id=1000.8YWL9Z24X831OM18J2621T3X4FYVZE&response_type=code&access_type=online&redirect_uri=http://localhost:9000/login/callback"
            variant="contained"
          >
            Provide Access to your Zoho Account
          </Button>
        </div>
      )}
      {login && (
        <div>
          <h2>
            <b>Logged In</b>
          </h2>
          <Container maxWidth="md">
            <Stack spacing={2}>
              <Button href="/view" variant="contained">
                View data from Accounts
              </Button>
              <Button href="/post" variant="contained">
                Post data to Accounts
              </Button>
            </Stack>
          </Container>
        </div>
      )}
    </div>
  );
}

export default Home;
