import React, { useState } from 'react';

function SignUp() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [photo, setphoto] = useState('');
  const [username, setusername] = useState('');
  const submitHandeller = (e) => {
    e.target.preventDefault();
    const url = 'http://http://[::1]:3000/api/signup';
    const data = {
      name,
      email,
      password,
      photo,
      username,
    };
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(data),
    };

    fetch(url, options).then((response) => {
      console.log(response.status);
    });
  };

  return (
    <form>
      <label htmlFor="name">
        name
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </label>

      <label htmlFor="email">
        email
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
      </label>
      <label htmlFor="password">
        password
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
      </label>

      <label htmlFor="photo">
        photo
        <input
          type="file"
          name="photo"
          onChange={(e) => {
            setphoto(e.target.value);
          }}
        />
      </label>

      <label htmlFor="username">
        username
        <input
          type="text"
          name="username"
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
      </label>

      <button type="submit" onSubmit={submitHandeller}>
        Sign up
      </button>
    </form>
  );
}

export default SignUp;
