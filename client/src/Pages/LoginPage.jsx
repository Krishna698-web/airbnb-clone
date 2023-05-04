import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../Components/user-context";

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false);

  const {setUser} = useContext(UserContext);

  const submitHandler = async(e) =>{
    e.preventDefault();
    try{
      const {data} = await axios.post('/login', {email, password})
      setUser(data)
      alert('Login successfull')
      setRedirect(true);
    }catch(e){
      alert('Login failed')
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className="flex flex-col w-max m-auto">
      <div className="-mt-64">
        <h1 className="text-3xl mb-3 text-center">Login</h1>
        <form className="max-w-m mx-auto" onSubmit={submitHandler}>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <button className="login">Login</button>
          <div className="text-center text-gray-500">
            Don't have an account? <Link className='underline text-black' to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
