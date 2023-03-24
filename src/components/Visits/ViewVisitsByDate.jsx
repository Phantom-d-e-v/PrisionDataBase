import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";

const ViewVisitsByDate = () => {
  const [ID, setID] = useState("");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = async (e) => {
    setID(e.target.value);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/prisoner/get-visits-by-date",
        {
          visitor_date: new Date(e.target.value)
            .toLocaleDateString()
            .split("/")
            .reverse()
            .join("-"),
        }
      );
      setData(res.data);
      console.log(res.data);
      let tempArr = [];
      let a = res.data[0];
      for (let elem of Object.keys(a)) {
        tempArr.push(elem);
      }
      console.log(tempArr);
      setColumns(tempArr);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
        <b>View Visits By Date</b>
      </Typography>
      <Box sx={{ width: "50%", marginBottom: 5, marginTop: 5 }}>
        <TextField
          variant="outlined"
          value={ID}
          onChange={(e) => handleChange(e)}
          color="secondary"
          required
          style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
          type="date"
        />
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
                  <TableCell align="left">{row.visitor_name}</TableCell>
                  <TableCell align="left">{row.visitor_address}</TableCell>
                  <TableCell align="left">{row.visitor_phone}</TableCell>
                  <TableCell align="left">
                    {new Date(row.visitor_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">{row.visit_starttime}</TableCell>
                  <TableCell align="left">{row.visit_endtime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewVisitsByDate;
