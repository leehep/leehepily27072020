const initialState = {  
  showTickets:[
    {
      name:"Hamilton",
      maxTickets:200,
      ticketsSold:0
    },
    {
      name:"Mika",
      maxTickets:150,
      ticketsSold:0
    },
    {
      name:"K's choice",
      maxTickets:100,
      ticketsSold:0
    },
    {
      name:"Amanda Palmer",
      maxTickets:200,
      ticketsSold:0
    },
  ]
};

export default function reducer (state=initialState,action:any){
  switch(action.type){
    case"UPDATE_TICKET":
      setTicketsNumber(action.payload.name,action.payload.tickets);
      console.log(state)
      return state
    default:
      return state
  }
}

const setTicketsNumber =(name,tickets)=>{
  const i = initialState.showTickets.findIndex(obj=>obj.name===name);
  initialState.showTickets[i].ticketsSold=Number(initialState.showTickets[i].ticketsSold + tickets);
}