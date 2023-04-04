import {useEffect, useState } from "react";
import {
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

function UsersList() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        getUsers();
        console.log(err);
      });
  };

  if (loading) {
    return (
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress color="inherit" />
      </Grid>
    );
  } else {
    return (
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexWrap="wrap"
      >
        <Grid xs={9}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // onClick={() => showDetailsHandler(row.id)}
                  >
                    <Link
                      href={{
                        pathname: "/user/" + encodeURIComponent(user.id),
                        // slashes: { i: JSON.stringify(user) },
                      }}
                      // href={"/user/" + encodeURIComponent(row.id)}
                      style={{ display: "contents" }}
                      target="_blank"
                    >
                      <TableCell align="left">{user.name}</TableCell>
                      <TableCell align="left">{user.username}</TableCell>
                      <TableCell align="left">{user.phone}</TableCell>
                    </Link>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
}

export default UsersList;
