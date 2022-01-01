import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import Discover from './components/Discover';
import UserProfile from './components/UserProfile'
import ProfileForm from './components/ProfileForm';
import Conversations from './components/Conversations';
import { MatchesProvider } from './context/MatchesContext';
import Conversation from './components/Conversation';
import SearchResults from './components/SearchResults';
import NavBar from './components/Navigation/NavBar';
import QuestionPage from './components/QuestionPage';
import MatchProfilePage from './components/MatchProfilePage';
import { CalculatePercentProvider } from './context/CalculatePercent';
import LoginFormPage from './components/auth/LoginFormPage';
import HitErrorPage from './components/PageNotFound/HitErrorPage';
import Background from './components/Background/Background';
import AboutLinks from './components/AboutLinks/AboutLink';
import Test from './components/Test/test';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    // <BrowserRouter>
    <>
    <Test /> 
      {/* <NavBar/> */}
      {/* <Background />  */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginFormPage />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <Discover />
        </ProtectedRoute>

        <ProtectedRoute path='/section/:idx' exact={true} >
          <Discover />
        </ProtectedRoute>

        <ProtectedRoute path='/profiles/:userId' exact={true} >
          <UserProfile count={count} setCount ={setCount}  />
        </ProtectedRoute>
        <ProtectedRoute path='/createProfile' exact={true} >
          <ProfileForm />
        </ProtectedRoute>
        <ProtectedRoute path='/conversations' exact={true} >
          <MatchesProvider>
            <Conversations />
          </MatchesProvider>
        </ProtectedRoute>
        <ProtectedRoute path='/conversations/:conversationId' exact={true} >
          <MatchesProvider>
            <Conversation />
          </MatchesProvider>
        </ProtectedRoute>
        <ProtectedRoute path='/search/:input' exact={true} >
          <CalculatePercentProvider>
            <SearchResults />
          </CalculatePercentProvider>
        </ProtectedRoute>
        <ProtectedRoute path='/questions' exact={true} >
          <QuestionPage />
        </ProtectedRoute>
        <ProtectedRoute path='/matchProfile/:profileId' exact={true} >
          <MatchesProvider>
            <MatchProfilePage />
          </MatchesProvider>
        </ProtectedRoute>

        <ProtectedRoute path='/test' exact={true} >
          <Test />
        </ProtectedRoute>
        <Route>
          <HitErrorPage />
        </Route>
      </Switch>
      {/* <AboutLinks />  */}
    </>
  );
}

export default App;
