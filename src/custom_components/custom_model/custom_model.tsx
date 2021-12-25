import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PsychologyIcon from "@mui/icons-material/Psychology";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VideocamIcon from "@mui/icons-material/Videocam";
import ConstructionIcon from "@mui/icons-material/Construction";
import MouseIcon from "@mui/icons-material/Mouse";




interface PropsTypesDialog{
  id:string
onClose: ()=>any
children?:any

}
interface CustomizeDialogTypes{
 data?:any
children?:any

}



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props:PropsTypesDialog) => {
  const { children, onClose, ...other } = props;


  return (
    <DialogTitle sx={{ m: 0, p: 5 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs(props:CustomizeDialogTypes) {
  const [open, setOpen] = React.useState(false);

  const { data, children } = props;
 

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {children(handleClickOpen)}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id={"customized-dialog-title"}
          onClose={handleClose}
        />

        <div style={{ marginLeft: "20px", marginBottom: "10px" }}>
          <iframe
            src={data?.url}
            style={{ height: "250px", width: "95%" }}
            title="Iframe Example"
          ></iframe>

          <div dangerouslySetInnerHTML={{ __html: data?.description }} />

          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon style={{ marginRight: "10px" }} />3 min
              </div>
              <div style={{ marginLeft: "7px" }}>
                <Tooltip
                  title="
                                    TAKE-AWAY INDIVIDUAL TRAINING SUGGESTED
                                    "
                  placement="top-start"
                  arrow
                >
                  <IconButton color="primary">
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
                  <IconButton color="primary">
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
                  <IconButton color="primary">
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
                  <IconButton color="primary">
                    <MouseIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </BootstrapDialog>
    </div>
  );
}
