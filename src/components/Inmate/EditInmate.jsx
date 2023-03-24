import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";

const EditInmate = () => {
  const [inmates, setInmates] = useState([]);
  const [IDs, setIDs] = useState([]);
  const [id, setID] = useState("");
  const [editField, setEditField] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    (async () => {
      let res = await axios.get(
        "http://localhost:5000/api/prisoner/get-inmates"
      );
      let tempIDs = res.data.map((elem) => elem.inmateID);
      setIDs(tempIDs);
      setInmates(res.data);
      console.log(res.data);
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      let index = inmates.findIndex((elem) => elem.inmateID === id);
      console.log(index);
      let tempObj = inmates[index];
      switch (editField) {
        case "Age":
          tempObj.age = Number(value);
          break;
        case "Cell ID":
          tempObj.cellID = value;
          break;
        case "Job ID":
          tempObj.jobID = value;
          break;
        case "Release Date":
          tempObj.release_date = new Date(value).toLocaleDateString();
          break;
        default:
          return;
      }
      tempObj.release_date = new Date(tempObj.release_date)
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");

      console.log(tempObj);
      await axios.post(
        "http://localhost:5000/api/prisoner/update-inmate",
        tempObj
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
        <b>Edit Inmate</b>
      </Typography>
      <Grid container flexDirection="column">
        <Grid item>
          <Box sx={{ width: "240px", marginTop: 5 }}>
            <FormControl fullWidth>
              <InputLabel>Inmate ID</InputLabel>
              <Select value={id} onChange={(e) => setID(e.target.value)}>
                {IDs.map((elem, key) => (
                  <MenuItem value={elem} key={key}>
                    {elem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item>
          {id && (
            <>
              <Box sx={{ width: "240px", marginTop: 5 }}>
                <FormControl fullWidth>
                  <InputLabel>Field to edit</InputLabel>
                  <Select
                    value={editField}
                    onChange={(e) => setEditField(e.target.value)}
                  >
                    {["Age", "Cell ID", "Job ID", "Release Date"].map(
                      (elem, key) => (
                        <MenuItem value={elem} key={key}>
                          {elem}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
          {id && editField && (
            <>
              <Box sx={{ width: "240px", marginTop: 5, marginBottom: 5 }}>
                <TextField
                  variant="outlined"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  label="Value to edit"
                  color="secondary"
                  required
                />
              </Box>
            </>
          )}
          {id && editField && value !== "" && (
            <>
              <Button variant="outlined" onClick={handleSubmit}>
                Edit
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default EditInmate;
