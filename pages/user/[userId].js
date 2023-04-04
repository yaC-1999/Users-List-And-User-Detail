import {
  Avatar,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

function DetailPage(params) {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [refresh, setRefresh] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, [refresh]);

  const getUser = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const test = res.data.find(
          (u) => u.id === parseInt(router.query.userId)
        );
        setUser(test);
        console.log(user);
        if (refresh < 2) {
          setRefresh(refresh + 1);
        }
        setLoading(refresh == 2 ? false : true);
      })
      .catch((err) => {
        getUser();
        console.log(err);
      });
  };

  function formatPhoneNumber(phoneNumberString) {
    return "+" + ("" + phoneNumberString).replace(/\D/g, "");
  }

  function mailTo(mail) {
    window.location.href = `mailto:${mail}`;
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
      <Grid container>
        {user && (
          <Grid xs={12}>
            <Card sx={{ boxShadow: "0", borderRadius: "0" }}>
              <CardMedia
                sx={{ minHeight: "50vh", borderRadius: "0" }}
                image="https://wallpaperaccess.com/full/523868.gif"
                title="green iguana"
              />
            </Card>
            <Grid
              xs={12}
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Grid xs={2}>
                <Avatar
                  sx={{
                    marginTop: "-100px",
                    width: 210,
                    height: 210,
                    boxShadow: "20",
                  }}
                  alt={user?.name}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vmeox-3VebUYpLxGJL6VGwPjw5_QUcb4NQ&usqp=CAU"
                />
              </Grid>
              <Grid xs={7} p={2}>
                <Typography variant="h4" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="subtitle1">
                  {user.company.catchPhrase + " at " + user.company.name + "."}
                </Typography>
                <Grid
                  xs={10}
                  pt={1}
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="space-between"
                >
                  <Grid
                    display="flex"
                    p={1}
                    pl={0}
                    flexWrap="wrap"
                    alignItems="center"
                  >
                    <LocationOnIcon color="action" sx={{ fontSize: 16 }} />
                    <Typography variant="subtitle2" color="gray">
                      {user.address.street + ", " + user.address.city}
                    </Typography>
                  </Grid>
                  <Grid display="flex" flexWrap="wrap" alignItems="center">
                    <FacebookIcon color="action" sx={{ fontSize: 16 }} />
                    <Typography variant="subtitle2" color="gray">
                      FacebookUser
                    </Typography>
                  </Grid>
                  <Grid display="flex" flexWrap="wrap" alignItems="center">
                    <LinkedInIcon color="action" sx={{ fontSize: 16 }} />
                    <Typography variant="subtitle2" color="gray">
                      LinkedInUser
                    </Typography>
                  </Grid>
                  <Grid display="flex" flexWrap="wrap" alignItems="center">
                    <TwitterIcon color="action" sx={{ fontSize: 16 }} />
                    <Typography variant="subtitle2" color="gray">
                      TwitterUser
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                xs={12}
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                p={1}
                pt={2}
                pb={2}
                sx={{ backgroundColor: "lightgray" }}
              >
                <Grid
                  xs={9}
                  pb={1}
                  display="flex"
                  flexWrap="wrap"
                  alignItems="center"
                >
                  <LocalPhoneIcon
                    color="action"
                    sx={{ fontSize: 16, marginRight: "5px" }}
                  />
                  <Typography variant="subtitle2" color="gray">
                    {formatPhoneNumber(user.phone)}
                  </Typography>
                </Grid>
                <Grid xs={9} display="flex" flexWrap="wrap" alignItems="center">
                  <EmailIcon
                    color="action"
                    sx={{ fontSize: 16, marginRight: "5px" }}
                  />
                  <Typography variant="subtitle2" color="gray">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}
export default DetailPage;
