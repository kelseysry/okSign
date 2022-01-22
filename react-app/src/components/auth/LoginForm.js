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


  // console.log("errors", errors)


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

      <div className="login-input-spacer">
        {/* <label htmlFor='email'>Email</label> */}
        <input
          className="login-input"
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="login-input-spacer">
        {/* <label htmlFor='password'>Password</label> */}
        <input
          className="login-input"
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <div className="login-buttons">
          <button className="login-button" type='submit'>Login</button>
          <div className="or"></div>
          <button className="demo-button" onClick={handleDemoLogin} type="submit">Demo</button>
        </div>

      </div>
            {
              errors.length?
              <>
            <div className="errors-hr"></div>

            <ul className="error-signup">
                {errors.map((error, idx) =>
                <li key={idx}>{(error.split(':'))[1]}</li>
                )}
              </ul>
              </>
              : null
             }
    </form>
  );
};

export default LoginForm;
