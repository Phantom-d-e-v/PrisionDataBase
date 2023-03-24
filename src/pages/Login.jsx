import React, { useState } from "react";
import { Button, TextField, Grid, Card, Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ParentPage from "./ParentPage";
import { ReactComponent as Jail } from "../jail.svg";
import axios from "axios";

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:825px)"]: {
      width: "30vw",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:825px)"]: {
      width: "90vw",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      let res = await axios.post("http://localhost:5000/api/prisoner/login", {
        Username: email,
        Password: password,
      });
      console.log(res);
      if (res.status === 200) {
        window.location.href = "/admin";
      }
    } catch (err) {
      console.log(err);
    }
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
            <Jail style={{ height: "6em", width: "6em", marginTop: "1.5em" }} />
            <Typography
              variant="h5"
              style={{
                margin: "0.25em 0 0.5em 1.5em",
                fontFamily: "Roboto Condensed",
              }}
              alignSelf="start"
            >
              <b>Prison Database</b>
            </Typography>
            <TextField
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Username"
              color="secondary"
              required
              style={{ margin: "1.5em", width: "90%" }}
            />
            <TextField
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color="secondary"
              label="Password"
              type="password"
              required
              style={{ margin: "0.75em", width: "90%" }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "1.5em", width: "90%" }}
              size="large"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Link
              alignSelf="start"
              style={{ margin: "0.25em 0 1em 1.5em" }}
              href="/schedule"
            >
              Click here to schedule a visit
            </Link>
          </Card>
        </Grid>
      </Grid>
    </ParentPage>
  );
};
export default Login;
