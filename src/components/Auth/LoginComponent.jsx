import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { setUser } from '../../actions'

export default function LoginComponent() {

    const dispatch = useDispatch();


    const [form,setForm] = useState('Login')

    const [user,setUserLogin] = useState({
        username:'',
        password:''
    })

    const handleLoginUser = (e) => {
        setUserLogin(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleLogin = e => {
        e.preventDefault();

        fetch('http://localhost:3001/users/login', {
            method:'POST',
            credentials: 'include',
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username:user.username, password:user.password })
        })
        .then(async response => {
            if(!response.ok){
                if(response.status === 400){
                    alert('Incorect Fields')
                } else if (response.status === 401) {
                    alert('invalid combination')
                } else {
                    console.log('error....')
                }
            } else {
                console.log(response);
                const data = await response.json()
                dispatch(setUser(data));
            }
        })
    }


  return (
    <div className="loginFormContainer">
        {
         form === 'Login' ?
         <>
         <h1>Login</h1>
         <div>
            <label>Username</label>
            <input name="username" onChange={(e) => handleLoginUser(e)} defaultValue={user.username} />
        </div>
        <div>
            <label>Password</label>
            <input name="password" type="password" onChange={(e) => handleLoginUser(e)} defaultValue={user.password}/>
        </div>
        <div>
            <button onClick={(e) => handleLogin(e)}>Log In</button>
            <button onClick={() => setForm('Register')}>Create new account</button>
        </div>
         </> 
         : 
         <>
         <h1>Register New Account</h1>
         <div>
            <label>Username</label>
            <input />
        </div>
        <div>
            <label>Password</label>
            <input />
        </div>
        <div>
            <button>Register</button>
            <button onClick={() => setForm('Login')}>Already have an account ?</button>
        </div>
         </>
         }
        
    </div>
  )
}
