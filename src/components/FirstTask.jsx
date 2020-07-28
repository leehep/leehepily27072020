import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function FirestTask(){
  const [columnDefs,setColumnDefs] = React.useState();
  const [rowData,setRowData] = React.useState();
  const [gridApi,setGridApi] = React.useState();
  const [openAddUser,setOpenAddUser] = React.useState(false);
  const [userData,setUserData] = React.useState({});

  const handelInputChange = e =>{
    e.persist();
    setUserData(userData=>({...userData,[e.target.name]:e.target.value}))
  }

  const createNewRowData=()=>{

    var newData = {
      name: userData.name||"no data",
      date: '27/8/2020',
      show: userData.show||"no data",
      tickets: userData.tickets||"no data",
    };

    return newData;
  }

  useEffect(()=>{
    const columnCountData=[
      { field: 'name' },
      { field: 'date' },
      { field: 'show' },
      { field: 'tickets' },
    ];

    const rowData = [
      {
        name: 'Lilo',
        date: '27/8/2020',
        show: 'meow',
        tickets: 20,
      },
    ];
    
    setRowData(rowData);
    setColumnDefs(columnCountData);
  },[])

  const handleExpandClick = () => {
    setOpenAddUser(!openAddUser);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const addItems = () => {
    gridApi.applyTransaction({add:[createNewRowData()]});
  };

  const onRemoveSelected = () => {
    gridApi.applyTransaction({ remove: gridApi.getSelectedRows() });
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
                <CardContent>
                  <TextField 
                    autoFocus={true} 
                    id="standard-basic" 
                    name="name"
                    label="Name" 
                    style={{marginRight:10}}
                    onChange={handelInputChange}
                    value={userData.name||''}
                  />
                  <TextField 
                    id="standard-basic" 
                    name="show"
                    label="Show Name" 
                    style={{marginRight:10}}
                    onChange={handelInputChange}
                    value={userData.show||''}
                  />
                  <TextField 
                    id="standard-basic" 
                    name="tickets"
                    label="Tickets" 
                    type="number"
                    style={{marginRight:10}}
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
                defaultColDef={'flex: 1'}
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


