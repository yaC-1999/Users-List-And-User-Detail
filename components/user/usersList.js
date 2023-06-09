import { useEffect, useState } from "react";
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
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        getUsers();
        console.log(err);
      });
  };

  function formatPhoneNumber(phoneNumberString) {
    const formatedNumber =
      "+" +
      (
        "" +
        (phoneNumberString.search("x")
          ? phoneNumberString.split("x")[0]
          : phoneNumberString)
      ).replace(/\D/g, "");

    return formatedNumber;
  }

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
                <TableRow style={{ display: "table", width: "100%" }}>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <Link
                      href={{
                        pathname: "/user/" + user.id,
                      }}
                      style={{ display: "contents" }}
                      target="_blank"
                    >
                      <a>
                        <Grid
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <TableCell width="100%" align="left">
                            {user.name}
                          </TableCell>
                          <TableCell width="100%" align="left">
                            {user.username}
                          </TableCell>
                          <TableCell width="100%" align="left">
                            {formatPhoneNumber(user.phone)}
                          </TableCell>
                        </Grid>
                      </a>
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
