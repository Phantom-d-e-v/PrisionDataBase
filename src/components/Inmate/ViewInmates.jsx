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

const ViewInmates = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/prisoner/get-inmates")
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
        <b>View Inmates</b>
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
                <TableCell align="left">{row.inmateID}</TableCell>
                <TableCell align="left">{row.cellID}</TableCell>
                <TableCell align="left">{row.jobID}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.age}</TableCell>
                <TableCell align="left">{row.gender}</TableCell>
                <TableCell align="left">{row.bloodgroup}</TableCell>
                <TableCell align="left">
                  {new Date(row.sentence_start).toLocaleDateString()}
                </TableCell>
                <TableCell align="left">
                  {new Date(row.release_date).toLocaleDateString()}
                </TableCell>
                <TableCell align="left">{row.case_detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewInmates;
