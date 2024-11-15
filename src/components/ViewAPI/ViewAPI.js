import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./ViewAPI.css";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import nodata from "../../nodata.png";

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

const ViewAPI = () => {
 const navigate = useNavigate(); 
  const [validate, setValidate] = useState("");
  const [dbname, setDbname] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [datadb, setDatadb] = useState([]);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [dbdel,setDbdel]=useState(false)
  const [idDb,setIdDb] = useState('')
  const [refresh, setRefresh] = useState(false)

  const handleDeleteClose = () => setDbdel(false);

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleDbDelete = async (idDb) =>{
    try{
      setDbdel(false)
      setLoading(true)
      const token = localStorage.getItem('token')
      const result = await axios.delete("https://quikapis-backend.onrender.com/crud/deletecrud?_id="+idDb,{
          headers: {
            'authentication':token,
          }
      });
      if(result){
        setValidate('DbDeleted')
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 1500);
        setRefresh(!refresh)
      }
      setLoading(false)
    }catch(err){
      setValidate("unknown");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    }
  }

  const [countCollection, setCountCollection] = useState(2);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://quikapis-backend.onrender.com/userDB/getUserDB",
          {
            headers: {
              authentication: token,
            },
          }
        );
        setDatadb(response.data.response);
        setDbname(response.data.response.modelName)
        setCountCollection(response.data.countCollection);
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
  }, [refresh]);

  return (
    <>
      <Navbar />
      <div className="home-api">
        <Typography
          variant="body1"
          color="initial"
          className="create_head"
          sx={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "10vw" }}
        >
          My <span style={{ color: "#37BEC1" }}>quikDB</span>
        </Typography>

        {loading ? (
          <>
         <div className="loading" id="loading_view" style={{marginTop:"20vh"}}>
         <svg width="64px" height="48px">
             <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
           <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
         </svg>
        </div>
        <p style={{marginLeft:"10vw"}}>loading...</p>
        </>
        ) : (
          <>
            {countCollection === 0 ? (
              <>
                <img src={nodata} className="nodata1" alt="no data"></img>
                <Typography
                  className="note-head1"
                  variant="body1"
                  color="initial"
                  align="left"
                >
                  No Collections to display!{" "}
                  <span
                    style={{ color: "#37BEC1", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/createdb");
                    }}
                  >
                    Click Here{" "}
                  </span>
                  to create quikDB
                </Typography>
              </>
            ) : (
              datadb.map((data) => {
                return (
                  <Grid className="api-box" key={data._id}>
                    <Typography
                      className="db-elipsis"
                      align="right"
                      sx={{ marginRight: "1.3vw", marginTop: "1.3vh" }}
                    >
                        <i
                          className="fa-regular fa-trash-can"
                          style={{ cursor: "pointer", width: "5vw" }}
                          onClick={()=>{
                            setDbdel(true)
                            setDbname(data.modelName)
                            setIdDb(data._id)
                          }}
                        ></i>
                         
                         <Modal
                          open={dbdel}
                          onClose={handleDeleteClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily:"League Spartan"}}>
                              Are you sure you want to delete <span style={{color:"#088F8F",fontWeight:"bold"}}>{dbname}</span>?
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }} align="right">
                              <Button sx={{color:"red"}} onClick={()=>{handleDbDelete(idDb)}}>YES</Button> <Button sx={{color:"gray"}} onClick={handleDeleteClose}>CANCEL</Button>
                            </Typography>
                          </Box>
                        </Modal>
                    </Typography>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        lg={7}
                        md={7}
                        sx={{ marginTop: "-3vh" }}
                      >
                        <Typography
                          align="left"
                          className="typo-api"
                          sx={{
                            marginLeft: "3vw",
                            fontFamily: "League Spartan",
                            marginTop: "2vh",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
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
                          {data.modelName}
                        </Typography>
                      </Grid>
                      <Grid item xs={5} lg={5} md={5}>
                        <button
                          className="btn-api"
                          onClick={() => {
                            navigate(`/collection/${data._id}`);
                          }}
                        >
                          <i
                            className="fa-solid fa-database"
                            style={{ color: "#ffffff", marginRight: "2vw" }}
                          ></i>
                          Collections
                        </button>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: "-2vh" }}>
                      <Grid item xs={12} lg={7} md={7}>
                        <Typography
                          align="left"
                          className="typo-api"
                          sx={{
                            marginLeft: "5vw",
                            fontFamily: "League Spartan",
                            marginTop: "-2vh",
                            color: "gray",
                            fontSize: "1rem",
                          }}
                        >
                          {data.modelDescription}
                        </Typography>
                        <Typography
                          align="left"
                          className="typo-api"
                          sx={{
                            marginLeft: "5vw",
                            fontFamily: "League Spartan",
                            marginTop: "1vh",
                            paddingBottom: "1vh",
                            fontSize: "1rem",
                          }}
                        >
                          No of Entries : {data.count}
                        </Typography>
                        <Typography
                          align="left"
                          className="typo-api"
                          sx={{
                            marginLeft: "5vw",
                            fontFamily: "League Spartan",
                            paddingBottom: "3vh",
                            fontSize: "1rem",
                          }}
                        >
                          Created At: {data.dateTime}
                        </Typography>
                      </Grid>
                      <Grid item xs={5} lg={5} md={5}>
                        <button
                          className="btn-api-1"
                          onClick={() => {
                            navigate(`/api/${data._id}`);
                          }}
                        >
                          <i
                            className="fa-solid fa-magnifying-glass"
                            style={{ color: "#ffffff", marginRight: "1vw" }}
                          ></i>
                          APIs
                        </button>
                      </Grid>
                      <Grid container className="btn-gayab">
                        <Grid item xs={6}>
                          <button
                            className="btn-api-mobile"
                            onClick={() => {
                              navigate(`/collection/${data._id}`);
                            }}
                          >
                            <i
                              className="fa-solid fa-database"
                              style={{ color: "#ffffff", marginRight: "2vw" }}
                            ></i>
                            Collections
                          </button>
                        </Grid>
                        <Grid item xs={6}>
                          <button
                            className="btn-api-1-mobile"
                            onClick={() => {
                              navigate(`/api/${data._id}`);
                            }}
                          >
                            <i
                              className="fa-solid fa-magnifying-glass"
                              style={{
                                color: "#ffffff",
                                marginRight: "1vw",
                                textDecoration: "none !important",
                              }}
                            ></i>
                            APIs
                          </button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })
            )}
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
                Oops! An Error Occurred{" "}
                <span style={{ marginRight: "1vw !important" }}></span>
              </Typography>
            </Box>
          </Modal>
        )}

        {validate === "DbDeleted" && (
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
                  className="fa-regular fa-circle-check"
                  style={{ color: "#37bec1", marginRight: "1vw" }}
                ></i>
                QuikDB succesfully deleted{" "}
                <span style={{ marginRight: "1vw !important" }}></span>
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
};

export default ViewAPI;
