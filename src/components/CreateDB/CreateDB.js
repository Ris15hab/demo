import React, { useState} from "react";
import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";
import "./CreateDB.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TableBody from "@mui/material/TableBody";
import { TableCell} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Modal from "@mui/material/Modal";
import "react-toastify/dist/ReactToastify.css";
//importing axios
import axios from "axios";


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

// const style2 = {
//   position: "absolute",
//   top: "50%",
//   left: "55%",
//   transform: "translate(-50%, -50%)",
//   width: 300,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
//   borderRadius:"15px",
//   border:"none !important",
//   transition:" all .4s"
// };

const CreateDB = () => {
  const [preview, setPreview] = React.useState(false);
  const [request, setRequest] = React.useState(true);
  const [validate,setValidate]=useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');  
  const [open, setOpen] = React.useState(false);
  

  const handleGenerate = async () => {
    
    const space = /\s/.test(name);
    const special=/^[a-zA-Z0-9_]+$/.test(name);
    
    if (space || !special) {
      setValidate('whitespace');
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } else {
      setPreview(!preview)
      const modelSchema = {};
      final.forEach((final) => {
        modelSchema[final.name] = {
          type: final.type,
          unique: final.unique,
          required: final.required,
        };
      });
  
      // try {
      //   // const token = localStorage.getItem('token');
      //   // const response = await axios.post(
      //   //   "https://quikapis-backend.onrender.com/crud/createcrud",
      //   //   {
      //   //     modelName: name,
      //   //     modelDescription: description,
      //   //     modelSchema,
      //   //   },
      //   //   {
      //   //     headers: {
      //   //       'authentication': token,
      //   //     },
      //   //   }
      //   // );
      //   const debouncedAxiosRequest = debounce(async (config) => {
      //     try {
      //       const response = await axios(config);
      //       console.log(response)
      //       setValidate('correct');
      //       // Process the response
      //     } catch (error) {
      //       // Handle errors
      //       console.log("yaha error hai")
      //     }
      //   }, 500); // Adjust the delay as needed
        
      //   // When you want to make a POST request
      //   debouncedAxiosRequest({
      //     method: 'post',
      //     url: 'https://quikapis-backend.onrender.com/crud/createcrud',
      //     data: {
      //       modelName: name,
      //       modelDescription: description,
      //       modelSchema,
      //     },
      //     headers: {
      //       'authentication': localStorage.getItem('token'),
      //   },
      //   });
  
      //   //console.log(response);
       
      // } catch (err) {
      //   console.log(err);
      //   setValidate('unknown');
      // }
       let isRequestPending = false;

      const sendPostRequest = async (name, description, modelSchema) => {
        if (isRequestPending) {
          return; 
        }

        isRequestPending = true;

        try {
          setRequest(true)
          const token = localStorage.getItem('token');
          const response = await axios.post(
            "https://quikapis-backend.onrender.com/crud/createcrud",
            {
              modelName: name,
              modelDescription: description,
              modelSchema,
            },
            {
              headers: {
                'authentication': token,
              },
            }
          );
          setRequest(false);
          if(!request){
            setValidate('correct');
          }
        } catch (error) {
          console.log("erorrrrr")
        } finally {
          isRequestPending=false;
      }
      };
      sendPostRequest(name, description, modelSchema);
      setName('');
      setDescription('');
      setFinal([]);
      setPreview(false);
  
      try {
        setValidate('correct');
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 1500);
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  const [inpval, setInpval] = useState({
    name: "",
    type: "",
    unique: "",
    required: "",
  });

  const [final, setFinal] = useState([]);
  const getdata = (e) => {
    const { value, name } = e.target;


    setInpval((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {

    if(inpval.name.length!==0 && inpval.type.length!==0 && inpval.required.length!==0 && inpval.unique.length!==0){
      const space = /\s/.test(inpval.name);
      const special=/^[a-zA-Z0-9_]+$/.test(inpval.name)
      if(space || !special){
        setOpen(true);
        setValidate('name_space')
        setTimeout(() => {
          setOpen(false);
        }, 1500);
      }
      else{
       
        const newRecords = { ...inpval, id: new Date().getTime().toString() };
        setFinal([...final, newRecords]);
        setPreview(true)
        setInpval({
          name: "",
          type: "",
          unique: "",
          required: "",
        })
      }
      
    }else{
      setValidate('empty');
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
      }
  };

  const handleDisableSubmit = () =>{
    setValidate('empty');
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
  }

  const handleDelete = (index, e) => {
    setFinal(final.filter((v, i) => i !== index));
    // console.log(final);
    // console.log("hiii " + final.length)
    if(final.length===1){setPreview(false)}
  };

  return (
    <>
      <Navbar />
      <div className="home">
        <Typography
          variant="body1"
          color="initial"
          className="create_head"
          sx={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          {" "}
          Create <span style={{ color: "#37BEC1" }}>quikDB</span>
        </Typography>
        <Grid container className="home">
          <Grid item xs={11} md={5} sx={{ margin: "2vh" }}>
            <Typography
              variant="body1"
              color="initial"
              align="left"
              className="typo-input"
              sx={{ fontSize: "1.3rem" }}
            >
              {" "}
              Database Name
            </Typography>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="text" className="input_create" required  style={{color:"gray"}} autoComplete="off"/>
          </Grid>
        </Grid>
        <Grid container className="home">
          <Grid item xs={11} md={5} sx={{ margin: "2vh" }}>
            <Typography
              variant="body1"
              color="initial"
              align="left"
              className="typo-input"
              sx={{ fontSize: "1.3rem" }}
            >
              {" "}
              Database Description
            </Typography>
            <textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              rows="4"
              cols="100"
              type="text"
              name="text"
              className="input_create"
              style={{color:"gray"}}
              required
            />
          </Grid>
        </Grid>
        <Typography
          variant="body1"
          color="initial"
          className="field-create"
          align="left"
          sx={{ fontSize: "1.3rem", marginTop: "3vh" }}
        >
          Fields
        </Typography>
        <Grid container className="home">
          <Grid item xs={11} md={3} sx={{}}>
            <input
            style={{color:"gray"}}
              type="text"
              value={inpval.name}
              onChange={getdata}
              name="name"
              className="input_field"
              autoComplete="off"
              placeholder="Name"
              required
            />
          </Grid>
          <Grid item xs={11} md={2} sx={{}}>
           
            <FormControl
              variant="standard"
              fullWidth
              className="input_field_1"
              sx={{ marginTop: "1vh", marginLeft: "1vw", padding: "8px"}}
            >
            
              <Select
                sx={{ color: "gray", fontWeight: "bold", marginLeft: "1vw"}}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                value={inpval.type}
                onChange={getdata}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                disableUnderline
                name="type"
              >
                <MenuItem value="" name="type"  sx={{backgroundColor:"#D3D3D3",marginTop:"-1vh"}}>
                  <Typography
                    variant="body1"
                    align="left"
                    color="initial"
                    sx={{
                      color: "gray",
                      fontWeight: "bold",
                      marginLeft: "1vw",
                     
                    }}
                  >
                    Select Type
                  </Typography>
                </MenuItem>
                <MenuItem name="type" value={"String"} sx={{backgroundColor:"#D3D3D3"}}>
                  String
                </MenuItem>
                <MenuItem name="type" value={"Number"} sx={{backgroundColor:"#D3D3D3"}}>
                  Number
                </MenuItem>
                <MenuItem name="type" value={"Boolean"} sx={{backgroundColor:"#D3D3D3"}}>
                  Boolean
                </MenuItem>
                <MenuItem name="type" value={"Date"} sx={{backgroundColor:"#D3D3D3"}}>
                  Date
                </MenuItem>
                <MenuItem name="type" value={"Buffer"} sx={{backgroundColor:"#D3D3D3"}}>
                  Buffer
                </MenuItem>
                <MenuItem name="type" value={"[String]"} sx={{backgroundColor:"#D3D3D3"}}>
                  Array(String)
                </MenuItem>
                <MenuItem name="type" value={"[Number]"} sx={{backgroundColor:"#D3D3D3"}}>
                  Array(Number)
                </MenuItem>
                <MenuItem name="type" value={"mongoose.Schema.Types.Mixed"} sx={{backgroundColor:"#D3D3D3"}}>
                  Mixed
                </MenuItem>
                <MenuItem name="type" value={"mongoose.Schema.Types.Decimal128"} sx={{backgroundColor:"#D3D3D3"}}>
                  Decimal128
                </MenuItem>
                <MenuItem name="type" value={"Map"} sx={{backgroundColor:"#D3D3D3",marginBottom:"-29vh"}}>
                  Map
                </MenuItem>
              </Select>
            
            </FormControl>

          </Grid>
          <Grid item xs={11} md={2}>
            <FormControl
              variant="standard"
              fullWidth
              className="input_field_2"
              sx={{ marginTop: "1vh", marginLeft: "1vw", padding: "8px" }}
            >
              <Select
                name="required"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                sx={{ color: "gray", fontWeight: "bold", marginLeft: "1vw" }}
                value={inpval.required}
                onChange={getdata}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                disableUnderline
              >
                <MenuItem value="" name="required" sx={{marginTop:"-1vh"}}>
                  <Typography
                    variant="body1"
                    align="left"
                    color="initial"
                    sx={{
                      color: "gray",
                      fontWeight: "bold",
                      marginLeft: "1vw",
                    }}
                  >
                    Required 
                  </Typography>
                </MenuItem>
                <MenuItem name="required" value={"false"} sx={{backgroundColor:"#D3D3D3"}}>
                  No
                </MenuItem>
                <MenuItem name="required" value={"true"} sx={{backgroundColor:"#D3D3D3",marginBottom:"-1vh"}}>
                  Yes
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={11} md={2} sx={{}}>
            <FormControl
              variant="standard"
              fullWidth
              className="input_field_3"
              sx={{ marginTop: "1vh", marginLeft: "1vw", padding: "8px" }}
            >
              <Select
                name="unique"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                sx={{ color: "gray", fontWeight: "bold", marginLeft: "1vw" }}
                value={inpval.unique}
                onChange={getdata}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                disableUnderline
              >
                <MenuItem value="" name="unique" sx={{marginTop:"-1vh"}}>
                  <Typography
                    variant="body1"
                    align="left"
                    color="initial"
                    sx={{
                      color: "gray",
                      fontWeight: "bold",
                      marginLeft: "1vw",
                    }}
                  >
                    Unique
                  </Typography>
                </MenuItem>
                <MenuItem name="unique" value={"false"} sx={{backgroundColor:"#d3d3d3"}}>
                  No
                </MenuItem>
                <MenuItem name="unique" value={"true"} sx={{marginBottom:"-1vh",backgroundColor:"#d3d3d3"}}>
                  Yes
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} md={1} sx={{}}>
            <button
              onClick={handleSubmit}
              className="input_field_4"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus" style={{ color: "#37BEC1" }}></i>
            </button>
            {validate==='name_space'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
                <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                  Name field cannot have a space or a special character<span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
              </Modal>}
          </Grid>
        </Grid>
        {
         
       preview?

        (<><Typography
          variant="body1"
          color="initial"
          className="field-create"
          align="left"
          sx={{ fontSize: "1.3rem", marginTop: "5vh" }}
        >
          Preview
        </Typography>
        <TableContainer
          className="table-mobile"
          sx={{
            marginLeft: "11vw",   //11
            marginTop: "3vh",
            width: "40vw",
            // marginBottom: "2vh",
          }}
        >
          <Table sx={{ width: "40vw" ,borderRadius:"15px !important"}} aria-label="customised table">
            <TableHead sx={{ backgroundColor: "#b3d9e6", fontColor: "white",borderRadius:"15px !important" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sx={{ paddingLeft: "6vw" }}>Type</TableCell>
                <TableCell align="center">Required</TableCell>
                <TableCell align="right">Unique</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {final.map((final, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {final.name}
                      </TableCell>
                      <TableCell sx={{ paddingLeft: "6vw" }}>
                        {final.type}
                      </TableCell>
                      <TableCell align="center">{final.required}</TableCell>
                      <TableCell align="right">{final.unique}</TableCell>
                      <TableCell align="right">
                        <button
                          onClick={(e) => {
                            handleDelete(index, e);
                          }}
                          className="input_field_6"
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className="fa-solid fa-trash"
                            style={{ color: "orange" }}
                          ></i>
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer></>):(" ")
      
         }
      {name.length===0||description.length===0||!preview?
      (
        <>
        <button
          className="btn-1-disabled"
          style={{ marginBottom: "5vh", marginTop:"12vh", marginRight: "55vw" }}
          onClick={handleDisableSubmit}
        >
          <i
            className="fa-solid fa-database"
            style={{ marginRight: "1vw" }}
          ></i>
          Generate APIs
        </button>
        </>
      ):(
        <>
        <button
          onClick={handleGenerate}
          className="btn-1"
          style={{ marginBottom: "5vh", marginTop:"6vh", marginRight: "53vw" }}  //53
        >
          <i
            className="fa-solid fa-database"
            style={{ marginRight: "1vw" }}
          ></i>
          Generate APIs
        </button>
        </>
      )
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
          Please fill all fields <span style={{marginRight:"1vw !important"}}></span>
          </Typography>
        </Box>
        </Modal>}

        {/* {request&&<Modal
          open={open}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <div className="loading" sx={{marginLeft:"13vw"}} >
            <svg width="64px" height="48px">
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
              <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
            </svg>
          </div>
          </Box>
        </Modal>} */}

        {validate==='correct'&&<Modal
          open={open}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
            <i className="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Success! <span style={{marginRight:"1vw !important"}}>Database Created</span>
            </Typography>
          </Box>
        </Modal>}

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

        {validate==='whitespace'&&<Modal
          open={open}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1rem"}}>
            <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Database name cannot contain a space or a special character!  <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>}

        <Grid sx={{ marginTop: "3vh" }}></Grid>
      </div>
    </>
  );
};

export default CreateDB;
