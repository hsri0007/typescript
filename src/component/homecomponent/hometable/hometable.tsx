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
import { CircularProgress } from "@mui/material";

const BasicTable = () => {
  let history = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          component="table"
        >
          <TableHead component="thead">
            <TableRow component="tr">
              <TableCell component="th">Paths</TableCell>
              <TableCell component="th" align="right">
                Number Of Options
              </TableCell>
              <TableCell component="th" align="right">
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody component="tbody">
            {rows.length > 0 ? (
              rows?.map((row: any) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  component={"tr"}
                >
                  <TableCell component="td" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="td" align="right">
                    {row.presentationCount}
                  </TableCell>
                  <TableCell
                    component="td"
                    align="right"
                    style={{ color: "orange", cursor: "pointer" }}
                    onClick={() => history(`/path-details/${row.id}`)}
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
