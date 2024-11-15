import React,{useState,useEffect} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import './Collection.css'
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import nodata from '../../nodata.png'
import TextField from '@mui/material/TextField';

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
  //border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius:"15px",
  border:"none !important",
  transition:" all .4s"
};


const Collection = () => {
  //const navigate = useNavigate();
  const {id} = useParams();
  const [validate,setValidate]=useState('');
  const [userid,setUserid]=useState('');
  const [open, setOpen] = React.useState(false);
  const [loading,setLoading]=useState(false)
  const [refresh, setRefresh] = React.useState(false);
  const [dropopen, setDropOpen] = React.useState(false);
  const [addopen, setAddOpen] = React.useState(false);
  const [editopen, setEditOpen] = React.useState(false);
  const [open_modal_popup, setOpen_modal_popup] = React.useState(false);
  const [datadb,setDatadb] = useState([]);
  const [datadbcount,setDatadbcount] = useState([]);
  const [datadbname,setDatadbName] = useState('');
  const [formValues, setFormValues] = useState({});
  const handleOpen = (id) => {
    console.log(id)
    setUserid(id)
    setOpen(true)
  };
  const handleDropOpen = () => {setDropOpen(true)};
  const handleDropClose = () => {setDropOpen(false)};
  const handleAddClose = () => {
    setFormValues([])
    setAddOpen(false)
  };
  const handleEditClose = () => {
    setFormValues([])
    setEditOpen(false)
  };
  const handleClose = () => {setOpen(false)};
  const [modelSchema, setModelSchema] = useState([])

  const handleAddOpen = async (e) => {
    try{
      const token = localStorage.getItem('token')
      const result = await axios.get("https://quikapis-backend.onrender.com/guiCRUD/getFields?_id="+id,{
          headers: {
            'authentication':token,
          }
      });
      // console.log(result.data.modelSchema)
      setModelSchema([result.data.modelSchema])
      setAddOpen(true)
    }catch(err){
      setValidate('unknown')
      setOpen_modal_popup(true)
      setTimeout(() => {
        setOpen_modal_popup(false);
      }, 1500);
    }
  };

  const handleEditOpen = async (data) => {
    try{
      setUserid(data._id)
      const token = localStorage.getItem('token')
      const result = await axios.get("https://quikapis-backend.onrender.com/guiCRUD/getFields?_id="+id,{
          headers: {
            'authentication':token,
          }
      });
      // console.log(result.data.modelSchema)
      setModelSchema([result.data.modelSchema])
      setEditOpen(true)
      setFormValues(data)
    }catch(err){
      setValidate('unknown')
      setOpen_modal_popup(true)
      setTimeout(() => {
        setOpen_modal_popup(false);
      }, 1500);
    }
  };

  const handleFieldChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleAddSubmit = async(e)=>{
    try{
      const token = localStorage.getItem('token')
      const result = await axios.get("https://quikapis-backend.onrender.com/userDB/getApiById?_id="+id,{
          headers: {
            'authentication':token,
          }
      });
      // console.log(result.data.APIs.Add)
      const response = await axios.post(`${result.data.APIs.Add}`,formValues,{
        headers: {
          'isThisReqSentFromGuiWebsiteForm': true
        }
    });
      // console.log(formValues)
      if(response.status === 201){
        setValidate('add_submit')
        setOpen_modal_popup(true)
        setTimeout(() => {
          setOpen_modal_popup(false);
          setRefresh(!refresh)
        }, 1000);
      }
      setAddOpen(false)
      setFormValues({})
    }catch(err){
      // console.log(err.response.data.message)
      if(err.response.data.message.includes('E11000')){
        setValidate('uniqueError')
      }else if(err.response.data.message.includes('required')){
        setValidate('requiredError')
      }else{
        setValidate('unknown')
      }
      setOpen_modal_popup(true)
      setTimeout(() => {
        setOpen_modal_popup(false);
      }, 2000);
    }
  }

  const handleCloseDeleteSubmit = async(iddoc)=>{
    try{
      const token = localStorage.getItem('token')
      const result = await axios.get("https://quikapis-backend.onrender.com/userDB/getApiById?_id="+id,{
          headers: {
            'authentication':token,
          }
      });
      const response = axios.delete(`${result.data.APIs.DeleteById}`+iddoc,{
        headers: {
          'isThisReqSentFromGuiWebsiteForm': true
        }
    });
      console.log("iddoc is this: "+iddoc);
      // console.log(response)
      if(response){
        setOpen(false)
        setValidate('delete_submit')
        setOpen_modal_popup(true)
        setTimeout(() => {
          setOpen_modal_popup(false);
          setRefresh(!refresh)
        }, 1000);
      }
    }catch(err){
      setValidate('unknown')
      setOpen_modal_popup(true)
      setTimeout(() => {
        setOpen_modal_popup(false);
      }, 1500);
    }
  }

  const handleEditSubmit = async(iddoc)=>{
    try{
      
      const token = localStorage.getItem('token')
      const result = await axios.get("https://quikapis-backend.onrender.com/userDB/getApiById?_id="+id,{
          headers: {
            'authentication':token,
          }
      });
      const response = axios.put(`${result.data.APIs.UpdateById}`+iddoc,formValues,{
        headers: {
          'isThisReqSentFromGuiWebsiteForm': true
        }
    });
      console.log(response)
      // if(response){
        setOpen(false)
        setValidate('update_submit')
        setOpen_modal_popup(true)
        setEditOpen(false)
        setFormValues({})
        setTimeout(() => {
          setOpen_modal_popup(false);
          setRefresh(!refresh)
        }, 1000);
      // }
    }catch(err){
      if(err.response.data.message.includes('E11000')){
        setValidate('uniqueError')
      }else if(err.response.data.message.includes('required')){
        setValidate('requiredError')
      }else{
        setValidate('unknown')
      }
      setOpen_modal_popup(true)
      setTimeout(() => {
        setOpen_modal_popup(false);
      }, 2000);
    }
  }

  const handleDropSubmit = async(e)=>{
    try{
      const token = localStorage.getItem('token')
      const result = await axios.delete("https://quikapis-backend.onrender.com/guiCRUD/dropAll?_id="+id,{
          headers: {
            'authentication':token,
          }
      });
      if(result){
        setDropOpen(false)
        setValidate('drop_submit')
        setOpen_modal_popup(true)
        setTimeout(() => {
          setOpen_modal_popup(false);
          setRefresh(!refresh)
        }, 1000);
      }
    }catch(err){
      setValidate('unknown')
      setOpen_modal_popup(true)
      setTimeout(() => {
        setOpen_modal_popup(false);
      }, 1500);
    }
  }
  
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        setLoading(true)
        const token = localStorage.getItem('token')
          const result = await axios.get("https://quikapis-backend.onrender.com/userDB/getUserDBCollection?_id="+id,{
              headers: {
                'authentication':token,
              }
          });
          // console.log(result)
          setDatadb(result.data.response.data)
          setDatadbName(result.data.name)
          setLoading(false)
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
  },[refresh,id])

  // console.log(datadb)
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
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center" sx={{fontFamily:"League Spartan",color:"#438C8E"}}>
                  Add Document.
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center" sx={{fontFamily:"League Spartan",color:"grey",fontSize:"15px",marginTop:"-1vh",marginBottom:"2vh"}}>
                  (* indicates required fields)
                </Typography>
                <Typography align="center">
                
              
                {modelSchema.map((item, index) => (
                  <div key={index}>
                    {Object.entries(item).map(([key, value]) => (
                      // console.log(value.options.required)
                      ( value.options.required) ?(
                        <TextField key={key} id={key} label={key+'*'} variant="standard"value={formValues[key] || ''}
                        onChange={(e) => handleFieldChange(key, e.target.value)} autoComplete='off'/>
                      ):(
                        (key !== '_id' && key !== '__v') &&<TextField key={key} id={key} label={key} variant="standard"value={formValues[key] || ''}
                        onChange={(e) => handleFieldChange(key, e.target.value)} autoComplete='off'/>
                      )
                    ))}
                  </div>
                ))}
                </Typography>
                <Typography id="modal-modal-description" align="center" sx={{ mt: 6 }}>
                <Button sx={{color:"green"}} onClick={handleAddSubmit}>Submit</Button> <Button onClick={handleAddClose} sx={{color:"gray"}}>Cancel</Button>
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
                <Button sx={{color:"red"}} onClick={handleDropSubmit}>YES</Button> <Button onClick={handleDropClose} sx={{color:"gray"}}>Cancel</Button>
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
          {loading?(
            <>
            <div className="loading" id="loading_collection" style={{marginTop:"20vh"}}>
            <svg width="64px" height="48px">
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
              <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
            </svg>
            <p>loading...</p>
           </div>
           
           
           </>
          ):(<>

           {(datadbcount===0)?(
            <>
            <img src={nodata} className='nodata2' alt="no data"></img>
            <Typography className='note-head2' variant="body1" color="initial" align='left' >
              No Documents to display!
            </Typography>
            </>
          ):(
          datadb.map((obj, index) => (
          <Grid item xs={11} md={8} lg={8} className="collection-box" sx={{marginBottom:"3vh !important",  marginTop:"3vh"}} key={index}>
                  <Typography variant="body1" align="right" color="initial" sx={{color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan", marginRight:"1vw"}}>
                              <Button variant="text" color="primary" onClick={(e)=>handleEditOpen(datadb[index])}>
                              <i className="fa-regular fa-pen-to-square" style={{fontSize:"1.1rem",color:"green"}}></i>
                              </Button>
                              <Modal
                                 key={datadb[index]._id}
                                  open={editopen}
                                  onClose={handleEditClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style_add} className="modal-box-delete" key={datadb[index]._id}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center" sx={{fontFamily:"League Spartan",color:"#438C8E"}}>
                                      Update Document.
                                    </Typography>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center" sx={{fontFamily:"League Spartan",color:"grey",fontSize:"15px",marginTop:"-1vh",marginBottom:"2vh"}}>
                                      (* indicates required fields)
                                    </Typography>
                                    <Typography align="center">                                  
                                    {modelSchema.map((item, index) => (
                                      <div key={datadb[index]._id}>
                                        {Object.entries(item).map(([key, value]) => (
                                          ( value.options.required) ?(
                                            <TextField key={key} id={key} label={key+'*'} variant="standard"value={formValues[key] || ''}
                                            onChange={(e) => handleFieldChange(key, e.target.value)} autoComplete='off'/>
                                          ):(
                                            (key !== '_id' && key !== '__v') &&<TextField key={key} id={key} label={key} variant="standard"value={formValues[key] || ''}
                                            onChange={(e) => handleFieldChange(key, e.target.value)} autoComplete='off'/>
                                          )
                                        ))}
                                      </div>
                                    ))}
                                    </Typography>
                                    <Typography id="modal-modal-description" align="center" sx={{ mt: 6 }}>
                                    <Button sx={{color:"green"}} onClick={(e)=>handleEditSubmit(userid)}>Submit</Button> <Button onClick={handleEditClose} sx={{color:"gray"}}>Cancel</Button>
                                    </Typography>
                                  </Box>
                                </Modal>
                               <Button variant="text" color="primary" onClick={(e) => handleOpen(datadb[index]._id)}>
                               <i className="fa-regular fa-trash-can" style={{fontSize:"1.1rem",color:"red"}}></i>
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
                                  <Button sx={{color:"red"}} onClick={(e)=>handleCloseDeleteSubmit(userid)}>YES</Button> <Button onClick={handleClose} sx={{color:"gray"}}>Cancel</Button>
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
                          {key}: <span style={{color:"#438C8E"}}> {(value===true)?'true':((value===false)?'false':value)}</span>
                        </Typography>
                      ))}
                  
        </Grid>))
            
          )}

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
        {validate==='uniqueError'&&<Modal
          open={open_modal_popup}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal_popup}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            A duplicate entry exists for a unique field value. <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>}
        {validate==='requiredError'&&<Modal
          open={open_modal_popup}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal_popup}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Please fill all the required fields  <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>}
        {validate==='add_submit'&&<Modal
          open={open_modal_popup}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal_popup}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Data Added Successfully <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>} 
        {validate==='delete_submit'&&<Modal
          open={open_modal_popup}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal_popup}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Data deleted successfully <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>} 
        {validate==='update_submit'&&<Modal
          open={open_modal_popup}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal_popup}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Data updated successfully <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>} 
        {validate==='drop_submit'&&<Modal
          open={open_modal_popup}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal_popup}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            All documents dropped succesfully <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>} 
    </div>
    </>
  )
}

export default Collection