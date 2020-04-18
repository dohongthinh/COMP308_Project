import React, { useState } from 'react';
import axios from 'axios';

const Emergency= () => {

  const [registeruser, setRegisteruser] = useState( {firstName: '', lastName: '', email: '', password: '', confirmpassword: ''})



  const handleChange = (event) => {
    setRegisteruser({...registeruser, [event.target.name]: event.target.value})
}

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/register', registeruser)
      .then(function (response) {
          console.log(response)
          localStorage.setItem('token', response.headers['x-auth-token'])
          window.location="/";
      })
      .catch(function (error) {
          console.log(error)
      }) 
    }

  return (

    <div>
  
      <form className='white' onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={registeruser.firstName} onChange={handleChange} required />
      <input type="text" name="lastName" value={registeruser.lastName} onChange={handleChange} required />
      <input type="text" name="email" value={registeruser.email} onChange={handleChange} required />
      <input type="text" name="password" value={registeruser.password} onChange={handleChange} required />
      <input type="text" name="confirmpassword" value={registeruser.confirmpassword} onChange={handleChange} required />

      <div className="input-field"> 
       <button className="btn blue darken-3" type="submit">Sign Up</button>
       </div>
      </form>
      
  </div> 
  )
}


export default Emergency;