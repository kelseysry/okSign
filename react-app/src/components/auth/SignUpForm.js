import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import isEmail from 'validator/es/lib/isEmail';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [frontErrors, setFrontErrors] = useState([])

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = []

    if(username.length < 4) {
      validationErrors.push("username must be at least 4 characters")
    } else if (username.length >= 20) {
      validationErrors.push("username must be less than 20 characters")
    }

    if(password.length < 8 || password.length > 25) {
      validationErrors.push("password must be 8-25 characters")
    }
    if(repeatPassword !== password) {
      validationErrors.push("passwords must match!")
    }

    if(!isEmail(email)) {
      validationErrors.push("please provide a valid email")
    }

    setFrontErrors(validationErrors)

  }, [username, password, repeatPassword, email])



  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name,username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="">

    <form className="sign-up-modal" onSubmit={onSignUp}>

      <div className="sign-up-spacer">
        {/* <label>First Name</label> */}
        <input
          className="login-input"
          type='text'
          name='first_name'
          placeholder='First Name'
          onChange={updateFirstName}
          value={first_name}
        ></input>
      </div>
      <div className="sign-up-spacer">
        {/* <label>Last Name</label> */}
        <input
          className="login-input"
          type='text'
          name='last_name'
          placeholder='Last Name'
          onChange={updateLastName}
          value={last_name}
        ></input>
      </div>
      <div className="sign-up-spacer">
        {/* <label>User Name</label> */}
        <input
          className="login-input"
          type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="sign-up-spacer">
        {/* <label>Email</label> */}
        <input
         className="login-input"
          type='text'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="sign-up-spacer">
        {/* <label>Password</label> */}
        <input
        className="login-input"
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="sign-up-spacer">
        {/* <label>Repeat Password</label> */}
        <input
        className="login-input"
          type='password'
          name='repeat_password'
          placeholder='Repeated Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      {frontErrors.length?
      <>
        <div className="errors-hr"></div>
        <ul className="error-signup">
          {frontErrors.map((error) => <li key={error}>{error}</li>)}
        </ul>
      </>
      : null
      }
      {
        errors.length?
        <>
      <div className="errors-hr"></div>

      <ul className="error-signup">
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        </>
        : null
      }

      <div className="center-signup-button">
        <button className="login-button" type='submit'>Sign Up</button>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;
