import React, { ChangeEvent, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSocketContext, useUserContext } from "@hooks"

import "./UserForm.scss"
function UserForm() {

  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const userCtx = useUserContext()
  const socket = useSocketContext()

  const handleNaming = () => {
    axios.post("/api/user-naming", {
      name
    })
    .then(({ data } : AxiosResponse) => {
      if(data.status === 'error'){
        setError(data.message)
        throw new Error("fetch error")
      } else {
        socket?.emit('user-naming', { user : data.user })
        userCtx?.setUser(data.user)
      }
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='form'>
      <h3 className='form__title'>Type your name</h3>
      <input 
        type="text" 
        className='form__input' 
        onChange={(e: ChangeEvent<HTMLInputElement> ) => setName(e.target.value)} 
      />
      <span>{error}</span>
      <button 
        className='form__button'
        onClick={handleNaming}
      >Go</button>      
    </div>
  );
}

export default UserForm;