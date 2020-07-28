import { useState } from 'react';

const useForm =()=>{
  const [state,useState]=useState({});

  const handleChange = e =>{
    useState(state=>({...state,[e.target.name]:e.target.value}))
  }
  return [state];
} 

export default useForm;