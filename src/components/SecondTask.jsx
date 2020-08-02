import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


export default function SecendTask(props){
  const { rowData } = props
  const [columnDefs,setColumnDefs] = React.useState();
  const [gridApi,setGridApi] = React.useState();

  
  const [defaultColDef] = React.useState({
    sortable: true,
    flex:1
  })


  useEffect(()=>{
    const columnCountData=[
      { field: 'name' ,sortable: true},
      { field: 'maxTickets' ,sortable: true},
      { field: 'ticketsSold' ,sortable: true},
    ];
    setColumnDefs(columnCountData);
  },[])


  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  console.log(rowData)

  return(
    <div style={{ width: 700, height: '100%' }}>
        <div
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
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


