import { Typography, Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const AddOffence = () => {
  const [offence_description, setOffence_description] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/prisoner/add-offence-record",
        {
          offence_description,
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <>
        <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
          <b>Add Offence</b>
        </Typography>
        <Grid container>
          <Grid item md={9}>
            <TextField
              variant="outlined"
              value={offence_description}
              onChange={(e) => setOffence_description(e.target.value)}
              label="Offence Description"
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

export default AddOffence;
