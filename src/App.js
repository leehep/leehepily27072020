import React from 'react';
import './App.css';
import FirstTask from './components/FirstTask';
import SecendTask from './components/SecondTask.jsx'
import { useSelector } from 'react-redux';

function App() {
  const showData = useSelector(state=>state.showTickets)
  return (
    <div >
      <FirstTask/>
      <SecendTask rowData={showData}/>
    </div>
  );
}

export default App;
