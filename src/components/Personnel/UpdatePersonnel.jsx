import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePersonnel = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/prisoner/update-personnel", {
        personnelID: selected,
        postID: selected2,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      let res = await axios.get(
        "http://localhost:5000/api/prisoner/get-personnels"
      );
      let res2 = await axios.get(
        "http://localhost:5000/api/prisoner/get-posts"
      );
      res = res.data.map((elem) => elem.personnelID);
      res2 = res2.data.map((elem) => elem.postID);
      console.log(res, res2);
      setData(res);
      setData2(res2);
    })();
  }, []);

  return (
    <div>
      <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
        <b>Update Personnel</b>
      </Typography>
      <Box sx={{ width: "50%", marginBottom: 5, marginTop: 5 }}>
        <FormControl fullWidth>
          <InputLabel>Select Personnel</InputLabel>
          <Select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {data.map((elem, key) => (
              <MenuItem value={elem} key={key}>
                {elem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selected && (
        <Box sx={{ width: "50%", marginBottom: 5, marginTop: 5 }}>
          <FormControl fullWidth>
            <InputLabel>Select Post</InputLabel>
            <Select
              value={selected2}
              onChange={(e) => setSelected2(e.target.value)}
            >
              {data2.map((elem, key) => (
                <MenuItem value={elem} key={key}>
                  {elem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {selected && selected2 && (
        <Button onClick={handleSubmit} variant="outlined">
          Submit
        </Button>
      )}
    </div>
  );
};

export default UpdatePersonnel;
