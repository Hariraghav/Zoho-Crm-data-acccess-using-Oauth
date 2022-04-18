import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Post from "./Components/Post";
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
import Home from "./Components/Home";
import View from "./Components/View";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";
function App() {
  console.log(process.env.REACT_APP_CLIENT_ID);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<View />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
