import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { getAllPaths } from "../../../apiCalls";
import { CircularProgress, useMediaQuery } from "@mui/material";


interface RowTypes{
  id: Number
name:String
presentationCount: Number
}

const BasicTable:React.FC = () => {
  let history = useNavigate();
  const [rows, setRows] = React.useState<RowTypes[]>([]);
  const [loading, setLoading] = React.useState(false);
  const matches = useMediaQuery('(max-width:600px)');
  React.useEffect(() => {
    setLoading(true);

    const LoadPaths = async () => {
      try {
        const data = await getAllPaths();
      
        if (data?.length > 0) {
          setRows(data);
        }
        setLoading(false);
      } catch (error) {
        setRows([]);
        setLoading(false);
      }
    };
    LoadPaths();
  }, []);

  if (!rows) {
    return <div />;
  }

  return (
    <>
      <div style={{ display: "grid", placeItems: "center" }}>
        {loading && <CircularProgress />}
      </div>
      <TableContainer component={Paper}>
        <Table
   
          aria-label="simple table"
          component="table"
        >
          <TableHead component="thead">
            <TableRow component="tr">
              <TableCell component="th">Paths</TableCell>
              <TableCell component="th" align="right">
          {matches? "Number_Of_Options" : "Number Of Options"}
              </TableCell>
              <TableCell component="th" align="right">
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody component="tbody">
            {typeof rows === "object" ? (
              rows?.map(({id,name,presentationCount},i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  component={"tr"}
                >
                  <TableCell component="td" scope="row">
                    {name}
                  </TableCell>
                  <TableCell component="td" align="right">
                    {presentationCount}
                  </TableCell>
                  <TableCell
                    component="td"
                    align="right"
                    style={{ color: "orange", cursor: "pointer" }}
                    onClick={() => history(`/path-details/${id}`)}
                  >
                    View More
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BasicTable;
