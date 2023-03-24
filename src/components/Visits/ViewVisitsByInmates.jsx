import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";

const ViewVisitsByInmate = () => {
  const [ID, setID] = useState("");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [inmates, setInmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let res = await axios.get(
        "http://localhost:5000/api/prisoner/get-inmates"
      );
      res = res.data.map((elem) => elem.inmateID);
      setInmates(res);
    })();
  }, []);

  const handleChange = async (e) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/prisoner/get-visits-by-inmate",
        {
          inmateID: e.target.value,
        }
      );
      setData(res.data);
      console.log(res.data);
      let tempArr = [];
      let a = res.data[0];
      for (let elem of Object.keys(a)) {
        tempArr.push(elem);
      }
      setID(e.target.value);
      setColumns(tempArr);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setID(e.target.value);
  };

  return (
    <div>
      <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
        <b>View Visits By Inmate</b>
      </Typography>
      <Box sx={{ width: "50%", marginBottom: 5, marginTop: 5 }}>
        <FormControl fullWidth>
          <InputLabel>Inmate</InputLabel>
          <Select value={ID} onChange={(e) => handleChange(e)}>
            {inmates.map((elem, key) => (
              <MenuItem value={elem} key={key}>
                {elem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {ID && !loading && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, key) => (
                  <TableCell align="left">{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, key) => (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.inmateID}</TableCell>
                  <TableCell align="left">{row.visitID}</TableCell>
                  <TableCell align="left">{row.visit_endtime}</TableCell>
                  <TableCell align="left">{row.visit_starttime}</TableCell>
                  <TableCell align="left">{row.visitor_address}</TableCell>
                  <TableCell align="left">
                    {new Date(row.visitor_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">{row.visitor_name}</TableCell>
                  <TableCell align="left">{row.visitor_phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewVisitsByInmate;
