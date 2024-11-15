import React,{useState ,useEffect} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import './API.css'
import copy from "copy-to-clipboard";
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const style_modal_popup = {
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
  borderRadius:"15px",
  border:"none !important",
  transition:" all .4s"
};


const API = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [api, setApi] = useState([]);
  const [open_modal_popup, setOpen_modal_popup] = React.useState(false);
  const [validate,setValidate]=useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openPut, setOpenPut] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [openGet, setOpenGet] = React.useState(false);
  const [openGetById, setOpenGetById] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = useState('')
  // const [copiedtext, setCopiedtext] = useState('')
  const [add, setAdd] = useState('')
  const [get, setGet] = useState('')
  const [put, setPut] = useState('')
  const [del, setDel] = useState('')
  const [getById, setGetById] = useState('')

//   const copyToClipboard = () => {
//     copy(api);
//     setTimeout(() => {
//       setOpen(false)
//     }, 1000);
// }

useEffect(()=>{
  const fetchData = async()=>{
    try{
      setLoading(true)
      const token = localStorage.getItem('token')
      const result = await axios.get("https://quikapis-backend.onrender.com/userDB/getApiById?_id="+id,{
          headers: {
            'authentication':token,
          }
      });
      setApi(result.data.APIs)
      setAdd(result.data.APIs.Add)
      setGet(result.data.APIs.Get)
      setPut(result.data.APIs.UpdateById)
      setDel(result.data.APIs.DeleteById)
      setGetById(result.data.APIs.GetById)
      setName(result.data.name)
      setLoading(false)
    }catch(err){
      setValidate('unknown')
      setOpen_modal_popup(true)
      setTimeout(() => {
        setOpen_modal_popup(false);
      }, 2000);
    }
  }

  fetchData();
},[id])   //id


  const handleTooltipClose = () => {
  };
  return (
    <>
    <Navbar/>
    <div>
    <Typography
          align="center"
          variant="body1"
          color="initial"
          className="create_head-1"
          sx={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "10vw",fontFamily:"League Spartan" }}
        >
          Use <span style={{ color: "#37BEC1" }}>quikAPI</span>
      </Typography>
      <Grid container className='firstt'>
        <Grid item xs={10} lg={10} md={10}>
              <Typography align="left" className="secondd" sx={{fontFamily: "League Spartan",
                  color:"	#5A5A5A",
                  fontWeight: "bold",
                  fontSize: "1.5rem",}} >
                <i
                  className="fas fa-paper-plane"
                  style={{
                    color: "orange",
                    fontSize: "1rem",
                    marginRight: "0.5vw",
                  }}
                ></i>    
                {name}
              </Typography>
        </Grid>

        {loading?(<>
          <div className="loading" id="loading_collection" style={{marginTop:"20vh",marginLeft:"34vw"}}>
            <svg width="64px" height="48px">
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
              <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
            </svg>
            <p>loading...</p>
           </div>
        
        
        </>):(<>

          <Grid item xs={10} lg={10} md={10}>
        <Typography align="left" className="api_heading" sx={{fontFamily: "League Spartan",
                  //color:"gray",
                  //fontFamily:"League Spartan",
                  fontSize: "1.1rem",
                  marginTop:"1rem",
                  marginLeft:"2rem",
                  marginBottom:"1rem",
                  color:"#438C8E"}} >   
                  Add new data or create a new item.
              </Typography>
        </Grid>
        
        <Grid container className="thirdd" >    
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3",borderRadius:"10px 0px 0px 10px"}}>
                  <Typography className="operation" align="left" sx={{color:'#ca9d4c',fontSize:"17px",fontWeight:"bold"}}>
                    POST
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3" }}>
                  <Typography  color="initial" className='link-api' sx={{color:"#505050",fontFamily:"League Spartan"}}>
                  {api.Add}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openAdd}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid item onClick={()=>{ 
                  copy(add);
                  setOpenAdd(true);
                  setTimeout(() => {
                    setOpenAdd(false)
                  }, 1000);
                 
                 }} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"1.6vw",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fas fa-paper-plane"  id="clipboard-icon" style={{color:"orange",fontSize: "1.1rem"}}></i>
                 </Grid>
                 </Tooltip>
        </Grid>
        

        <Grid item xs={10} lg={10} md={10}>
        <Typography align="left" className="api_heading" sx={{fontFamily: "League Spartan",
                  //color:"gray",
                  //fontFamily:"League Spartan",
                  fontSize: "1.1rem",
                  marginTop:"1rem",
                  marginLeft:"2rem",
                  marginBottom:"1rem",
                  color:"#438C8E"}} >   
                 Retrieve information from the server or database.
              </Typography>
        </Grid>
        
        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3",borderRadius:"10px 0px 0px 10px"}}>
                  <Typography className="operation" align="left" sx={{color:'#58ac7b',fontSize:"17px",fontWeight:"bold"}}>
                    GET
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api' sx={{color:"#505050",fontFamily:"League Spartan"}}>
                  {api.Get}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openGet}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid item onClick={()=>{ 
                  copy(get);
                  setOpenGet(true);
                  setTimeout(() => {
                    setOpenGet(false)
                  }, 1000);
                 
                 }} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"1.6vw",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fas fa-paper-plane"  id="clipboard-icon" style={{color:"orange",fontSize: "1.1rem"}}></i>
                 </Grid>
                 </Tooltip>
        </Grid>

        <Grid item xs={10} lg={10} md={10}>
        <Typography align="left" className="api_heading" sx={{fontFamily: "League Spartan",
                  //color:"gray",
                  //fontFamily:"League Spartan",
                  fontSize: "1.1rem",
                  marginTop:"1rem",
                  marginLeft:"2rem",
                  marginBottom:"1rem",
                  color:"#438C8E"}} >   
                 Get specific details about a single item using its unique ID.
              </Typography>
        </Grid>

        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3",borderRadius:"10px 0px 0px 10px"}}>
                  <Typography className="operation" align="left" sx={{color:'#58ac7b',fontSize:"17px",fontWeight:"bold"}}>
                    GET
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api' sx={{color:"#505050",fontFamily:"League Spartan"}}>
                  {api.GetById}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openGetById}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid item onClick={()=>{ 
                  copy(getById);
                  setOpenGetById(true);
                  setTimeout(() => {
                    setOpenGetById(false)
                  }, 1000);
                 
                 }} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"1.6vw",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fas fa-paper-plane"  id="clipboard-icon" style={{color:"orange",fontSize: "1.1rem"}}></i>
                 </Grid>
                 </Tooltip>
        </Grid>

        <Grid item xs={10} lg={10} md={10}>
        <Typography align="left" className="api_heading" sx={{fontFamily: "League Spartan",
                  //color:"gray",
                  //fontFamily:"League Spartan",
                  fontSize: "1.1rem",
                  marginTop:"1rem",
                  marginLeft:"2rem",
                  marginBottom:"1rem",
                  color:"#438C8E"}} >   
                Update or replace existing data or an item with new information.
              </Typography>
        </Grid>

        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3",borderRadius:"10px 0px 0px 10px"}}>
                  <Typography className="operation" align="left" sx={{color:'#5a81b2',fontSize:"17px",fontWeight:"bold"}}>
                    PUT
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api'  sx={{color:"#505050",fontFamily:"League Spartan"}}>
                    {api.UpdateById}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openPut}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid onClick={()=>{ 
                  copy(put);
                  setOpenPut(true);
                  setTimeout(() => {
                    setOpenPut(false)
                  }, 1000);
                 
                 }} item className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"1.6vw",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fas fa-paper-plane"  id="clipboard-icon" style={{color:"orange",fontSize: "1.1rem"}}></i>
                 </Grid>
                 </Tooltip>
        </Grid>
        
        <Grid item xs={10} lg={10} md={10}>
        <Typography align="left" className="api_heading" sx={{fontFamily: "League Spartan",
                  // color:"gray",
                  fontSize: "1.1rem",
                  marginTop:"1rem",
                  marginLeft:"2rem",
                  marginBottom:"1rem",
                  color:"#438C8E"}} >   
                 Remove data or an item by specifying its ID.
              </Typography>
        </Grid>

        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"3.5vw",borderRight: "2px solid #D3D3D3",borderRadius:"10px 0px 0px 10px"}}>
                  <Typography className="operation" align="left" sx={{color:'#c07b71',fontSize:"17px",fontWeight:"bold"}}>
                    DELETE
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api' sx={{color:"#505050",fontFamily:"League Spartan"}}>
                  {api.DeleteById}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openDel}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid item onClick={()=>{ 
                  copy(del);
                  setOpenDel(true);
                  setTimeout(() => {
                    setOpenDel(false)
                  }, 1000);
                 
                 }} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"1.6vw",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fas fa-paper-plane"  id="clipboard-icon" style={{color:"orange",fontSize: "1.1rem"}}></i>
                 </Grid>
                 </Tooltip>
        </Grid>
        <Grid item xs={10} lg={10} md={10}>
        <Typography align="centre" className="api_heading" sx={{fontFamily: "League Spartan",
                  color:"black",
                  fontSize: "1rem",
                  marginTop:"4rem",
                  marginLeft:"6.5rem",
                  marginBottom:"2rem"}} >   
                  APIs giving you a hard time? <span style={{color:"#37BEC1" , cursor:"pointer"}} onClick={()=>{navigate('/howtouse')}}>Click here</span> to learn more about quikAPIs!
              </Typography>
       
        </Grid>

        </>)}

        
      </Grid>
        {validate==='unknown'&&<Modal
          open={open_modal_popup}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal_popup}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Oops! An Error Occurred  <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>} 
    </div>
    </>
  )
}

export default API