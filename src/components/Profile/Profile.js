import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Grid from "@mui/material/Grid";
import "./Profile.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import Chart from "react-apexcharts";
import Modal from "@mui/material/Modal";


const style = {
  position: "absolute",
  top: "50%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "15px",
  border: "none !important",
  transition: " all .4s",
};

const Profile = () => {
  
  const [name, setName] = useState("");
  const [validate, setValidate] = useState("");
  const [badgetext, setBadgetext] = useState("My Badges!");
  const [badgedescription, setBadgedescription] = useState(
    " Check out your badge collection here."
  );
  const [open, setOpen] = React.useState(false);
  const [profileData, setProfileData] = useState({});
  const [topDB1, setTopDB1] = useState({});
  const [topDB, setTopDB] = useState([]);
  const [topDB2, setTopDB2] = useState({});
  const [loading, setLoading] = React.useState(false);
  const [apiHits, setApiHits] = useState({});
  const [badges , setBadges] = useState({})
  const [totalDB , setTotalDB] = useState (0)

  const [donut, setDonut] = useState({
    series: [1, 1, 1, 1, 1],
    options: {
      colors: ["#58ac7b", "#FFB52E","6e6e6e", "#37BEC1", "#c07b71"],
      chart: {
        type: "pie",
      },
      labels: ["GET","POST","GET BY ID", "PUT", "DELETE"],
      dataLabels:{textAnchor: 'middle',},
      legend:{show:false}
    },
  });
  const [state, setState1] = useState({
    options: {
      chart: {
        id: "basic-bar",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#37BEC1"],
      style: {
        fontSize: "14px",
        fontFamily: "League Spartan",
        fontWeight: "bold",
        colors: undefined,
      },
      dataLabels: {
        enabled: 0,
      },
      yaxis: {
        tickAmount: 5,
        min:0
      },
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    },
    series: [
      {
        name: "APIs hit",
        data: [0,0,0,0,0,0,0],
      },
    ],
  });
  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(
            "https://quikapis-backend.onrender.com/profilePage/getInfo",
            {
              headers: {
                authentication: token,
              },
            }
          );
          setProfileData(response.data);
          setName(response.data.userData.username);
          setTopDB1(response.data.top2QuikDbs[0]);
          setTopDB(response.data.top2QuikDbs);
          setTopDB2(response.data.top2QuikDbs[1]);
          setApiHits(response.data.apiHits)
          console.log(response.data.apiHits.totalDBCount)
          setTotalDB(response.data.apiHits.totalDBCount)
          // console.log(response.data.apiHits)
          // console.log(topDB1);
          let series = [response.data.apiHits.Get,response.data.apiHits.Post,response.data.apiHits.GetById,response.data.apiHits.UpdateById,response.data.apiHits.DeleteById]
           // const series=[0,0,0,0,0]
          let series1 = [
            {
              name: "APIs hit",
              data: [response.data.apiHits.Mon,response.data.apiHits.Tues,response.data.apiHits.Wed,response.data.apiHits.Thu,response.data.apiHits.Fri,response.data.apiHits.Sat,response.data.apiHits.Sun],
            },
          ]
           setDonut({
             ...donut,
             series
           })
           setState1({
            ...state,
            series:series1
           })
           setBadges(response.data.badges)
          setLoading(false);
        } catch (err) {
          setValidate("unknown");
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 1500);
        }
      };

      fetchData();
    } catch (err) {}
  }, []);

  // console.log(profileData.userData.username)

  return (
    <>
      <div>
        <Navbar />
        {loading ? (
          <>
            <div
              className="loading" id="loading_view"
              style={{ marginTop: "30vh"}}
            >
              <svg width="64px" height="48px">
                <polyline
                  points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                  id="back"
                ></polyline>
                <polyline
                  points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
                  id="front"
                ></polyline>
              </svg>
            </div>
            <p style={{ marginLeft: "10vw" }}>loading...</p>
          </>
        ) : (
          <>
            <Typography
              variant="body1"
              color="initial"
              align="left"
              className="profile_head"
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                paddingLeft: "20vw",
                paddingBottom: "2vh",
                marginTop: "-5vh !important",
              }}
            >
              {name}'s <span style={{ color: "#37BEC1" }}> Profile</span>
            </Typography>
            <Grid container className="grid-profile">
              <Grid item xs={6} md={2.5} lg={2.5}>
                <Box className="quickdb-grid">
                  <Typography
                    className="db-dash"
                    align="left"
                    sx={{ backgroundColor: "#ADD8E6" }}
                  >
                    <i
                      className="fa-solid fa-database"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <Typography
                      sx={{
                        marginTop: "3vh",
                        fontSize: "1.7rem",
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      {totalDB}
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: "1vh",
                        fontSize: "1rem",
                        width: "20vw",
                        fontFamily: "League Spartan",
                      }}
                    >
                      Databases created.
                    </Typography>
                  </Typography>
                  <br />
                </Box>
              </Grid>
              <Grid item xs={6} md={2.5} lg={2.5}>
                <Box className="quickdb-grid-2">
                  <Typography
                    className="api-dash"
                    align="left"
                    sx={{ backgroundColor: "#DCC5F0" }}
                  >
                    <i
                      className="fa-solid fa-globe"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <Typography
                      sx={{
                        marginTop: "3vh",
                        fontSize: "1.7rem",
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      {profileData.totalApiHitCount}
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: "1vh",
                        fontSize: "1rem",
                        width: "20vw",
                        fontFamily: "League Spartan",
                      }}
                    >
                      API Hits.
                    </Typography>
                  </Typography>
                  <br />
                </Box>
              </Grid>
              <Grid item xs={12} md={7} lg={7}>
                <Box className="firstgrid">
                  <Grid container>
                    {badges.badge1===false ? (
                      <Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("My first quikDB!");
                          setBadgedescription(
                            `Awarded to users for sucessfully creating their first database! One quikDB away from this badge.`
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background: "gray"
                        }}
                      >
                        <i
                          className="fa-solid fa-ranking-star"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>
                    ):(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("My first quikDB!");
                          setBadgedescription(
                            "Awarded to users for sucessfully creating their first database!"
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background:
                            "radial-gradient(circle, rgba(238,252,247,1) 49%, rgba(255,254,140,1) 74%, rgba(253,244,248,1) 76%, rgba(255,255,255,1) 91%)",
                        }}
                      >
                        <i
                          className="fa-solid fa-ranking-star"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>)}
                    
                    {badges.badge2===false?(
                      <Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("API Pioneer");
                          setBadgedescription(
                            `Given to User's with 25 API hits! ${25 - profileData.totalApiHitCount} API hits away from this badge.`
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background: "gray"
                        }}
                      >
                        <i
                          className="fa-solid fa-arrow-trend-up"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>
                    ):(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("API Pioneer");
                          setBadgedescription(
                            "Given to User's with 25 API hits!"
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background:
                            "radial-gradient(circle, rgba(238,252,247,1) 49%, rgba(63,171,191,1) 74%, rgba(253,244,248,1) 76%, rgba(255,255,255,1) 91%)",
                        }}
                      >
                        <i
                          className="fa-solid fa-arrow-trend-up"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>)}
                    {badges.badge3===false?(
                      <Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("quikDB Novice");
                          setBadgedescription(
                            `Awarded to users for creating their first 5 databases!! ${5 - totalDB} quikDBs away from this badge.`
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background: "gray"
                        }}
                      >
                        <i
                          className="fa-solid fa-dice-five"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>
                    ):(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("quikDB Novice");
                          setBadgedescription(
                            "Awarded to users for creating their first 5 databases!!"
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background:
                            "radial-gradient(circle, rgba(238,252,247,1) 49%, rgba(218,145,177,1) 74%, rgba(253,244,248,1) 76%, rgba(255,255,255,1) 91%)",
                        }}
                      >
                        <i
                          className="fa-solid fa-dice-five"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>)}
                    {badges.badge4===false?(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("quikDB Maestro");
                          setBadgedescription(
                            `Awarded to users for creating their first 10 databases!! Create ${10 - totalDB} more quikDBs for this badge.`
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background: "gray"                        }}
                      >
                        <i
                          className="fa-solid fa-trophy"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>):(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("quikDB Maestro");
                          setBadgedescription(
                            "Awarded to users for creating their first 10 databases!!"
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background:
                            "radial-gradient(circle, rgba(238,252,247,1) 49%, rgba(215,50,236,1) 74%, rgba(253,244,248,1) 76%, rgba(255,255,255,1) 91%)",
                        }}
                      >
                        <i
                          className="fa-solid fa-trophy"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>)}

                    {badges.badge5===false?(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("quikAPI Master");
                          setBadgedescription(
                            `Awarded to users for reaching a century of API hits!! ${100 - profileData.totalApiHitCount} API hits away from this badge.`
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background: "gray"                        }}
                      >
                        <i
                          className="fa-solid fa-crown"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>):(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("quikAPI Master");
                          setBadgedescription(
                            "Awarded to users for reaching a century of API hits!!"
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background:
                            "radial-gradient(circle, rgba(238,252,247,1) 49%, rgba(236,134,50,1) 74%, rgba(253,244,248,1) 76%, rgba(255,255,255,1) 91%)",
                        }}
                      >
                        <i
                          className="fa-solid fa-crown"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>)}
                    {badges.badge6===false?(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("quikDB Wizard");
                          setBadgedescription(
                            `Awarded to users for creating 10 documents using the website!! Add ${10 - profileData.apiHits.totalGuiCount} more documents using website for this badge`
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background: "gray"                        }}
                      >
                        <i
                          className="fa-solid fa-wand-magic-sparkles"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>):(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("quikDB Wizard");
                          setBadgedescription(
                            "Awarded to users for creating 10 documents using the website!!"
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background:
                            "radial-gradient(circle, rgba(238,252,247,1) 49%, rgba(101,204,140,1) 74%, rgba(253,244,248,1) 76%, rgba(255,255,255,1) 91%)",
                        }}
                      >
                        <i
                          className="fa-solid fa-wand-magic-sparkles"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>)}
                    {badges.badge7===false?(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("Streak");
                          setBadgedescription(
                            `Awarded to users for 10 day streak of quikApi hits! Current Streak: ${profileData.apiHits.streakCount} Days`
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background: "gray"                        }}
                      >
                        <i
                          className="fa-regular fa-calendar-check"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>):(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("Streak");
                          setBadgedescription(
                            "Awarded to users for creating 10 documents using the website!!"
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{
                          background:
                            "radial-gradient(circle, rgba(238,252,247,1) 49%, rgba(31,90,247,1) 74%, rgba(253,244,248,1) 76%, rgba(255,255,255,1) 91%)",
                        }}
                      >
                        <i
                          className="fa-regular fa-calendar-check"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>)}
                    {badges.badge8===false?(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("quik Milestone");
                          setBadgedescription(
                            `Awarded to users for having 500 API hits!! ${500 - profileData.totalApiHitCount} API hits away from this badge.`
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{ background: "gray"}}
                      >
                        <i
                          className="fas fa-paper-plane"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                            
                          }}
                        ></i>
                      </Typography>
                    </Grid>):(<Grid item xs={1.5} lg={1.5} md={1.5}>
                      <Typography
                        className="circlee-badge"
                        onMouseEnter={() => {
                          setBadgetext("quik Milestone");
                          setBadgedescription(
                            "Awarded to users for having 500 API hits!!"
                          );
                        }}
                        onMouseLeave={() => {
                          setBadgetext("My Badges!");
                          setBadgedescription(
                            " Check out your badge collection here. "
                          );
                        }}
                        sx={{ background: "radial-gradient(circle, rgba(238,252,247,1) 49%, rgba(105,247,31,1) 74%, rgba(253,244,248,1) 76%, rgba(255,255,255,1) 91%)"}}
                      >
                        <i
                          className="fas fa-paper-plane"
                          id="star"
                          style={{
                            fontSize: "24px",
                            marginTop: "2.3vh",
                            color: "#594a48",
                            color: "#594a48",
                          }}
                        ></i>
                      </Typography>
                    </Grid>)}
                  </Grid>
                  <Typography
                    className="badge-typo"
                    sx={{ fontSize: "1.3rem", fontWeight: "bold" }}
                  >
                    {badgetext}
                  </Typography>
                  <Typography className="badge-desc" sx={{ fontSize: "1rem" }}>
                    {badgedescription}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography
              variant="body1"
              color="initial"
              align="left"
              className="profile_head"
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                paddingLeft: "20vw",
                paddingTop: "3vh",
              }}
            >
              {" "}
              Top<span style={{ color: "#37BEC1" }}> quikDBs</span>
            </Typography>
            <Grid container sx={{ marginTop: "1vh" }}>
              {profileData.quikDbCount === 0 ? (
                <>
                  <Typography
                    className="display-head1"
                    sx={{
                      marginTop: "3vh",
                      marginBottom: "4vh",
                      color: "black",
                      marginLeft: "50vw",
                      fontFamily: "League Spartan",
                    }}
                  >
                    No collections to Display :(
                  </Typography>
                </>
              ) : (
                <>
                  <Grid item xs={12} lg={4.4} md={4.3} className="top-db">
                    <Typography
                      variant="body1"
                      color="initial"
                      align="left"
                      sx={{
                        paddingLeft: "1vw",
                        fontWeight: "bold",
                        fontFamily: "League Spartan",
                      }}
                    >
                      <i
                        className="fas fa-paper-plane"
                        style={{
                          color: "orange",
                          fontSize: "0.9rem",
                          marginRight: "1vw",
                        }}
                      ></i>
                      {topDB1.modelName}
                      <i
                        className="fa-solid fa-trophy"
                        style={{
                          fontSize: "12px",
                          color: "#E9CA16",
                          marginLeft: "0.4vw",
                        }}
                      ></i>
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      align="left"
                      sx={{
                        paddingLeft: "2.8vw",
                        color: "gray",
                        fontFamily: "League Spartan",
                      }}
                    >
                      {topDB1.modelDescription}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      align="left"
                      sx={{
                        paddingLeft: "2.8vw",
                        color: "#088F8F",
                        fontSize: "0.9rem",
                        paddingTop: "1vh",
                        fontFamily: "League Spartan",
                      }}
                    >
                      No of Entries: {topDB1.count}
                    </Typography>
                  </Grid>

                  {topDB.length > 1 && (
                    <>
                      <Grid item xs={12} lg={4.4} md={4.3} className="top-db-1">
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                          sx={{
                            paddingLeft: "1vw",
                            fontWeight: "bold",
                            fontFamily: "League Spartan",
                          }}
                        >
                          <i
                            className="fas fa-paper-plane"
                            style={{
                              color: "orange",
                              fontSize: "0.9rem",
                              marginRight: "1vw",
                            }}
                          ></i>
                          {topDB2.modelName}
                          <i
                            className="fa-solid fa-trophy"
                            style={{
                              fontSize: "12px",
                              color: "silver",
                              marginLeft: "0.4vw",
                            }}
                          ></i>
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                          sx={{
                            paddingLeft: "2.8vw",
                            color: "gray",
                            fontFamily: "League Spartan",
                          }}
                        >
                          {topDB2.modelDescription}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                          sx={{
                            paddingLeft: "2.8vw",
                            color: "#088F8F",
                            fontSize: "0.9rem",
                            paddingTop: "1vh",
                            fontFamily: "League Spartan",
                          }}
                        >
                          No of Entries: {topDB2.count}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </>
              )}
            </Grid>
            <Grid container>
              <Grid item xs={12} lg={4.4} md={4.4} sx={{ marginTop: "5vh" }}>
                <Chart
                  className="chart-profile"
                  options={state.options}
                  series={state.series}
                  type="area"
                  height="250"
                />
              </Grid>
              {profileData.totalApiHitCount===0?(
                <>
                <Box className="quickdb-grid-3">
                  <Typography
                  sx={{
                    marginTop: "3vh",
                    fontSize: "2.5rem",
                    color: "navy"
                  }}>
                      <i class="fa-solid fa-magnifying-glass-chart"></i>
                  </Typography>
                  <Typography
                    className="display-head1"
                    id="no-api-hit"
                    sx={{
                      marginTop: "3vh",
                      marginBottom: "4vh",
                      color: "black",
                      // marginLeft: "30vw",
                      fontFamily: "League Spartan",
                    }}
                  >
                  Begin using QuickAPIs to analyze its request count.
                  </Typography>
                </Box>
              </>
              ):(
                <> 
              <Grid item xs={12} md={4.4} lg={4.4}>
                <Chart
                  className="chart-profile-1"
                  options={donut.options}
                  series={donut.series}
                  type="pie"
                  height="250"
                />
              </Grid>
              </>)}
            </Grid>
          </>
        )}
        {validate === "unknown" && (
          <Modal
            open={open}
            sx={{ border: "none !important" }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h3"
                sx={{ margin: "1vh", fontSize: "1.1rem" }}
              >
                <i
                  className="fa-regular fa-circle-xmark"
                  style={{ color: "#37bec1", marginRight: "1vw" }}
                ></i>
                Oops! An Error Occurred
                <span style={{ marginRight: "1vw !important" }}></span>
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Profile;
