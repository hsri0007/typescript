import {
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DropDownComponent from "../dropdowncustom/dropdowncustom";
import HomeCard from "./HomeCard";
import qs from "qs";
import SearchIcon from "@mui/icons-material/Search";
import { getAllSkills, getPresentationsByData } from "../../apiCalls";

const Homeallpages = () => {
  const [searchText, setsearchText] = useState("");
  const [skillsData, setSkillsData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [presentationCardData, setPresentationCardData] = useState([]);

  const [skills, setSkillState] = useState<any>([]);

  const [duration, setDuration] = useState([3, 5, 7]);

  const [scope, setScope] = useState(["Starter", "Advanced", "Veteran"]);

  const [intent, setIntent] = useState(["StandUp", "SitDown"]);

  React.useEffect(() => {
    setLoading(true);
    getAllSkills()
      .then((res: any) => {
        setSkillsData(res);
        setLoading(false);
        setSkillState(res.map((arr: any) => arr.name));
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const obj = {};

    let config = {
      params: obj,
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    };
    getPresentationsByData(config).then((res: any) => {
      setPresentationCardData(res);
    });
  }, []);

  const handleClick = () => {
    const filterskills: any = skillsData?.filter((res: any, i: number) =>
      skills.includes(res.name)
    );
    const obj = {
      skillId: filterskills.map((res: any) => res?.id),
      duration,
      scope,
      intent,
      searchText,
    };

    let config = {
      params: obj,
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    };
    getPresentationsByData(config).then((res: any) => {
      setPresentationCardData(res);
    });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item container xs={9} spacing={2}>
          <Grid
            item
            container
            xs={12}
            spacing={2}
            style={{ marginBottom: "20px" }}
          >
            <Grid item xs={2.5}>
              <DropDownComponent
                title="Skill"
                names={skillsData.map((res: any) => res.name)}
                personName={skills}
                setPersonName={setSkillState}
              />
            </Grid>
            <Grid item xs={2.5}>
              <DropDownComponent
                title="Duration"
                names={[3, 5, 7]}
                personName={duration}
                setPersonName={setDuration}
              />
            </Grid>
            <Grid item xs={2.5}>
              <DropDownComponent
                title="Scope"
                names={["Starter", "Advanced", "Veteran"]}
                personName={scope}
                setPersonName={setScope}
              />
            </Grid>
            <Grid item xs={2.5}>
              <DropDownComponent
                title="Intent"
                names={["StandUp", "SitDown"]}
                personName={intent}
                setPersonName={setIntent}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl sx={{ m: 1, width: "18ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  onChange={(e) => setsearchText(e.target.value)}
                  placeholder="search"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon
                          color="secondary"
                          style={{ cursor: "pointer" }}
                          onClick={handleClick}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <div style={{ display: "grid", placeItems: "center" }}>
              {loading && <CircularProgress />}
            </div>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          {presentationCardData?.map((res, i) => (
            <Grid item xs={4} key={i}>
              <HomeCard data={res} />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={3}>
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

export default Homeallpages;
