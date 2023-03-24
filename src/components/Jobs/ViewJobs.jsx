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

const ViewJobs = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/prisoner/get-jobs")
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
        <b>View Jobs</b>
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
                <TableCell align="left">{row.jobID}</TableCell>
                <TableCell align="left">{row.jobDesc}</TableCell>
                <TableCell align="left">{row.jobPay}</TableCell>
                <TableCell align="left">{row.job_startime}</TableCell>
                <TableCell align="left">{row.job_endtime}</TableCell>
                <TableCell align="left">{row.bloodgroup}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewJobs;
