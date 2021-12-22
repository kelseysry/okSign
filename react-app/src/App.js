import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
// import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Discover from './components/Discover';
import UserProfile from './components/UserProfile'
import ProfileForm from './components/ProfileForm';
import Conversations from './components/Conversations';
import { MatchesProvider } from './context/MatchesContext';
import Conversation from './components/Conversation';
import SearchResults from './components/SearchResults';
import NavBar from './components/Navigation/NavBar';
import EditQuestionForm from './components/EditQuestionForm';
import QuestionForm from './components/QuestionForm';
import QuestionPageAnswered from './components/QuestionPageAnswered';
import QuestionPage from './components/QuestionPage';
import MatchProfilePage from './components/MatchProfilePage';

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
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
        <ProtectedRoute path='/' exact={true} >
          <Discover />
        </ProtectedRoute>
        <ProtectedRoute path='/profiles/:userId' exact={true} >
          <UserProfile count={count} setCount ={setCount}  />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/editProfile' exact={true} >
          <EditUserProfileForm />
        </ProtectedRoute> */}
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
          <SearchResults />
        </ProtectedRoute>
        <ProtectedRoute path='/questions' exact={true} >
          <QuestionPage />
        </ProtectedRoute>
        <ProtectedRoute path='/matchProfile/:profileId' exact={true} >
          <MatchesProvider>
            <MatchProfilePage />
          </MatchesProvider>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
