import {
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

const ViewVisits = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/prisoner/get-visits")
      .then((res) => {
        setData(res.data);
        let tempArr = [];
        let a = res.data[0];
        for (let elem of Object.keys(a)) {
          tempArr.push(elem);
        }
        setColumns(tempArr);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
        <b>View Visits</b>
      </Typography>
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
                <TableCell align="left">{row.visitID}</TableCell>
                <TableCell align="left">{row.inmateID}</TableCell>
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
    </div>
  );
};

export default ViewVisits;
