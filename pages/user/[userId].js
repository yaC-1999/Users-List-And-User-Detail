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
import Link from "next/link";
import ErrorPage from "next/error";
import Image from "next/image";
import { formatPhoneNumberIntl } from "react-phone-number-input";

function DetailPage({ data }) {
  const router = useRouter();
  const [userId, setUserId] = useState(router.query.userId);
  const [user, setUser] = useState("");
  const [refresh, setRefresh] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, [refresh]);

  const getUser = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${router.query.userId}`)
      .then((res) => {
        setUser(res.data);
        if (refresh < 2) {
          setRefresh(refresh + 1);
        }
      })
      .catch((err) => {
        getUser();
        console.log(err);
      });
  };

  function formatPhoneNumber(phoneNumberString) {
    const formatedNumber = formatPhoneNumberIntl(
      "+" + ("" + phoneNumberString.split("x")[0]).replace(/\D/g, "")
    );
    return formatedNumber;
  }

  function mailTo(mail) {
    window.location.href = `mailto:${mail}`;
  }

  if (!data) {
    return <ErrorPage statusCode={404} />;
  } else {
    return (
      <Grid container>
        {user && (
          <Grid xs={12}>
            <Image
              src="https://wallpaperaccess.com/full/523868.gif"
              alt="/"
              style={{ maxHeight: "50vh" }}
              fill
              objectFit="cover"
            />
            {/* <Card sx={{ boxShadow: "0", borderRadius: "0" }}>
              <CardMedia
                sx={{ minHeight: "50vh", borderRadius: "0" }}
                image="https://wallpaperaccess.com/full/523868.gif"
                title="wallpaper"
              />
            </Card> */}
            <Grid
              xs={12}
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
              mt={"50vh"}
            >
              <Grid xs={2}>
                <Avatar
                  sx={{
                    marginTop: "-100px",
                    width: 210,
                    height: 210,
                    boxShadow: "20",
                  }}
                  alt={data.name}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vmeox-3VebUYpLxGJL6VGwPjw5_QUcb4NQ&usqp=CAU"
                />
              </Grid>
              <Grid xs={7} p={2}>
                <Typography variant="h4" fontWeight="bold">
                  {data.name}
                </Typography>
                <Typography variant="subtitle1">
                  {data.company.catchPhrase + " at " + data.company.name + "."}
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
                      {data.address.street + ", " + data.address.city}
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
                pt={3}
                pb={2}
                sx={{ backgroundColor: "gainsboro" }}
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
                    {/* {phoneNumberFormatter('18008675309').format({type: 'international', separator: '.'})} */}
                    {formatPhoneNumber(data.phone)}
                  </Typography>
                </Grid>
                <Grid xs={9} display="flex" flexWrap="wrap" alignItems="center">
                  <EmailIcon
                    color="action"
                    sx={{ fontSize: 16, marginRight: "5px" }}
                  />
                  <Typography variant="subtitle2" color="gray">
                    <Link href={`mailto:${data.email}`}>{data.email}</Link>
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

export async function getServerSideProps(context) {
  try {
    const id = await context.query.userId;

    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = await res.data;
    return { props: { data } };
  } catch (res) {
    return { props: {} };
  }
}

export default DetailPage;
