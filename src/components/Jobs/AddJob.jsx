import { Typography, Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const AddJob = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [jobPay, setJobPay] = useState(0);
  const [job_startime, setStartTime] = useState("");
  const [job_endtime, setEndTime] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/prisoner/add-job", {
        jobDesc,
        jobPay,
        job_startime,
        job_endtime,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <>
        <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
          <b>Add Job</b>
        </Typography>
        <Grid container>
          <Grid item md={9}>
            <TextField
              variant="outlined"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              label="jobDesc"
              color="secondary"
              required
              style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
            />
          </Grid>
          <Grid item md={9}>
            <TextField
              variant="outlined"
              value={jobPay}
              onChange={(e) => setJobPay(e.target.value)}
              label="JobPay"
              color="secondary"
              required
              style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
            />
          </Grid>
          <Grid item md={9}>
            <TextField
              variant="outlined"
              value={job_startime}
              onChange={(e) => setStartTime(e.target.value)}
              label="StartTime"
              color="secondary"
              required
              style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
            />
          </Grid>
          <Grid item md={9}>
            <TextField
              variant="outlined"
              value={job_endtime}
              onChange={(e) => setEndTime(e.target.value)}
              label="EndTime"
              color="secondary"
              required
              style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
            />
          </Grid>
          <Grid item md={9} mt={2}>
            <Button variant="outlined" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </>
    </div>
  );
};

export default AddJob;
