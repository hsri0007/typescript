import { CircularProgress, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PathDetailsCard from "./pathsdetailscard";
import { getPathsByPresentationId } from "../../apiCalls";

const PathsDetailsComponent: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const base =
    "https://headversity-staging.s3.ca-central-1.amazonaws.com/admin/";
  const [state, setState] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    getPathsByPresentationId(params?.id)
      .then((res) => {
        setState(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params]);

  return (
    <div style={{ marginTop: "20px" }}>
      <Container>
        <div style={{ display: "grid", placeItems: "center" }}>
          {loading && <CircularProgress />}
        </div>
        {state?.map((obj: any, i: any) => (
          <div key={i} style={{ marginBottom: "20px" }}>
            <PathDetailsCard data={obj} path={base} />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default PathsDetailsComponent;
