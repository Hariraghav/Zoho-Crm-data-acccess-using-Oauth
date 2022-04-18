import { Alert, Button, Container, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box, width } from "@mui/system";
function View() {
  const [org, setOrg] = useState("");
  const [data, setData] = useState([]);
  const [dis, setDis] = useState("none");
  const [err, setErr] = useState("");

  const handle = () => {
    if (org) {
      setData([]);
      axios
        .post("http://localhost:9000/", {
          org: org,
        })
        .then(
          (response) => {
            setData(response.data.data);
            setDis("block");
            console.log(response.data.data);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      setErr("Enter the Organization");
    }
  };
  const handleChange = (event) => {
    setErr("");
    setData([]);
    setDis("none");
    setOrg(event.target.value);
    console.log(org);
  };
  let content;
  if (data) {
    content = (
      <Container maxWidth="md" sx={{ marginTop: "20px" }}>
        <TableContainer component={Paper} sx={{ display: `${dis}` }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#1565c0", color: "white" }}>
                <TableCell sx={{ color: "white" }} align="center">
                  Account_Name
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((d) => (
                <TableRow
                  key={d.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {d.Account_Name}
                  </TableCell>
                  <TableCell align="center">{d.Email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  } else {
    content = (
      <Container maxWidth="md" sx={{ marginTop: "20px" }}>
        <Alert severity="error">
          No data available for the entered organization
        </Alert>
      </Container>
    );
  }
  return (
    <div>
      <Container maxWidth="md" sx={{ marginTop: "30px" }}>
        <Stack spacing={2}>
          <TextField
            placeholder="Enter the Organization"
            onChange={handleChange}
          ></TextField>
          <Button variant="contained" onClick={handle}>
            ok
          </Button>
          {err && <Alert severity="error">{err}</Alert>}
        </Stack>
      </Container>
      {content}
    </div>
  );
}

export default View;
