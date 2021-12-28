import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import * as sessionActions from '../../store/session';


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();




  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    const email = 'demo@aol.com';
    const password = 'password';
    dispatch(sessionActions.login(
      email, password
    ))
  }


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className="login-modal" onSubmit={onLogin}>

      <div>
        <label htmlFor='email'>Email</label>
        <input
          className="login-input"
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          className="login-input"
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
        <button className="submit-button" onClick={handleDemoLogin} type="submit">Demo</button>

      </div>
      <div className="backend-errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
    </form>
  );
};

export default LoginForm;
