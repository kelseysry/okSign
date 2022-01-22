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
  // const [frontErrors, setFrontErrors] = useState([])
  const [validationErrors, setValidationErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const validationErrors = []

  //   if(username.length < 4) {
  //     validationErrors.push("username must be at least 4 characters")
  //   } else if (username.length >= 20) {
  //     validationErrors.push("username must be less than 20 characters")
  //   }

  //   if(password.length < 8 || password.length > 25) {
  //     validationErrors.push("password must be 8-25 characters")
  //   }
  //   if(repeatPassword !== password) {
  //     validationErrors.push("passwords must match!")
  //   }

  //   if(!isEmail(email)) {
  //     validationErrors.push("please provide a valid email")
  //   }

  //   setFrontErrors(validationErrors)

  // }, [username, password, repeatPassword, email])

  const validate = () => {

    const validationErrors = [];

    if(username.length < 4) {
      validationErrors.push("Username must be at least 4 characters")
    } else if (username.length >= 20) {
      validationErrors.push("Username must be less than 20 characters")
    }
    if(password.length < 8 || password.length > 25) {
      validationErrors.push("Password must be 8-25 characters")
    }
    if(repeatPassword !== password) {
      validationErrors.push("Passwords must match!")
    }

    if(!isEmail(email)) {
      validationErrors.push("Please provide a valid email")
    }
    return validationErrors
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name,username, email, password));
      if (data) {
        setErrors(data)
        const frontErrors = validate();
        if (frontErrors.length > 0) setValidationErrors(frontErrors);

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

  console.log("validationErrors",validationErrors)

  return (
    <div className="">
    <form className="sign-up-modal" onSubmit={onSignUp}>
      <div className="sign-up-spacer">
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

      {validationErrors.length || errors.length?
      <>
        <div className="errors-hr"></div>
        <ul className="error-signup">
            {validationErrors.map((error) => <li key={error}>{error}</li>)}
            {errors.map((error, idx) =>
            <li key={idx}>{(error.split(':'))[1]}</li>
            )}
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
