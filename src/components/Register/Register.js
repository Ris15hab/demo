import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Typography from "@mui/material/Typography";
import {useState, useRef, useEffect } from 'react'
import Email from './email.png'
import OtpInput from 'react-otp-input';
import Modal from "@mui/material/Modal";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";




function Register() {
  const navigate = useNavigate()
  const Ref = useRef(null);
  const [email, setEmail] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [name, setName] = useState('')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [password, setPassword] = useState('')
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius:"15px",
    //border:"none !important",
    transition:" all .4s"
  };
  const [open, setOpen] = React.useState(false);
  const [validate,setValidate]=useState('')

  const handleOpen = async (e) => {
    if(name.length===0){
      setValidate('name')
    }
    else if(!emailRegex.test(email)){
      // console.log("correct email")
      setValidate('email')
    }
    else if(password.length===0){
      setValidate('password')
    }

    else{
      try{
        const response = await axios.post("https://quikapis-backend.onrender.com/user/register", {
          username:name,
          email,
          password,
        });
        if(response.status===201){
          localStorage.setItem("token",response.data.id)
          setValidate('otp_sent')
          setSucc(false)
          setUserEmail(email)
        }else{
          setValidate('unknown')
          setTimeout(() => {
            navigate('/')
          }, 1500);
        }
      }catch(err){
        setValidate('incorrect_email')
      }
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setEmail('');
      setName('');
      setPassword('');
    }, 1000);
  };

  const [timer, setTimer] = useState('00:00');
  const [show, setShow] = useState(false)
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
        total,minutes, seconds
    };
}
    const startTimer = (e) => {
      let { total,minutes, seconds }
                  = getTimeRemaining(e);
      if (total >= 0) {
          setTimer(
              (minutes > 9 ? minutes : '0' + minutes) + ':'
              + (seconds > 9 ? seconds : '0' + seconds)
          )
      }
    }
    const clearTimer = (e) => {
    
      setTimer('00:59');

      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
      }, 1000)
      Ref.current = id;
    }
    const getDeadTime = () => {
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 60);
      return deadline;
    }

    const onClickReset = async() => {
      try{
        clearTimer(getDeadTime());
        const token = localStorage.getItem('token');
        const response = await axios.post("https://quikapis-backend.onrender.com/user/resendOtp", {
        _id:token
      });
      if(response.status===200){
        localStorage.setItem("token",response.data._id)
        setValidate('otp_sent')
      }else{
        setValidate('unknown')
        setTimeout(() => {
          navigate('/')
        }, 1500);
      }
      }catch(err){
        setValidate('unknown')
        setTimeout(() => {
          navigate('/')
        }, 1500);
      }

      setOpen(true);
      setTimeout(() => {
      setOpen(false);
      setOtp('')
    }, 1000);
  }

    useEffect(() => {
      clearTimer(getDeadTime());

    }, []);



  const [styles, setStyles] = useState("data_signup")
  const [otp, setOtp] = useState('');
  const [succ,setSucc]=useState(true)
    const handleShow=(e)=>{
      setShow(!show)
  }
  const handleSubmit = async(e)=>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.post("https://quikapis-backend.onrender.com/user/verifyOtp", {
        otpnumber:otp,
        userID:token
      });
      if(response.status===200){
        localStorage.setItem("token",response.data.token)
        setValidate('correct');
        setTimeout(() => {
          navigate('/howtouse')
        }, 1500);
      }else{
        setValidate('unknown')
        setTimeout(() => {
          navigate('/')
        }, 1500);
      }
    }catch(err){
      setValidate('incorrect_otp')
      // setValidate('unknown')
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setOtp('')
    }, 1000);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        color: "white",
        backgroundColor: "#e8e8e8",
      }}
    >
      <Typography className="logo_register" variant="body1" color="initial" align="left" sx={{paddingTop:"1vh",fontSize:"2.0rem",paddingLeft:"1vw",fontWeight:"bold"}}>
      <i className="fas fa-paper-plane" style={{color:"orange",fontSize:"1.5rem",marginRight:"0.5vw"}}></i>
        quik<span style={{color:"#37BEC1"}}>APIs</span>
      </Typography>
      <Box
        className="outer_box"
        sx={{
          width: "80vw",
          height: "80vh",
          marginLeft: "10vw",
          marginTop: "4vh",
        }}
      >
        <Grid container>
          <Grid
            item
            className="image_signup"
            sx={{ height: "80vh",backgroundImage:" linear-gradient(144deg,#b478de, #4cb5b5 50%,#dde4e5)" }}
            md={5}
            lg={5}
          >
           
          </Grid>
          <Grid
            item
            sx={{ backgroundColor: "#e0e0e0", height: "80vh"}}
            xs={12}
            md={7}
            lg={7}
          >
            <Grid
              className={styles}
              sx={{ height: "60vh",margin: "10vh" }}
            >
            {succ?(
              <>
              <Typography
                // variant="body1"
                align="left"
                className="heading_signup"
                variant="h4"
                sx={{ fontWeight: "bold", fontFamily: "sans-serif",color:"black" }}
              >
                Sign Up<span style={{ color: "#37BEC1" }}></span>{" "}
              </Typography>
              <Typography
                variant="body1"
                align="left"
                className="heading_signup"
                sx={{ fontFamily: "sans-serif", marginTop: "1vh" , color: "gray" }}
                // sx={{ color: "gray" }}
              >
                Already have an account?{" "}
                <span style={{ color: "#37BEC1" }}><Link to='/' style={{textDecoration:"none",color:"#37BEC1"}}>Login</Link></span>{" "}
              </Typography>
              
              <input type="text" value={name} onChange={e=>setName(e.target.value)} name="text" className="input_signup" placeholder="Name" autoComplete="off"/>
              <input type="text" value={email} onChange={e=>setEmail(e.target.value)} name="text" className="input_signup" placeholder="Email" autoComplete="off" required/>
              <input  value={password} onChange={e=>setPassword(e.target.value)} type={show?"text":"password"} name="password" autoComplete="off" className="input_signup" placeholder="Password" ></input>
              <Grid  >
              <Grid item className="checkbox-wrapper" md={3}>
              <label>   
                <input type="checkbox" onClick={handleShow} />
                <span className="checkbox"></span>
              </label>
              </Grid>
              <Grid item xs={9} md={9}>
               <Typography  sx={{paddingLeft:"0.7vw !important",marginTop:"1vh",color:"gray",fontSize:"13px"}} align="left" color="initial">Show Password</Typography>
              </Grid>
              </Grid> 
              <Grid sx={{marginTop:"3vh"}}>
              <button className="btn" style={{marginRight:"5vw"}} onClick={handleOpen}> Register
              </button>
              {validate==='email'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Enter correct email <span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            {validate==='name'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Enter name <span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            
            {validate==='password'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                 Enter password<span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }

            {validate==='incorrect_email'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                 Email already in use<span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }

            {validate==='unknown'&&<Modal
                    open={open}
                    sx={{border:"none !important"}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
                    <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                    Oops! An Error Occurred <span style={{marginRight:"1vw !important"}}></span>
                    </Typography>
                  </Box>
                </Modal>
            }

              </Grid> 
              </>
              ):(
                <>
                {validate==='otp_sent'&&<Modal
                    open={open}
                    sx={{border:"none !important"}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                    <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                    OTP sent <span style={{marginRight:"1vw !important"}}></span>
                    </Typography>
                  </Box>
                </Modal>
                }

                {validate==='unknown'&&<Modal
                    open={open}
                    sx={{border:"none !important"}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
                    <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                    Oops! An Error Occurred <span style={{marginRight:"1vw !important"}}></span>
                    </Typography>
                  </Box>
                </Modal>
                }

                {validate==='incorrect_otp'&&<Modal
                    open={open}
                    sx={{border:"none !important"}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                    <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                    Invalid OTP <span style={{marginRight:"1vw !important"}}></span>
                    </Typography>
                  </Box>
                </Modal>
                }


                {validate==='correct'&&<Modal
                    open={open}
                    sx={{border:"none !important"}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                    <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                    Successful Signup <span style={{marginRight:"1vw !important"}}></span>
                    </Typography>
                  </Box>
                </Modal>
                }
                <Typography sx={{color:"black",paddingTop:"2vh",fontSize:"1.1rem"}}>
                <img src={Email} className="otp_img" style={{height:"10vh",marginBottom:"3vh"}}alt="email img here.."/><br/>
                An email has been sent to <span style={{color:"#37A6A9",fontWeight:"bold"}}>{`${userEmail}`}</span>
                </Typography>
                <Typography style={{color:"black",marginTop:"4vh",fontWeight:"bold"}}>
                Enter Otp:
                <Grid sx={{marginTop:"5vh",align:"center",paddingLeft:"5.1vw"}} className="otp_mobile">
                <OtpInput
                  
                  inputStyle={{width:"37px",height:"7vh",backgroundColor:"#e6e6e6",borderColor:"#b3b3b3",borderRadius:"10%"}}
                  sx={{marginTop:"5vh"}}
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputMode="numeric"
                  renderSeparator={<span className="otp_gap" style={{margin:"1rem"}}> </span>}
                  renderInput={(props) => <input {...props} />}
                />
                </Grid>
                </Typography>
                <Typography sx={{color:"black",marginTop:"4vh"}}>Didn't receive otp? 
                 {timer==='00:00'?(
                  <span onClick={onClickReset} style={{color:"#37A6A9",marginLeft:"0.2vw",marginRight:"1vw",cursor:"pointer"}}>
                    <b>Resend</b> 
                  </span>
                 ):(
                  <span style={{color:"gray",marginLeft:"0.2vw",marginRight:"1vw",cursor:"pointer"}}>
                     Resend 
                  </span>
                 )
                } 
                {timer==='00:00'?(
                    <span style={{color:"gray",marginLeft:"0vw",marginRight:"1vw"}}>
                     {timer}
                  </span>
                 ):(
                  <span style={{color:"black",marginLeft:"0vw",marginRight:"1vw"}}>
                     {timer} 
                  </span>
                 )
                } 
                </Typography>
                <button className="btn" onClick ={handleSubmit} style={{marginRight:"0vw",marginTop:"4vh"}}> Submit
                </button>
                </>
              )
            }
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Register;
