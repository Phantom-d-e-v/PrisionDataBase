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

const ViewInmatesInCell = () => {
  const [ID, setID] = useState("");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cells, setCells] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let cells = await axios.get(
          "http://localhost:5000/api/prisoner/get-cells"
        );
        cells = cells.data.map((elem) => elem.cellID);
        setCells(cells);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleChange = async (e) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/prisoner/get-cell-inmates",
        {
          cellID: e.target.value,
        }
      );
      setData(res.data);
      console.log(res.data);
      let tempArr = [];
      let a = res.data[0];
      for (let elem of Object.keys(a)) {
        tempArr.push(elem);
      }
      setColumns(tempArr);
      setLoading(false);
      setID(e.target.value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
        <b>View Inmates In Cell</b>
      </Typography>
      <Box sx={{ width: "50%", marginBottom: 5, marginTop: 5 }}>
        <FormControl fullWidth>
          <InputLabel>Select Cell</InputLabel>
          <Select value={ID} onChange={(e) => handleChange(e)}>
            {cells.map((elem, key) => (
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
      )}
    </div>
  );
};

export default ViewInmatesInCell;
