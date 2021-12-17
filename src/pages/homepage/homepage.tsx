import { Box, Typography } from "@mui/material";
import React from "react";
import HomepageTabs from "./Tabs/homepagetabs";

const Homepage: React.FC = () => {
  return (
    <Box style={{ width: "95%", margin: "auto", paddingTop: "20px" }}>
      <Typography variant="h4" gutterBottom component="div">
        Team Training
      </Typography>
      <HomepageTabs />
    </Box>
  );
};

export default Homepage;
