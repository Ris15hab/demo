import React,{useState} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import './HowToUse.css'
import Grid from '@mui/material/Grid'
import Step1 from './images/step1.png'
import Step2 from './images/step2.png'
import Step3 from './images/step3.png'
import Step4 from './images/step4.png'
import Step5 from './images/step5 (2).png'
import Step6 from './images/step6.png'
import Step7 from './images/step7.png'
import get from './images/get.png'
import post from './images/post.png'
import update from './images/update.png'
import remove from './images/remove.png'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Modal from "@mui/material/Modal";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw !important",
  height: "85vh",
  bgcolor: "background.paper",
  border: "none !important",
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "15px",
  transition: "all .4s",
  // boxShadow: 24, // Remove this line or provide a valid shadow value
};



const HowToUse = () => {

  const [open,setOpen]=useState(false)
  const [validate,setValidate]=useState('')

  const handleOpen = (imagename) => {
    setValidate(imagename)
    setOpen(true)
  }

  const handleClose = () =>{
    setOpen(false)
  }

  return (
    <>
     <Navbar/>
    <div >
    <Typography
          align="center"
          variant="body1"
          color="initial"
          className="create_head-1"
          sx={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "10vw",fontFamily:"League Spartan" }}
        >
         How to use <span style={{ color: "#37BEC1" }}>quikAPI</span>
    </Typography>
    <Typography  align="left" className="content-use-typo" sx={{marginTop:"6vh"}}>
    Welcome to our step-by-step guide on creating and integrating your own APIs for frontend development. With these simple instructions, you'll be able to set up a fully functional database and <b>CRUD</b> (<span style={{color:"orange"}}>Create</span> , <span style={{color:"green"}}>Read</span> , <span style={{color:"blue"}}>Update</span> , <span style={{color:"red"}}>Delete</span>) APIs. Let's get started!
    </Typography>
    <Typography align="left" className="content-use-step" sx={{marginTop:"6vh",fontWeight:"bold"}}>
      Step 1: Create a Quik Database (QuikDB)
    </Typography>
    <Grid container sx={{marginTop:"4vh"}}>
        <Grid item xs={10} md={3} lg={3} sx={{marginLeft:"20vw"}}>
        <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem"}} className="content-step1">
            1) Navigate to the <b>Create QuikDB</b> page on our platform.<br/>
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem"}} className="content-step1">
            2) Fill in the required schema for your database, ensuring that the database name doesn't contain spaces and all fields are completed. <br/>
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem"}} className="content-step1">
            3) Click on the <b>Generate API</b> button to create your CRUD APIs instantly.
            </Typography>
        </Grid>
        <Grid item xs={10} md={6} lg={6} >
       
          <img src={Step1} alt="no img" style={{width:"40vw",height:"50vh"}} className="firstimg" />    
        </Grid>
    </Grid>
    <Typography align="left" className="content-use-step" sx={{marginTop:"6vh",fontWeight:"bold",marginBottom:"4vh"}}>
      Step 2:  Access Your APIs
    </Typography>
           <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem"}} className="step2">
            1) Head over to the <b>View QuikDB</b> section to find a list of all your databases.
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem"}} className="step2">
            2) Select the database you just created.
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem"}} className="step2" >
            3) Click on the <b>APIs</b> button to view a list of the five APIs that have been generated for you.
            </Typography>
        <Grid container>
            <Grid item xs={10} md={4} lg={4} sx={{marginLeft:"20vw"}}>
            <img src={Step2} alt="no img" style={{width:"38vw",height:"50vh",marginRight:"5vw"}} className="secondimg"/>
            </Grid>
            <Grid item xs={10} md={5} lg={5} sx={{}}>
            <img src={Step3} alt="no img" style={{width:"40vw",height:"55vh",marginLeft:"5vw"}} className="firstimg"/>
            </Grid>
        </Grid>
        <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem",marginTop:"5vh"}} className="step2">
            4) In the APIs section, you'll see the five APIs: Create, Read, Update, Delete, and List.
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem"}} className="step2">
            5) Copy the API endpoints you need based on the functionality you require (e.g., Create, Read, Update, Delete).
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem"}} className="step2" >
            6) Integrate these API endpoints into your website code for seamless functionality.
            </Typography>

        <Typography align="left" className="content-use-step" sx={{marginTop:"6vh",fontWeight:"bold",marginBottom:"4vh"}}>
        Step 3:  Integrate CRUD APIs into Your React Website
       </Typography>
           <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem",marginTop:"5vh"}} className="step2">
            1) <b>Create API Integration </b> - <span style={{fontWeight:"bold",color:"orange"}}>POST</span><br/><br/>
            <img src={post} alt="no img" style={{width:"40vw",height:"50vh"}} className="reqimg"/>
            <ZoomInIcon sx={{marginRight:"5vw",color:"gray",cursor:"pointer"}} className="zoom-icon" onClick={()=>handleOpen('imageone')}/>
            </Typography> 

           <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem",marginTop:"5vh"}} className="step2">
            2) <b>Read API Integration </b> - <span style={{fontWeight:"bold",color:"green"}}>GET</span><br/><br/>
            <img src={get} alt="no img" style={{width:"40vw",height:"50vh"}} className="reqimg"/>
            <ZoomInIcon sx={{marginRight:"5vw",color:"gray",cursor:"pointer"}} className="zoom-icon" onClick={()=>handleOpen('imagetwo')}/>
            </Typography>

            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem",marginTop:"5vh"}} className="step2">
            3) <b>Update API Integration </b> - <span style={{fontWeight:"bold",color:"blue"}}>PUT</span><br/><br/>
            <img src={update} alt="no img" style={{width:"40vw",height:"50vh"}} className="reqimg"/>
            <ZoomInIcon sx={{marginRight:"5vw",color:"gray",cursor:"pointer"}} className="zoom-icon" onClick={()=>handleOpen('imagethree')}/>
            </Typography>

            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem",marginTop:"5vh"}} className="step2">
            4) <b>Delete API Integration </b> - <span style={{fontWeight:"bold",color:"red"}}>DELETE</span><br/><br/>
            <img src={remove} alt="no img" style={{width:"40vw",height:"50vh"}} className="reqimg"/>
            <ZoomInIcon sx={{marginRight:"5vw",color:"gray",cursor:"pointer"}} className="zoom-icon" onClick={()=>handleOpen('imagefour')}/>
            </Typography>

            <Typography align="left" className="content-use-step" sx={{marginTop:"6vh",fontWeight:"bold",marginBottom:"4vh"}}>
              Step 4:  View Database collections
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem",marginTop:"5vh"}} className="step2">
            1) After using the APIs to populate your database, navigate back to the <b>View QuikDB</b> page.
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem"}} className="step2">
            2) Click on the <b> Collections</b> button for the database you created.
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem"}} className="step2" >
            3) Explore and view all the data that has been stored in your database.
            </Typography>
            <Grid container>
            <Grid item xs={10} md={4} lg={4} sx={{marginLeft:"18vw"}}>
            <img src={Step7} alt="no img" style={{width:"35vw",height:"50vh",marginRight:"1vw"}} className="secondimg"/>
            </Grid>
            <Grid item xs={10} md={5} lg={5} sx={{}}>
            <img src={Step4} alt="no img" style={{width:"45vw",height:"55vh"}} className="firstimg"/>
            </Grid>
          </Grid>

          <Typography align="left" className="content-use-step" sx={{marginTop:"6vh",fontWeight:"bold",marginBottom:"4vh"}}>
              Step 5:  Managing Database
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem",marginTop:"5vh"}} className="step2">
            As the owner of the database, you have full control over your data.
            </Typography>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"2vh"}} className="step2">
            1) Use the provided options to add, delete, or edit data in your database.
            </Typography>
            <Grid container>
            <Grid item xs={10} md={4} lg={4} sx={{marginLeft:"20vw"}}>
            <img src={Step5} alt="no img" style={{width:"45vw",height:"50vh",marginRight:"2vw"}} className="secondimg"/>
            </Grid>
            <Grid item xs={10} md={5} lg={5} sx={{}}>
            <img src={Step6} alt="no img" style={{width:"40vw",height:"55vh"}} className="firstimg"/>
            </Grid>
            </Grid>
            <Typography align="left" sx={{fontFamily:"League Spartan",fontSize:"1.1rem",marginBottom:"0.2rem",marginTop:"3vh"}} className="step2"> 
            2) Similarly, click on the collection to edit or delete your data.<br/>
            3) Remember to refresh the database after adding new databases for updates to take effect.
            </Typography>
            <Typography align="center" sx={{fontFamily:"League Spartan",fontSize:"1.2rem",marginTop:"7vh",marginBottom:"7vh",fontWeight:"bold"}} className="step3">
            Congratulations! You've successfully created your own database with fully functional APIs and integrated them into your React website.<br/> Now you have a full-stack project of your own!
            </Typography>

          {validate==='imageone'&&<Modal
          open={open}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <i className="fa-solid fa-x" style={{paddingLeft:"70vw",paddingBottom:"1vh",cursor:"pointer"}} onClick={handleClose} ></i>
              <img src={post} alt="no img" style={{width:"70vw",height:"80vh",borderRadius:"15px"}}/>
            </Box>
          </Modal>}

          {validate==='imagetwo'&&<Modal
          open={open}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <i className="fa-solid fa-x" style={{paddingLeft:"70vw",paddingBottom:"1vh",cursor:"pointer"}} onClick={handleClose} ></i>
              <img src={get} alt="no img" style={{width:"70vw",height:"80vh",borderRadius:"15px"}}/>
            </Box>
          </Modal>}

          {validate==='imagethree'&&<Modal
          open={open}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <i className="fa-solid fa-x" style={{paddingLeft:"70vw",paddingBottom:"1vh",cursor:"pointer"}} onClick={handleClose} ></i>
              <img src={update} alt="no img" style={{width:"70vw",height:"80vh",borderRadius:"15px"}}/>
            </Box>
          </Modal>}

          {validate==='imagefour'&&<Modal
          open={open}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <i className="fa-solid fa-x" style={{paddingLeft:"70vw",paddingBottom:"1vh",cursor:"pointer"}} onClick={handleClose} ></i>
              <img src={remove} alt="no img" style={{width:"70vw",height:"80vh",borderRadius:"15px"}}/>
            </Box>
          </Modal>}
    </div>
    </>
  )
}

export default HowToUse