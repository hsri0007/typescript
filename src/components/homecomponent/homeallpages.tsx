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



interface skilldatobj {
  class: String
  description: String
  id: Number
  name: String
}

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


const Homeallpages = () => {
  const [searchText, setsearchText] = useState<String>("");
  const [skillsData, setSkillsData] = useState<skilldatobj[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [presentationCardData, setPresentationCardData] = useState<PresentationType[]>([]);

  const [skills, setSkillState] = useState<String[] >([]);

  const [duration, setDuration] = useState([3, 5, 7]);

  const [scope, setScope] = useState(["Starter", "Advanced", "Veteran"]);

  const [intent, setIntent] = useState(["StandUp", "SitDown"]);

  const [limit,setLimit]=useState(10)
  const [offset,setOffset]=useState(1)


 


  const handleChange=(e:any,newvalue:any)=>{
    const newoffset = limit * newvalue
console.log(newoffset)
  }



  React.useEffect(() => {
    setLoading(true);
    getAllSkills()
      .then((res: skilldatobj[]) => {
        setSkillsData(res);
        setLoading(false);
        setSkillState(res.map((arr: skilldatobj) => arr.name));
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const obj = {};

    let config = {
      params: obj,
      paramsSerializer: (params: Object) => {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    };
    getPresentationsByData(config).then((res:any) => {
      
      setPresentationCardData(res);
    });
  }, []);

  const handleClick = () => {
    const filterskills = skillsData?.filter((res: skilldatobj, i: number) =>
      skills.includes(res.name)
    );
    const obj = {
      skillId: filterskills.map((res) => res?.id),
      duration,
      scope,
      intent,
      searchText,
    };

    let config = {
      params: obj,
      paramsSerializer: (params: {
        skillId: Number[];
        duration: number[];
        scope: string[];
        intent: string[];
        searchText: String;
    }) => {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    };
    getPresentationsByData(config).then((res:any) => {
     
      setPresentationCardData(res);
    });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item container xs={12} md={9} spacing={2}>
          <Grid
            item
            container
            xs={12}
            spacing={2}
            style={{ marginBottom: "20px" }}
          >
            <Grid item xs={12} md={2.5}>
              <DropDownComponent
                title="Skill"
                names={skillsData.map((res) => res.name)}
                personName={skills}
                setPersonName={setSkillState}
              />
            </Grid>
            <Grid item xs={12} md={2.5}>
              <DropDownComponent
                title="Duration"
                names={[3, 5, 7]}
                personName={duration}
                setPersonName={setDuration}
              />
            </Grid>
            <Grid item xs={12} md={2.5}>
              <DropDownComponent
                title="Scope"
                names={["Starter", "Advanced", "Veteran"]}
                personName={scope}
                setPersonName={setScope}
              />
            </Grid>
            <Grid item xs={12} md={2.5}>
              <DropDownComponent
                title="Intent"
                names={["StandUp", "SitDown"]}
                personName={intent}
                setPersonName={setIntent}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  onChange={(e) => setsearchText(e.target.value)}
                  placeholder="search"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClick}>
                        <SearchIcon
                          color="secondary"
                          style={{ cursor: "pointer" }}

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
          <Grid item xs={12}>
            <div style={{ display: "grid", placeItems: "center" }}>
              {loading && <CircularProgress />}
            </div>
          </Grid>
          
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {presentationCardData?.map((res, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <HomeCard data={res} /> 
            </Grid>
          ))}
              <Grid container spacing={2} style={{ margin: "10px 0px" }}>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" component={"div"} gutterBottom>
            Showing 28 to 30 entries
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Pagination count={10} color="primary" onChange={handleChange} />
        </Grid>
      </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
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
    </div>
  );
};

export default Homeallpages;
