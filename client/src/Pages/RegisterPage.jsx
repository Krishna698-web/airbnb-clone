import React, {useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submitHandler (e) {
    e.preventDefault();
    try{
      await axios.post('/register', {
          name,
          email,
          password,
      });
      alert('Registration complete, proceed to log in');
    }catch(e){
      alert('Registration failed, mail already exists')
    }

    // setName('')
    // setEmail('')
    // setPassword('')
  };

  return (
    <div className="flex flex-col w-max m-auto">
      <div className="-mt-64">
        <h1 className="text-3xl mb-3 text-center">Registor</h1>
        <form className="max-w-m mx-auto" onSubmit={submitHandler}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Krishna" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <button type="submit" className="login">
            Register
          </button>
          <div className="text-center text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
