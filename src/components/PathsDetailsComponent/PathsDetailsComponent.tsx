import { CircularProgress, Container, Grid, Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PathDetailsCard from "./pathsdetailscard";
import { getPathsByPresentationId } from "../../apiCalls";



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

const PathsDetailsComponent: React.FC = () => {
  const params = useParams();
  const [limit,setLimit]=useState(10)
  const [offset,setOffset]=useState(1)


 


  const handleChange=(e:any,newvalue:any)=>{
    const newoffset = limit * newvalue
console.log(newoffset)
  }
  const [loading, setLoading] = useState(false);
  const base =
    "https://headversity-staging.s3.ca-central-1.amazonaws.com/admin/";
  const [state, setState] = useState<PropsFC[]>([]);


  useEffect(() => {
    setLoading(true);
    getPathsByPresentationId(params?.id)
      .then((res:any) => {
        setState(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params]);

  return (
    <div style={{ marginTop: "20px",paddingBottom:"20px" }}>
      <Container>
        <div style={{ display: "grid", placeItems: "center" }}>
          {loading && <CircularProgress />}
        </div>
        <Grid container spacing={2}>
        {state?.map((obj: PropsFC, i: number) => (
          <Grid item xs={12} sm={6}  md={12}  key={i} style={{ marginBottom: "20px" }}>
            <PathDetailsCard data={obj} path={base} />
          </Grid>
        ))}
        <Grid item xs={12} md={4}>
          <Pagination count={10} color="primary" onChange={handleChange} />
        </Grid>
          </Grid>
      </Container>
    </div>
  );
};

export default PathsDetailsComponent;
