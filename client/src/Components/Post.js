import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import axios from "axios";

function Post() {
  const nameref = useRef();
  const emailref = useRef();
  const companyref = useRef();
  const [result, setResult] = useState("");
  const [creator, setCreator] = useState({});
  const [bool, setBool] = useState(false);
  let [content, setContent] = useState(<></>);
  const handleClick = () => {
    const name = nameref.current.value;
    const email = emailref.current.value;
    const company = companyref.current.value;

    console.log(name);
    axios
      .post("http://localhost:9000/post", {
        name: name,
        email: email,
        company: company,
      })
      .then(
        (response) => {
          setResult(response.data.data[0].code);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div>
      <Container maxWidth="sm" sx={{ marginTop: "30px" }}>
        <Stack spacing={2}>
          <TextField
            inputRef={nameref}
            placeholder="Enter the name"
          ></TextField>
          <TextField inputRef={emailref} placeholder="Email"></TextField>
          <TextField inputRef={companyref} placeholder="Company"></TextField>
          <Button onClick={handleClick} variant="contained">
            Add Record
          </Button>
        </Stack>
        <div style={{ marginTop: "10px" }}>
          {result && <Alert>{result}</Alert>}
        </div>
      </Container>
    </div>
  );
}

export default Post;
