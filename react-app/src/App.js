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
import QuestionPage from './components/QuestionPage';
import MatchProfilePage from './components/MatchProfilePage';
import { CalculatePercentProvider } from './context/CalculatePercent';
import DiscoverHoroscope from './components/DiscoverHoroscope/DiscoverHoroscopePage';
import SimpleMap from './components/Maps/test';
import Navigation from './components/ALoginFormModal/Navigation';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [count, setCount] = useState(0)

  const [isLoaded, setIsLoaded] = useState(false);

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
    <>
    <BrowserRouter>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignUpForm />
            <div>hello</div>
          </Route>
        </Switch>
      )}

    </BrowserRouter>
    </>
    // <BrowserRouter>
    //   <Navigation />
    //   <NavBar />
    //   <Switch>
    //     <Route path='/login' exact={true}>
    //       <LoginForm />
    //     </Route>
    //     <Route path='/sign-up' exact={true}>
    //       <SignUpForm />
    //     </Route>
    //     <ProtectedRoute path='/users' exact={true} >
    //       <UsersList/>
    //     </ProtectedRoute>

    //       <ProtectedRoute path='/' exact={true} >
    //         <Discover />
    //       </ProtectedRoute>
    //     <ProtectedRoute path='/profiles/:userId' exact={true} >
    //       <UserProfile count={count} setCount ={setCount}  />
    //     </ProtectedRoute>

    //     <ProtectedRoute path='/createProfile' exact={true} >
    //       <ProfileForm />
    //     </ProtectedRoute>
    //     <ProtectedRoute path='/conversations' exact={true} >
    //       <MatchesProvider>
    //         <Conversations />
    //       </MatchesProvider>
    //     </ProtectedRoute>
    //     <ProtectedRoute path='/conversations/:conversationId' exact={true} >
    //       <MatchesProvider>
    //         <Conversation />
    //       </MatchesProvider>
    //     </ProtectedRoute>
    //     <ProtectedRoute path='/search/:input' exact={true} >
    //       <CalculatePercentProvider>
    //         <SearchResults />
    //       </CalculatePercentProvider>
    //     </ProtectedRoute>
    //     <ProtectedRoute path='/questions' exact={true} >
    //       <QuestionPage />
    //     </ProtectedRoute>

    //     <ProtectedRoute path='/matchProfile/:profileId' exact={true} >
    //       <MatchesProvider>
    //         <MatchProfilePage />
    //       </MatchesProvider>
    //     </ProtectedRoute>

    //     <ProtectedRoute path='/test' exact={true} >
    //     </ProtectedRoute>
    //   </Switch>
    // </BrowserRouter>
  );
}

export default App;
