import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PsychologyIcon from "@mui/icons-material/Psychology";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VideocamIcon from "@mui/icons-material/Videocam";
import ConstructionIcon from "@mui/icons-material/Construction";
import MouseIcon from "@mui/icons-material/Mouse";
import CustomModel from "../../custom_components/custom_model/custom_model";
import useMediaQuery from '@mui/material/useMediaQuery';


interface PresentationType{
  description:String
duration: String
id: Number
image: String
intent: String
interactive: Boolean
name: String
practice: Boolean
private: Boolean
scope: String
train: Boolean
url:String
video: Boolean

}

interface PropTypes{
  data:PresentationType
  path:String
}

const PathDetailsCard: React.FC<PropTypes> = ({ data, path }: PropTypes) => {
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <Card
      sx={{
        display: "flex",
        padding: "10px 20px",
        boxShadow: `7px 7px 14px #dbdbdb,
        -7px -7px 14px #ffffff;`,
      }}
    >
      <Grid container>
        <Grid item xs={12} md={4} >
          <CardMedia
            component="img"
            sx={{ width:matches?"100%": 151 }}
            image={`${path}${data.image}`}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component="div"
              variant="h5"
              style={{ marginTop: "10px" }}
            >
              {data.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} style={{ marginTop: matches?"15px": "35px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon style={{ marginRight: "10px" }} />3 min
            </div>
            <div style={{ marginLeft: "7px" }}>
              <Tooltip
                title="TAKE-AWAY INDIVIDUAL TRAINING SUGGESTED"
                placement="top-start"
                arrow
              >
                <IconButton>
                  <PsychologyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="VIDEO TRAINING INCLUDED"
                placement="top-start"
                arrow
              >
                <IconButton>
                  <VideocamIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="TOOL-BASED TRAINING INCLUDED OR SUGGESTED "
                placement="top-start"
                arrow
              >
                <IconButton>
                  <ConstructionIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="GROUP ACTIVITY INCLUDED OR SUGGESTED "
                placement="top-start"
                arrow
              >
                <IconButton>
                  <MouseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Grid>
        <Grid item xs={4} style={{ marginTop: matches?"15px": "38px", display: "flex" }}>
          <CustomModel data={data}>
            {(handleClickOpen: any) => (
              <Button variant="outlined" onClick={() => handleClickOpen()}>
                Preview
              </Button>
            )}
          </CustomModel>
          {/* <PathsModal data={data} name="Preview" /> */}
          <div style={{ marginLeft: "20px" }}>
            <CustomModel data={data}>
              {(handleClickOpen: any) => (
                <Button variant="outlined" onClick={() => handleClickOpen()}>
                  Present
                </Button>
              )}
            </CustomModel>
            {/* <PathsModal data={data} name="Present" /> */}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PathDetailsCard;
