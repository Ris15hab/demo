import React,{useState} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from '@mui/material/Typography'
import './Contact.css'
import Grid from '@mui/material/Grid'
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from 'axios';

const style = {
  position: "absolute",
  top: "50%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  width: 300,
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

const Contact = () => {
  const [message, setMessage] = useState('Send')
  const [text, setText] = useState('')
  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')
  const [validate,setValidate]=useState('');
  const [open, setOpen] = React.useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit=async(e)=>{
    try{
      const token = localStorage.getItem('token')
      const response = await axios.post("https://quikapis-backend.onrender.com/user/contact", {
        email,
        subject,
        message:text
      },{
        headers: {
          'authentication':token,
        }
      });
      if(response.status===201){
        setValidate('correct')
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
        }, 1500);
      }
    }catch(err){
      setValidate('unknown')
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 1500);
    }
    setEmail('');
    setIsChecked(false)
    setText('');
    setSubject(' ');
    setMessage("Message Sent!")
  }

  const handleEmail = async() =>{
    try{
      if(isChecked){
        setEmail('')
      }else{
        const token = localStorage.getItem('token')
        const response = await axios.get("https://quikapis-backend.onrender.com/user/getUserById",{
            headers: {
              'authentication':token,
            }
        });

        setEmail(response.data.userData.email)
      }
      setIsChecked(!isChecked)
    }catch(err){
      setValidate('unknown')
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 1500);
    }
  }

  const handleEmpty=()=>{
    setValidate('empty')
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 1500);
  }

  return (
    <>
    <div className="css-gradient">
     <Navbar/>
    <div >
      <Typography
          align="center"
          variant="body1"
          color="initial"
          className="create_head-1"
          sx={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "12vw",fontFamily:"League Spartan",}}
        >
          Get in <span style={{ color: "#37BEC1" }}>Touch!</span>
      </Typography>

      <Grid className="grid-contact" sx={{marginLeft:"40vw",width:"30vw",marginTop:"3vh"}}>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",color:"#3fabbf",fontFamily:"League Spartan",fontWeight:"bold"}}>
          Email
        </Typography>
        <input  type="text" name="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="contact-name" autoComplete="off"style={{fontFamily:"League Spartan",color:"gray"}} /><br/>
        </div>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",fontFamily:"League Spartan",fontWeight:"bold",color:"gray"}}>
        <input type="checkbox" id="vehicle1" name="vehicle1" onClick={handleEmail} checked={isChecked}/>
        <label for="vehicle1" className="label-input" style={{marginLeft:"0.5vw"}}>Use my account email</label><br/>
        </Typography>
        </div>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",marginTop:"3vh",color:"#3fabbf",fontFamily:"League Spartan",fontWeight:"bold"}}>
        Subject
        </Typography>
        <FormControl
              variant="standard"
              fullWidth
              className="contact-select"
              sx={{ marginTop: "1vh", padding: "8px",marginBottom:"3vh" }}
            >
              <Select
                 value={subject} 
                onChange={(e)=>setSubject(e.target.value)}
                sx={{ color: "gray", fontWeight: "bold", marginLeft: "1vw",fontFamily:"League Spartan" }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                disableUnderline
                name="type"
              >
              <MenuItem value={""} name="type" sx={{backgroundColor:"#D3D3D3",marginTop:"-1vh"}}>
                  <Typography
                    variant="body1"
                    align="left"
                    color="initial"
                    sx={{
                      color: "gray",
                      fontWeight: "bold",
                      marginLeft: "1vw",
                      fontFamily:"League Spartan"
                    }}
                  >
                    What's your issue?
                  </Typography>
                </MenuItem >
                <MenuItem name="type" value={"Issue with quikAPI"} sx={{backgroundColor:"#D3D3D3"}}>
                  Issue with quikAPI
                </MenuItem>
                <MenuItem name="type" value={"Issue with quikDB"} sx={{backgroundColor:"#D3D3D3"}}>
                Issue with quikDB
                </MenuItem>
                <MenuItem name="type" value={"Unable to generate quikAPI"} sx={{backgroundColor:"#D3D3D3"}}>
                Unable to generate quikAPI
                </MenuItem>
                <MenuItem name="type" value={"Issue with crud operations"} sx={{backgroundColor:"#D3D3D3"}}>
                  Issue with crud operations
                </MenuItem>
                <MenuItem name="type" value={"Suggestions"} sx={{backgroundColor:"#D3D3D3"}}>
                Suggestions
                </MenuItem>
                <MenuItem name="type" value={"Other"}  sx={{backgroundColor:"#D3D3D3",marginBottom:"-16vh"}}>
                  Other
                </MenuItem>
              </Select>
            </FormControl>
        </div>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",marginTop:"3vh",color:"#3fabbf",fontFamily:"League Spartan",fontWeight:"bold"}}>
        Message
        </Typography>
        <textarea value={text} onChange={(e)=>setText(e.target.value)} type="text" name="text" className="contact-name" style={{height:"15vh",color:"gray" , fontFamily:"League Spartan"}} />
        </div>
        {(email!==''&&subject!==''&&text!=='')?(<Typography  align="center" sx={{color:"white"}}>
          <button className="contact-submit" style={{marginTop:"3vh",width:"13vw",marginBottom:"10vh"}} onClick={handleSubmit}>
            {message}
          </button>
        </Typography>):
        (<Typography  align="center" sx={{color:"white"}}>
          <button className="contact-submit" style={{marginTop:"3vh",width:"13vw",marginBottom:"10vh",backgroundColor:"grey"}} onClick={handleEmpty}>
            Send
          </button>
        </Typography>)}
      </Grid>
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
        </Modal>}

        {validate==='empty'&&<Modal
        open={open}
        sx={{border:"none !important"}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
          <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
          Please fill all fields  <span style={{marginRight:"1vw !important"}}></span>
          </Typography>
        </Box>
        </Modal>}

        {validate==='correct'&&<Modal
        open={open}
        sx={{border:"none !important"}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
          <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
          Response Recorded! <span style={{marginRight:"1vw !important"}}></span>
          </Typography>
        </Box>
        </Modal>}

    </div>
    </div>
    </>
  )
}

export default Contact