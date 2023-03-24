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

const UpdateJob = () => {
  const [jobs, setJobs] = useState([]);
  const [IDs, setIDs] = useState([]);
  const [id, setID] = useState("");
  const [editField, setEditField] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    (async () => {
      let res = await axios.get("http://localhost:5000/api/prisoner/get-jobs");
      let tempIDs = res.data.map((elem) => elem.jobID);
      setIDs(tempIDs);
      setJobs(res.data);
      console.log(res.data);
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      let index = jobs.findIndex((elem) => elem.jobID === id);
      console.log(index);
      let tempObj = jobs[index];
      switch (editField) {
        case "Job Pay":
          tempObj.jobPay = value;
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
        "http://localhost:5000/api/prisoner/update-job",
        tempObj
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
        <b>Update Job</b>
      </Typography>
      <Grid container flexDirection="column">
        <Grid item>
          <Box sx={{ width: "240px", marginTop: 5 }}>
            <FormControl fullWidth>
              <InputLabel>Job ID</InputLabel>
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
                    {["Job Pay"].map((elem, key) => (
                      <MenuItem value={elem} key={key}>
                        {elem}
                      </MenuItem>
                    ))}
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

export default UpdateJob;
