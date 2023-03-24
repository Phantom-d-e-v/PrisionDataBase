import {
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";

const AddPersonnel = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("M");
  const [bloodGroup, setBloodGroup] = useState("");
  const [personnel_phone, setPersonnel_phone] = useState("");
  const [postID, setPostID] = useState("");
  const [prison, setPrison] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prisonID, setPrisonID] = useState("");

  useEffect(() => {
    (async () => {
      try {
        let prison = await axios.get(
          "http://localhost:5000/api/prisoner/get-personnels"
        );
        let posts = await axios.get(
          "http://localhost:5000/api/prisoner/get-posts"
        );
        prison = prison.data.map((elem) => elem.prisonID);
        posts = posts.data.map((elem) => elem.postID);
        setPrison(prison);
        setPosts(posts);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/prisoner/add-personnel", {
        prisonID,
        postID,
        name,
        age,
        gender,
        personnel_phone,
        bloodgroup: bloodGroup,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {!loading && (
        <>
          <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
            <b>Add Personnel</b>
          </Typography>
          <Grid container>
            <Grid item md={9}>
              <Box sx={{ width: "50%", marginBottom: 5, marginTop: 5 }}>
                <FormControl fullWidth>
                  <InputLabel>Prison ID</InputLabel>
                  <Select
                    value={prisonID}
                    onChange={(e) => setPrisonID(e.target.value)}
                  >
                    {prison.map((elem, key) => (
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
                  <InputLabel>Post ID</InputLabel>
                  <Select
                    value={postID}
                    onChange={(e) => setPostID(e.target.value)}
                  >
                    {posts.map((elem, key) => (
                      <MenuItem value={elem} key={key}>
                        {elem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
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
                value={personnel_phone}
                onChange={(e) => setPersonnel_phone(e.target.value)}
                label="Personnel_phone"
                color="secondary"
                required
                style={{ margin: "1.5em 0 0.75em 0", width: "50%" }}
              />
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

export default AddPersonnel;
