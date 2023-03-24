import React, { useState, useEffect } from "react";
import ParentPage from "./ParentPage";
import {
  Button,
  TextField,
  Grid,
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { Box } from "@mui/system";

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:825px)"]: {
      width: "90vw",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:825px)"]: {
      width: "40vw",
    },
  },
}));

const Schedule = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [startTime, setStartTime] = useState(new Date().toLocaleTimeString());
  const [endTime, setEndTime] = useState(new Date().toLocaleTimeString());
  const [clicked, setClicked] = useState(false);
  const [visit, setVisit] = useState("");
  const [IDs, setIDs] = useState([]);
  const [chosen, setChosen] = useState("");

  const [datetime, setDateTime] = useState([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    (async () => {
      let res = await axios.get(
        "http://localhost:5000/api/prisoner/get-inmates"
      );
      let tempIDs = res.data.map((elem) => elem.inmateID);
      setIDs(tempIDs);
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/prisoner/add-visitor", {
        prisoner_id: chosen,
        name,
        address,
        phone,
        date: new Date(date)
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-"),
        start_time: startTime,
        end_time: endTime,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleVisitSubmit = async () => {
    let res = await axios.post(
      "http://localhost:5000/api/prisoner/get-visitor",
      { visitID: visit }
    );
    console.log(res.data);
    setDateTime([res.data[0].visitor_date, res.data[0].visit_starttime]);
    setCheck(true);
  };

  return (
    <ParentPage>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%", width: "100%" }}
      >
        <Grid item>
          <Card className={classes.card} elevation={6}>
            {!clicked ? (
              <>
                <Typography
                  variant="h5"
                  style={{
                    margin: "1.5em 0 0.5em 1.5em",
                    fontFamily: "Roboto Condensed",
                  }}
                  alignSelf="start"
                >
                  <b>Visitor Form Details</b>
                </Typography>
                <TextField
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  color="secondary"
                  required
                  style={{ margin: "1.5em 0 0.75em 0", width: "90%" }}
                />
                <Box sx={{ width: "240px", marginTop: 2.5, marginBottom: 2.5 }}>
                  <FormControl fullWidth>
                    <InputLabel>Inmate ID</InputLabel>
                    <Select
                      value={chosen}
                      onChange={(e) => setChosen(e.target.value)}
                    >
                      {IDs.map((elem, key) => (
                        <MenuItem value={elem} key={key}>
                          {elem}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  color="secondary"
                  label="Address"
                  required
                  style={{ margin: "0.75em", width: "90%" }}
                />
                <TextField
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  color="secondary"
                  label="Phone"
                  type="number"
                  required
                  style={{ margin: "0.75em", width: "90%" }}
                />
                <TextField
                  variant="outlined"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  color="secondary"
                  type="date"
                  required
                  style={{ margin: "0.75em", width: "90%" }}
                />
                <Grid container justifyContent="space-evenly">
                  <Grid item lg={5} md={5}>
                    Start
                    <TextField
                      variant="outlined"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      color="secondary"
                      type="time"
                      required
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid lg={5} md={5}>
                    End
                    <TextField
                      variant="outlined"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      color="secondary"
                      type="time"
                      required
                      style={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "1.5em", width: "90%" }}
                  size="large"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </>
            ) : (
              <>
                <Typography
                  variant="h5"
                  style={{
                    margin: "1.5em 0 0.5em 1.5em",
                    fontFamily: "Roboto Condensed",
                  }}
                  alignSelf="start"
                >
                  <b>Check Appointment</b>
                </Typography>
                <TextField
                  variant="outlined"
                  value={visit}
                  onChange={(e) => setVisit(e.target.value)}
                  label="Visit ID"
                  color="secondary"
                  required
                  style={{ margin: "1.5em 0 0.75em 0", width: "90%" }}
                />
                {check &&
                  `Your appointment is at ${new Date(
                    datetime[0]
                  ).toLocaleDateString()} at ${datetime[1]}`}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "1.5em", width: "90%" }}
                  size="large"
                  onClick={handleVisitSubmit}
                >
                  Check
                </Button>
              </>
            )}
            <Button
              style={{ margin: "0.25em 0 1.25em 2em", alignSelf: "start" }}
              onClick={() => setClicked(!clicked)}
              variant="text"
            >
              {!clicked
                ? "Click here to view appointment details"
                : "Click here to schedule a visit"}
            </Button>
          </Card>
        </Grid>
      </Grid>
    </ParentPage>
  );
};

export default Schedule;
