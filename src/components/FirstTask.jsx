import React, { useEffect } from 'react';
import {
  MenuItem,
  Button,
  CardContent,
  CardActions,
  Collapse,
  Card,
  TextField,
  Select,
  InputLabel,
  FormHelperText,
  FormControl,
} from '@material-ui/core';

import Axios from 'axios';
import moment from 'moment';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useDispatch, useSelector } from 'react-redux';


const DATA_URL='https://servergrid.herokuapp.com/';
const SHOW_LIST = ["Hamilton","Mika","K's choice","Amanda Palmer"];

export default function FirestTask(){
  const dispatch = useDispatch();
  const [columnDefs,setColumnDefs] = React.useState();
  const [rowData,setRowData] = React.useState();
  const [gridApi,setGridApi] = React.useState();
  const [openAddUser,setOpenAddUser] = React.useState(false);
  const [userData,setUserData] = React.useState({});
  const [showSelect , setShowSelect] = React.useState('');
  const [showTicket ,setShowTicket] = React.useState('');
  const showTicketsList = useSelector(state=>state.showTickets)
  
  const [defaultColDef] = React.useState({
    sortable: true,
    flex:1
  })

  const handelInputChange = e =>{
    e.persist();
    if(e.target.name==="tickets"){
      setUserData(userData=>({...userData,[e.target.name]:Number(e.target.value)}))
    }
    setUserData(userData=>({...userData,[e.target.name]:e.target.value}))
  }

  const handleShowChange = e=>{
    e.persist();
    setShowSelect(e.target.value)
    setShowTicket(showTicketsList[e.target.value])
  }

  useEffect(()=>{
    Axios.get(DATA_URL)
      .then((res)=>{
        setRowData(res.data)
      })
      .catch((err)=>{
        console.log(err)
    })

    const columnCountData=[
      { field: 'name' ,sortable: true},
      { field: 'date' ,sortable: true},
      { field: 'show' ,sortable: true},
      { field: 'tickets' ,unSortIcon: true},
    ];
    setColumnDefs(columnCountData);
  },[])

  const handleExpandClick = () => {
    setOpenAddUser(!openAddUser);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const addItems = () => {
    let newData = {
      name: userData.name||"no data",
      date: moment().format('DD/MM/YYYY'),
      show: showSelect,
      tickets: userData.tickets||"no data",
    };

    Axios.post(DATA_URL+"postUserData",newData)
      .then((res)=>{
        console.log(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })

    gridApi.applyTransaction({add:[newData]});
    
    if(newData.tickets!=='no data'){
      const changeTickets= {
        name:newData.show,
        tickets:newData.tickets
      }
      console.log("firest step",changeTickets)
      dispatch({
        type:'UPDATE_TICKET',
        payload:changeTickets
      })
    }
  };

  const onRemoveSelected = () => {
    const rowData=[];
    gridApi.applyTransaction({ remove: gridApi.getSelectedRows() });
    
    gridApi.forEachNode(function(node) {
      rowData.push(node.data);
    });

    Axios.post(DATA_URL+"removeUserData",rowData)
      .then((res)=>{
      })
      .catch((err)=>{
        console.log(err)
      })
  };

  const selsctShow = SHOW_LIST.map((show,i)=>{
    return <MenuItem key={i} value={show}>{show}</MenuItem >
  })

  return(
    <div style={{ width: 700, height: '100%' }}>
        <div
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ marginBottom: '4px' }}>
            <Card >
              <CardActions disableSpacing>
                <Button onClick={handleExpandClick}>Add Items</Button>
                <Button onClick={() => onRemoveSelected()}>Remove Selected</Button>
              </CardActions>
              <Collapse in={openAddUser} timeout="auto" unmountOnExit>
                <CardContent style={{display:'flex',justifyContent:'space-between'}}>
                  <TextField 
                    autoFocus={true} 
                    name="name"
                    label="Name" 
                    onChange={handelInputChange}
                    value={userData.name||''}
                  />
                  <FormControl>
                    <InputLabel id="demo-simple-select-required-label">Select Show</InputLabel>
                    <Select
                      style = {{width:165}}
                      value={showSelect}
                      onChange={handleShowChange}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {selsctShow} 
                    </Select>
                    <FormHelperText>{showTicket!==''?showTicket:''}</FormHelperText>
                  </FormControl>
                  <TextField 
                    name="tickets"
                    label="Tickets" 
                    type="number"
                    InputProps={{
                      inputProps: { 
                        min: showTicket!==''?1:0,
                        max: showTicket!==''?showTicket:0,
                        onKeyDown: (event) => {
                          event.preventDefault();
                       },
                      }
                    }}
                    value={userData.tickets||''}
                    onChange={handelInputChange}
                  />
                  <Button onClick={() => addItems()}>Add</Button>
                </CardContent>
              </Collapse>
            </Card>
          </div>
          <div style={{ flexGrow: '1' }}>
            <div
              id="myGrid"
              style={{
                height: 400,
                width: "100%",
              }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection='multiple'
                animateRows={true}
                onGridReady={onGridReady}
              />
            </div>
          </div>
        </div>
      </div>
  )
}


