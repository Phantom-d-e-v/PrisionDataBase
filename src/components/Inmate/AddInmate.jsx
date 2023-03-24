import {
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import _ from "lodash";
import { AddCircle, IndeterminateCheckBox } from "@mui/icons-material";

const AddInmate = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("M");
  const [bloodGroup, setBloodGroup] = useState("");
  const [sentenceStart, setSentenceStart] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [caseDetail, setCaseDetail] = useState("");
  const [jobID, setJobID] = useState("");
  const [cellID, setCellID] = useState("");
  const [jobs, setJobs] = useState([]);
  const [cells, setCells] = useState([]);
  const [offences, setOffences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [crimeCount, setCrimeCount] = useState(1);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let jobs = await axios.get(
          "http://localhost:5000/api/prisoner/get-jobs"
        );
        let cells = await axios.get(
          "http://localhost:5000/api/prisoner/get-cells"
        );
        let offences = await axios.get(
          "http://localhost:5000/api/prisoner/get-offence-records"
        );
        jobs = jobs.data.map((elem) => elem.jobID);
        cells = cells.data.map((elem) => elem.cellID);
        offences = offences.data.map((elem) => [
          elem.offenceID,
          elem.offence_description,
        ]);
        setJobs(jobs);
        setCells(cells);
        setOffences(offences);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/prisoner/add-inmate", {
        cellID,
        jobID,
        name,
        age,
        gender,
        bloodgroup: bloodGroup,
        sentence_start: sentenceStart,
        release_date: releaseDate,
        case_detail: caseDetail,
        offenceIDs: options,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCount = (index) => {
    let tempArr = [...options];
    tempArr.splice(index, 1);
    setOptions(tempArr);
    setCrimeCount(crimeCount - 1);
  };

  return (
    <div>
      {!loading && (
        <>
          <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
            <b>Add Inmate</b>
          </Typography>
          <Grid container>
            <Grid item md={9}>
              <Box sx={{ width: "50%", marginBottom: 5, marginTop: 5 }}>
                <FormControl fullWidth>
                  <InputLabel>Cell ID</InputLabel>
                  <Select
                    value={cellID}
                    onChange={(e) => setCellID(e.target.value)}
                  >
                    {cells.map((elem, key) => (
                      <MenuItem value={elem} key={key}>
                        {elem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item md={9}>
              <Box sx={{ width: "50%" }}>
                <FormControl fullWidth>
                  <InputLabel>Job ID</InputLabel>
                  <Select
                    value={jobID}
                    onChange={(e) => setJobID(e.target.value)}
                  >
                    {jobs.map((elem, key) => (
                      <MenuItem value={elem} key={key}>
                        {elem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            {_.times(crimeCount, (index) => {
              return (
                <Box sx={{ width: "50%", marginTop: 3 }} key={index}>
                  <Grid container>
                    <Grid item md={9}>
                      <FormControl fullWidth>
                        <InputLabel>Select Crime {index + 1}</InputLabel>
                        <Select
                          value={options[index] ? options[index] : ""}
                          onChange={(e) => {
                            let tempArr = [...options];
                            tempArr[index] = e.target.value;
                            setOptions(tempArr);
                          }}
                        >
                          {offences.map((elem, key) => (
                            <MenuItem value={elem[0]} key={key}>
                              {elem.join(" - ")}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <IconButton
                        style={{ marginTop: "0.25em" }}
                        onClick={() => setCrimeCount(crimeCount + 1)}
                      >
                        <AddCircle color="primary" />
                      </IconButton>
                    </Grid>
                    {index !== 0 && (
                      <Grid item>
                        <IconButton
                          style={{ marginTop: "0.25em" }}
                          onClick={() => deleteCount(index)}
                        >
                          <IndeterminateCheckBox color="secondary" />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              );
            })}
            <Grid item md={9}>
              <TextField
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                color="secondary"
                required
                style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
              />
            </Grid>
            <Grid item md={9}>
              <TextField
                variant="outlined"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                label="Age"
                color="secondary"
                required
                style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
              />
            </Grid>
            <Grid item md={9}>
              <TextField
                variant="outlined"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
                color="secondary"
                required
                style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
              />
            </Grid>
            <Grid item md={9}>
              <TextField
                variant="outlined"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                label="Blood Group"
                color="secondary"
                required
                style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
              />
            </Grid>
            <Grid item md={9}>
              <TextField
                variant="outlined"
                value={sentenceStart}
                onChange={(e) => setSentenceStart(e.target.value)}
                color="secondary"
                required
                style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
                type="date"
              />
            </Grid>
            <Grid item md={9}>
              <TextField
                variant="outlined"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                color="secondary"
                required
                style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
                type="date"
              />
            </Grid>
            <Grid item md={9}>
              <TextField
                variant="outlined"
                value={caseDetail}
                onChange={(e) => setCaseDetail(e.target.value)}
                label="Case Detail"
                color="secondary"
                required
                style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
                type="text"
              />
            </Grid>
            <Grid item md={9} mt={2}>
              <Button variant="outlined" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default AddInmate;
