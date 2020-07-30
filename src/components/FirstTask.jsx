import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import moment from 'moment';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const DATA_URL='https://servergrid.herokuapp.com/'

export default function FirestTask(){
  const [columnDefs,setColumnDefs] = React.useState();
  const [rowData,setRowData] = React.useState();
  const [gridApi,setGridApi] = React.useState();
  const [openAddUser,setOpenAddUser] = React.useState(false);
  const [userData,setUserData] = React.useState({});
  
  const [defaultColDef] = React.useState({
    sortable: true,
    flex:1
  })

  const handelInputChange = e =>{
    e.persist();
    setUserData(userData=>({...userData,[e.target.name]:e.target.value}))
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
      show: userData.show||"no data",
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
                  <TextField 
                    name="show"
                    label="Show Name" 
                    onChange={handelInputChange}
                    value={userData.show||''}
                  />
                  <TextField 
                    name="tickets"
                    label="Tickets" 
                    type="number"
                    InputProps={{
                      inputProps: { 
                        min: 1,
                        max: 10
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


