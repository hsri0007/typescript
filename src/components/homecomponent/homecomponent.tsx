import React from "react";
import HomeTable from "./hometable/hometable";
import Grid from "@mui/material/Grid";
import { Pagination, Typography } from "@mui/material";

const HomeComponent: React.FC = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <HomeTable />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom component="div">
            What is Team Training?
          </Typography>
          <Typography variant="body1" component={"div"} gutterBottom>
            Headversity Team Training radically improve your psychological
            health and safety initiatives without adding preparation time or
            prolonging the meeting. With ﻿headversity's ﻿Team Training platform,
            you get turn-key, evidence-based and media-rich team resilience
            training moments for any meeting you choose. ﻿ Company leaders, team
            leads, Safety Officers, HR Managers and/or any team member can
            easily upskill staff to ensure a healthy, incident-free and
            supportive workplace.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ margin: "10px 0px" }}>
        <Grid item xs={4}>
          <Typography variant="body2" component={"div"} gutterBottom>
            Showing 28 to 30 entries
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Pagination count={10} color="primary" />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeComponent;
