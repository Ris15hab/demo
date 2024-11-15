import React,{useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Typography from "@mui/material/Typography";
import OtpInput from 'react-otp-input';
import Modal from "@mui/material/Modal";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";





function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [password, setPassword] = useState('')
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    //border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius:"15px",
    border:"none !important",
    transition:" all .4s"
  };

  const [open, setOpen] = React.useState(false);
  const [forgot, setForgot] = React.useState("login");
  const [showOtp, setShowOtp] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState(false);
  const [validate,setValidate]=useState('')
  // const handleReset=()=>{
  //   setShowOtp(!showOtp)
  //   setForgot("reset")
  //   setReset(!reset)
  //   setResetEmail(!resetEmail)
  //   setNewEmail(!newEmail)
  // }
  const handleSubmit = async (e) => {
    if(!emailRegex.test(email)){
      console.log("correct email")
      setValidate('email')
    }
    else if(password.length===0){
      setValidate('password')
    }
    else{
      try{
        const response = await axios.post("https://quikapis-backend.onrender.com/user/login", {
          email,
          password,
        });
        if(response.status === 200){
          localStorage.setItem("token",response.data.token)
          setValidate('correct')
          setTimeout(() => {
            navigate('/profile')
          }, 1500);
        }else{
          setValidate('unknown')
          setTimeout(() => {
            navigate('/')
          }, 1500);
        }
      }catch(err){
        // console.log(err)
        setValidate('incorrect')
      }
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
        setEmail('');
        setPassword('');
    }, 1000);
  };



  
  const [show, setShow] = useState(false)
  const [styles, setStyles] = useState("data_signup")
  const [otp, setOtp] = useState('');
  const handleShow=(e)=>{
    setShow(!show)
  }
  // const handleSubmit=(e)=>{
    //   setSucc(false)
    // }
    
  //forgot password methods
  const handleEmailSubmit = async() =>{
    try{
      if(!emailRegex.test(email)){
        console.log('inin')
        setValidate('email')
      }else{
        const response = await axios.post("https://quikapis-backend.onrender.com/user/forgotPassword", {
          email
        });
        if(response.status===200){
          localStorage.setItem("token",response.data.token)
          setValidate('otpSent')
          setShowOtp(true)
        }else{
          setValidate('incorrect')
        }
      }
    }catch(err){
      setValidate('incorrect')
      setEmail('')
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }

  const handleOtpSubmit = async() =>{
    try{
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://quikapis-backend.onrender.com/user/forgotPasswordOtpVerify",{
          otpnumber:otp
        },
        {
          headers: {
            authentication: token,
          },
        }
      )
      if(response.status === 200){
        localStorage.setItem("token",response.data.token)
        setValidate('otpVerified')
        setEmail('');
        setOtp('');
        setShowOtp(!showOtp)
        setForgot("reset")
        setReset(!reset)
        setResetEmail(!resetEmail)
        setNewEmail(!newEmail)
      }
    }catch(err){
      if(err.response.status === 401){
        setValidate('incorrectOtp');
        setOtp('')
      }else{
        setValidate('unknown')
      }
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }

  const handleResetSubmit = async() =>{
    try{
      if(email === '' || password===''){
        setValidate('empty')
      }else{
        if(email===password){
          const token = localStorage.getItem("token");
          const response = await axios.put(
            "https://quikapis-backend.onrender.com/user/forgotPasswordChange",{
              password
            },
            {
              headers: {
                authentication: token,
              },
            }
          )
          if(response){
            setValidate('passwordReset');
            setTimeout(() => {
              setForgot('login')
            }, 1500);
          }
        }else{
          setValidate('NoMatch');
        }
      }
    }catch(err){
      setValidate('unknown');
      navigate('/');
    }
    setEmail('');
    setPassword('');
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
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
              {
                forgot==="reset"?(
                  <>
                    {
                      resetEmail&&
                      <>
                      <Typography
                      align="left"
                      className="heading_signup"
                      variant="h5"
                      sx={{ fontWeight: "bold", fontFamily: "sans-serif",color:"black"}}
                    >
                    Enter <span style={{ color: "#37BEC1",marginBottom:"3vh" }}>Email</span>
                    </Typography>
                  
                    <input value={email} placeholder="Your Email" onChange={(e)=>{setEmail(e.target.value)}} type="text" name="text" className="forgot-input"  autoComplete="off"/>
                    <Button variant="container" onClick={handleEmailSubmit} className="btn-forgot" style={{marginTop:"1.8vh",marginLeft:"-3vw",borderRadius:"2px 15px 15px 2px"}}>submit</Button>
                    </>
                    }
                {
                  showOtp&&<><Typography sx={{color:"black",paddingTop:"2vh",fontSize:"1.1rem",marginTop:"4vh"}}>
                  An OTP has been sent to <span style={{color:"#37A6A9"}}>{email}</span>
                  </Typography>
                  <Typography style={{color:"black",marginTop:"4vh",fontWeight:"bold",marginBottom:"4vh"}}>
                  <Grid sx={{marginTop:"7vh",align:"center",paddingLeft:"3.3vw"}} className="otp_mobile">
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
                  <button className="btn" onClick={handleOtpSubmit} style={{marginRight:"1vw",marginTop:"10vh"}} >Enter
                </button>
               
                </>
                }
                 {
                  newEmail?(
                  <>

                    <Typography
                      align="left"
                      className="heading_signup"
                      variant="h5"
                      sx={{ fontWeight: "bold", fontFamily: "sans-serif",color:"black"}}
                    >
                    Reset <span style={{ color: "#37BEC1",marginBottom:"3vh" }}> Password</span>
                    </Typography>

                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="password" name="text" className="input_signup_1" placeholder="Password" autoComplete="off" />

                    <input type={show?"text":"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" className="input_signup_2" placeholder="Confirm Password" autoComplete="off">
                    </input>
                    <button className="btn" onClick={handleResetSubmit} style={{marginRight:"6vw",marginTop:"10vh"}} >Reset
                </button>
                  
                  </>
                  ):(<></>)
                }

                

                </>
                ):(
                  <>
              <Typography
                // variant="body1"
                align="left"
                className="heading_signup"
                variant="h4"
                sx={{ fontWeight: "bold", fontFamily: "sans-serif",color:"black" }}
              >
                Login<span style={{ color: "#37BEC1" }}></span>{" "}
              </Typography>
              <Typography
                variant="body1"
                align="left"
                className="heading_signup"
                sx={{ fontFamily: "sans-serif", marginTop: "1vh",color: "gray" }}
                // sx={{ color: "gray" }}
              >
                Don't have an account?{" "}
                <span style={{ color: "#37BEC1" }}><Link to='/register' style={{textDecoration:"none",color:"#37BEC1"}}>Signup</Link></span>{" "}
              </Typography>
              
             
              <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" name="text" className="input_signup_1" placeholder="Email" autoComplete="off" />

              <input type={show?"text":"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" className="input_signup_2" placeholder="Password" autoComplete="off">
              </input>
              
              
              <Grid>
              <Grid item className="checkbox-wrapper">
             
              <label >  
                <input type="checkbox" onClick={handleShow} />
                <span className="checkbox"></span>
              </label>
              </Grid>
              <Grid item xs={9} md={9}>
               <Typography  sx={{paddingLeft:"0.7vw !important",marginTop:"1vh",color:"gray",fontSize:"13px"}} align="left" color="initial">Show Password</Typography>
              </Grid>
              </Grid> 
              <Grid sx={{marginTop:"3vh"}}>
             
              <button className="btn" onClick={handleSubmit} style={{marginRight:"5vw"}} >   Login
              </button>

              <p className="forgot-pass" onClick={()=>{setForgot("reset")
              setResetEmail(!resetEmail)
                }
            } style={{marginLeft:"15vw",marginTop:"-21.5vh",fontSize:"14px",color:"#37BEC1",cursor:"pointer"}}><u>Forgot password?</u></p> 

            
            {validate==='correct'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Successful Login! <span style={{marginRight:"1vw !important"}}></span>
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
              </Grid> 
              </>
                )
              }
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
            {validate==='unknown'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
                <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Oops! An Error Occurred  <span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            {validate==='incorrect'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
                <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Invalid Login Credentials<span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            {validate==='incorrectOtp'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
                <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Incorrent Otp!<span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            {validate==='NoMatch'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
                <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Password and Confirm Password don't match!<span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            {validate==='empty'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
                <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Please fill both fields!<span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            {validate==='otpSent'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Otp sent! <span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            {validate==='otpVerified'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Otp Verified <span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            {validate==='passwordReset'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Password reset successful <span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Login;
