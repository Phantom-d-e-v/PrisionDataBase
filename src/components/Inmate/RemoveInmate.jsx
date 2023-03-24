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

const RemoveInmate = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/prisoner/delete-inmate", {
        inmateID: selected,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      let res = await axios.get(
        "http://localhost:5000/api/prisoner/get-inmates"
      );
      res = res.data.map((elem) => elem.inmateID);
      setData(res);
    })();
  }, []);
  return (
    <div>
      <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
        <b>Remove Inmate</b>
      </Typography>
      <Box sx={{ width: "50%", marginBottom: 5, marginTop: 5 }}>
        <FormControl fullWidth>
          <InputLabel>Remove Inmate</InputLabel>
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
        <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default RemoveInmate;
