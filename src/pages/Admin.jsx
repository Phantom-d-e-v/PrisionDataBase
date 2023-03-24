import React, { useState } from "react";
import {
  Grid,
  AppBar,
  Typography,
  Drawer,
  Toolbar,
  ListItem,
  Divider,
  List,
} from "@mui/material";
import { Box } from "@mui/system";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";

import ViewInmates from "../components/Inmate/ViewInmates";
import AddInmate from "../components/Inmate/AddInmate";
import EditInmate from "../components/Inmate/EditInmate";
import ViewPersonnels from "../components/Personnel/ViewPersonnel";
import ViewJobs from "../components/Jobs/ViewJobs";
import ViewOffences from "../components/Offence/ViewOffences";
import ViewVisits from "../components/Visits/ViewVisits";
import ViewCells from "../components/Cell/ViewCells";
import SearchByOffence from "../components/Inmate/SearchByOffence";
import AddPersonnel from "../components/Personnel/AddPersonnel";
import SearchByJob from "../components/Inmate/SearchByJob";
import RemoveInmate from "../components/Inmate/RemoveInmate";
import AddJob from "../components/Jobs/AddJob";
import AddOffence from "../components/Offence/AddOffence";
import RemovePersonnel from "../components/Personnel/RemovePersonnel";
import ViewVisitsByInmate from "../components/Visits/ViewVisitsByInmates";
import ViewVisitsByDate from "../components/Visits/ViewVisitsByDate";
import ViewInmatesInCell from "../components/Cell/ViewInmatesInCell";
import UpdatePersonnel from "../components/Personnel/UpdatePersonnel";
import UpdateJob from "../components/Jobs/UpdateJob";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const drawerWidth = 240;

const Admin = () => {
  const [option, setOption] = useState("View all inmates");

  const renderComponent = () => {
    switch (option) {
      case "View all inmates":
        return <ViewInmates />;
      case "Add inmate":
        return <AddInmate />;
      case "Edit inmate":
        return <EditInmate />;
      case "View all personnel":
        return <ViewPersonnels />;
      case "View all jobs":
        return <ViewJobs />;
      case "View offences list":
        return <ViewOffences />;
      case "View all visits":
        return <ViewVisits />;
      case "View cells":
        return <ViewCells />;
      case "Search by offence":
        return <SearchByOffence />;
      case "Add personnel":
        return <AddPersonnel />;
      case "Search by job":
        return <SearchByJob />;
      case "Remove inmate":
        return <RemoveInmate />;
      case "Add job":
        return <AddJob />;
      case "Add offence":
        return <AddOffence />;
      case "Remove personnel":
        return <RemovePersonnel />;
      case "View vists for Inmate":
        return <ViewVisitsByInmate />;
      case "View visits for date":
        return <ViewVisitsByDate />;
      case "View inmates in cells":
        return <ViewInmatesInCell />;
      case "Update personnel post":
        return <UpdatePersonnel />;
      case "Update job pay":
        return <UpdateJob />;
      default:
        break;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        style={{ height: "4em" }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Grid
          container
          justifyContent="start"
          alignItems="center"
          style={{ height: "100%", marginLeft: 20 }}
        >
          <Typography variant="h5" style={{ fontFamily: "Roboto Condensed" }}>
            <b>Admin Dashboard</b>
          </Typography>
        </Grid>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", paddingRight: 0 }}>
          {["Inmate", "Personnel", "Visits", "Jobs", "Offence", "Cell"].map(
            (text, index) => (
              <Accordion>
                <AccordionSummary>{text}</AccordionSummary>
                <AccordionDetails style={{ margin: 0, padding: 0 }}>
                  <List>
                    {text === "Inmate" &&
                      [
                        "View all inmates",
                        "Add inmate",
                        "Edit inmate",
                        "Search by offence",
                        "Search by job",
                        "Remove inmate",
                      ].map((option, index) => (
                        <ListItem button onClick={() => setOption(option)}>
                          {option}
                        </ListItem>
                      ))}
                    {text === "Personnel" &&
                      [
                        "View all personnel",
                        "Add personnel",
                        "Update personnel post",
                        "Remove personnel",
                      ].map((option, index) => (
                        <ListItem button onClick={() => setOption(option)}>
                          {option}
                        </ListItem>
                      ))}
                    {text === "Visits" &&
                      [
                        "View all visits",
                        "View vists for Inmate",
                        "View visits for date",
                      ].map((option, index) => (
                        <ListItem button onClick={() => setOption(option)}>
                          {option}
                        </ListItem>
                      ))}
                    {text === "Jobs" &&
                      ["View all jobs", "Add job", "Update job pay"].map(
                        (option, index) => (
                          <ListItem button onClick={() => setOption(option)}>
                            {option}
                          </ListItem>
                        )
                      )}
                    {text === "Offence" &&
                      ["View offences list", "Add offence"].map(
                        (option, index) => (
                          <ListItem button onClick={() => setOption(option)}>
                            {option}
                          </ListItem>
                        )
                      )}
                    {text === "Cell" &&
                      ["View cells", "View inmates in cells"].map(
                        (option, index) => (
                          <ListItem button onClick={() => setOption(option)}>
                            {option}
                          </ListItem>
                        )
                      )}
                  </List>
                </AccordionDetails>
              </Accordion>
            )
          )}
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, paddingRight: 0 }}>
        <Toolbar />
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default Admin;
