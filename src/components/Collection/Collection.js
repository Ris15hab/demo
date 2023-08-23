import React,{useState,useEffect} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import './Collection.css'
import copy from "copy-to-clipboard";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import nodata from '../../nodata.png'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

// import Input from '@mui/joy/Input';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "20vw",
  bgcolor: 'background.paper',
  borderRadius:"25px",
  boxShadow: 24,
  p: 4,
};
const style_add = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "20vw",
  bgcolor: 'background.paper',
  borderRadius:"25px",
  boxShadow: 24,
  p: 4,
  padding:"2.4%",
};

const style_modal_popup = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius:"15px",
  border:"none !important",
  transition:" all .4s"
};


const Collection = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [validate,setValidate]=useState('');
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [dropopen, setDropOpen] = React.useState(false);
  const [addopen, setAddOpen] = React.useState(false);
  const [editopen, setEditOpen] = React.useState(false);
  const [open_modal_popup, setOpen_modal_popup] = React.useState(false);
  const [datadb,setDatadb] = useState([]);
  const [datadbcount,setDatadbcount] = useState([]);
  const [datadbname,setDatadbName] = useState('');
  const handleOpen = () => {setOpen(true)};
  const handleDropOpen = () => {setDropOpen(true)};
  const handleDropClose = () => {setDropOpen(false)};
  const handleAddOpen = () => {setAddOpen(true)};
  const handleAddClose = () => {setAddOpen(false)};
  const handleEditOpen = () => {setEditOpen(true)};
  const handleEditClose = () => {setEditOpen(false)};
  const handleClose = () => {setOpen(false)};
  
  
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const token = localStorage.getItem('token')
          const result = await axios.get("http://localhost:8000/userDB/getUserDBCollection?_id="+id,{
              headers: {
                'authentication':token,
              }
          });
          // console.log(result)
          setDatadb(result.data.response.data)
          setDatadbName(result.data.name)
          setDatadbcount(result.data.response.count)
      }catch(err){
        setValidate('unknown')
        setOpen_modal_popup(true)
        setTimeout(() => {
          setOpen_modal_popup(false);
        }, 2000);
      }
    }

    fetchData();
  },[refresh])

  return (
    <>
    <Navbar/>
    <div>
        <Typography
          align="center"
          variant="body1"
          color="initial"
          className="create_head-1"
          sx={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "12vw",fontFamily:"League Spartan",}}
        >
          Browse <span style={{ color: "#37BEC1" }}>Documents</span>
      </Typography>
      <Grid container className="grid-collection">
      <Grid item xs={12} lg={7} md={9}>
              <Typography align="left" className="secondd" sx={{fontFamily: "League Spartan",
                  color:"	#5A5A5A",
                  fontWeight: "bold",
                  fontSize: "1.5rem",}} >
                <i
                  className="fas fa-paper-plane"
                  style={{
                    color: "orange",
                    fontSize: "0.9rem",
                    marginRight: "1vw",
                    marginBottom:"7vh"
                  }}
                ></i>    
                {datadbname}
              </Typography>
        </Grid>
        <Grid item xs={3} lg={2} md={1} className="count-collection-document">
             {/* {datadbcount} <br/> */}
            {/* <span style={{fontSize:"10px"}}>DOCUMENTS</span> */}
            <Tooltip  sx={{cursor:"pointer"}}>
            <Box className="collection-document">
                {datadbcount} Documents
            </Box>
            </Tooltip>
        </Grid>
        <Grid item xs={3} lg={1} md={1} className="count-collection">
        <Tooltip title="Add Document" sx={{cursor:"pointer"}} onClick={handleAddOpen}>
            <Box className="collection-add">
               Add
            </Box>
        </Tooltip>
         <Modal
              open={addopen}
              onClose={handleAddClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style_add} className="modal-box-delete">
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center" sx={{fontFamily:"League Spartan",color:"#438C8E",marginBottom:"2vh"}}>
                  Add Document.
                </Typography>
                <Typography align="center">
                
                <TextField id="standard-basic" label="name" variant="standard" />
                <TextField id="standard-basic" label="email" variant="standard" />
                
                
                </Typography>
                <Typography id="modal-modal-description" align="center" sx={{ mt: 6 }}>
                <Button sx={{color:"green"}} onClick={handleAddClose}>Submit</Button> <Button onClick={handleAddClose} sx={{color:"gray"}}>Cancel</Button>
                </Typography>
              </Box>
            </Modal>
          </Grid>
          <Grid item xs={3} lg={1} md={1} className="count-collection">
          <Tooltip title="Drop all collections" onClick={handleDropOpen} sx={{cursor:"pointer"}}>
            <Box className="collection-drop" >
             Drop
            </Box>
            </Tooltip>
            <Modal
              open={dropopen}
              onClose={handleDropClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="modal-box-delete">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to drop all documents?
                </Typography>
                <Typography id="modal-modal-description" align="right" sx={{ mt: 2 }}>
                <Button sx={{color:"red"}} onClick={handleDropClose}>YES</Button> <Button onClick={handleDropClose} sx={{color:"gray"}}>Cancel</Button>
                </Typography>
              </Box>
            </Modal>
        
          </Grid>
          <Grid item xs={3} lg={1} md={1} className="count-collection">
          <Tooltip title="Refresh" sx={{cursor:"pointer"}} onClick={(e)=>setRefresh(!refresh)}>
            <Box className="collection-refresh">
            <i className="fa-solid fa-arrows-rotate" style={{color:"#37BEC1"}}></i>
            </Box>
            </Tooltip>
          </Grid>
          {(datadbcount===0)?(
            <>
            <img src={nodata} className='nodata2' alt="no data"></img>
            <Typography className='note-head2' variant="body1" color="initial" align='left' >
              No Documents to display!
            </Typography>
            </>
          ):(
          datadb.map((obj, index) => (
        <Grid item xs={11} md={8} lg={8} className="collection-box" sx={{marginBottom:"3vh !important",  marginTop:"3vh"}} key={datadb[index]._id}>
                  <Typography variant="body1" align="right" color="initial" sx={{color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan",marginRight:"1vw"}}>
                              <Button variant="text" color="primary" onClick={handleEditOpen}>
                              <i className="fa-regular fa-pen-to-square" style={{fontSize:"1.1rem",color:"green"}}></i>
                              </Button>
                              <Modal
                                  open={editopen}
                                  onClose={handleEditClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style_add} className="modal-box-delete">
                                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center" sx={{fontFamily:"League Spartan",color:"#438C8E",marginBottom:"2vh"}}>
                                      Update Document.
                                    </Typography>
                                    <Typography align="center">
                                    
                                    <TextField id="standard-basic" label="name" variant="standard" />
                                    <TextField id="standard-basic" label="email" variant="standard" />
                                    
                                    
                                    </Typography>
                                    <Typography id="modal-modal-description" align="center" sx={{ mt: 6 }}>
                                    <Button sx={{color:"green"}} onClick={handleEditClose}>Submit</Button> <Button onClick={handleEditClose} sx={{color:"gray"}}>Cancel</Button>
                                    </Typography>
                                  </Box>
                                </Modal>
                               <Button variant="text" color="primary" onClick={handleOpen}>
                               <i class="fa-regular fa-trash-can" style={{fontSize:"1.1rem",color:"red"}}></i>
                              </Button>
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style} className="modal-box-delete">
                                  <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Are you sure you want to delete this document?
                                  </Typography>
                                  <Typography id="modal-modal-description" align="right" sx={{ mt: 2 }}>
                                  <Button sx={{color:"red"}} onClick={handleClose}>YES</Button> <Button onClick={handleClose} sx={{color:"gray"}}>Cancel</Button>
                                  </Typography>
                                </Box>
                              </Modal>
                  </Typography>
                  

                      {Object.entries(obj).map(([key, value]) => (
                        <Typography
                          key={key}
                          variant="body1"
                          align="left"
                          color="initial"
                          sx={{ marginLeft: "4vw", color: "#5A5A5A", fontWeight: "bold", fontFamily: "League Spartan" }}
                        >
                          {key}: <span style={{color:"#438C8E"}}> {value}</span>
                        </Typography>
                      ))}
                  
        </Grid>))
            
          )}
        </Grid> 
        {validate=='unknown'&&<Modal
          open={open_modal_popup}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal_popup}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i class="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Oops! An Error Occurred  <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>} 
    </div>
    </>
  )
}

export default Collection