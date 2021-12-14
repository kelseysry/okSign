import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../store/profile";


function UserProfile() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch()
  let profileObj = useSelector((state) => state?.profile[userId])


// get current user
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

// get one profile
  useEffect(() => {
    dispatch(getProfile(userId));
  }, [dispatch, userId]);


  if (!user) {
    return null;
  }


  return (
    <>
    <div> in the userprofile component</div>
    <div>
      {profileObj?.goal}
    </div>
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
    </>
  );
}
export default UserProfile;
