import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PsychologyIcon from "@mui/icons-material/Psychology";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VideocamIcon from "@mui/icons-material/Videocam";
import ConstructionIcon from "@mui/icons-material/Construction";
import MouseIcon from "@mui/icons-material/Mouse";
import CustomModel from "../../custom_components/custom_model/custom_model";

interface PropsFC{
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

interface PropsData{
  data :PropsFC
}

const HomeCard:React.FC<PropsData> = ({data}: PropsData) => {

  const path =
    "https://headversity-staging.s3.ca-central-1.amazonaws.com/admin/";
  return (
    <div style={{ cursor: "pointer" }}>
      <CustomModel data={data}>
        {(handleClickOpen: any) => (
          <Card sx={{ maxWidth: 345 }} onClick={() => handleClickOpen()}>
            <CardMedia
              component="img"
              height="200"
              image={`${path}${data.image}`}
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {data.name}
              </Typography>
            </CardContent>
            <CardActions
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AccessAlarmIcon color="primary" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ marginLeft: "10px" }}>{data.duration} min</span>
                <div style={{ marginLeft: "7px" }}>
                  <Tooltip
                    title="
                                    TAKE-AWAY INDIVIDUAL TRAINING SUGGESTED
                                    "
                    placement="top-start"
                    arrow
                  >
                    <IconButton>
                      <PsychologyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="
                                     VIDEO TRAINING INCLUDED
                                    "
                    placement="top-start"
                    arrow
                  >
                    <IconButton>
                      <VideocamIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="
                                     TOOL-BASED TRAINING INCLUDED OR SUGGESTED                                     
                                    "
                    placement="top-start"
                    arrow
                  >
                    <IconButton>
                      <ConstructionIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="                                    
GROUP ACTIVITY INCLUDED OR SUGGESTED                                    
                                    "
                    placement="top-start"
                    arrow
                  >
                    <IconButton>
                      <MouseIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </CardActions>
          </Card>
        )}
      </CustomModel>
    </div>
  );
};

export default HomeCard;
