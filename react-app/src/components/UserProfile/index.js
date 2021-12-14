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
    <div className="user_profile_container">

      <div>
        about me : {profileObj?.about_me}
      </div>
      <div>
        goal : {profileObj?.goal}
      </div>
      <div>
        talent : {profileObj?.goal}
      </div>
      <div>
        my traits : {profileObj?.my_traits}
      </div>
      <div>
        needs : {profileObj?.needs}
      </div>
      <div>
        hobbies : {profileObj?.hobbies}
      </div>
      <div>
        moments !! need to seed this data : {profileObj?.moments}
      </div>
      <div>
        secrets : {profileObj?.secrets}
      </div>
      <div>
        looking for : {profileObj?.looking_for}
      </div>
      <div>
        user audio : {profileObj?.user_audio}
      </div>
      <div>
        gender : {profileObj?.gender_id}
      </div>
      <div>
        number of likes: {profileObj?.number_likes}
      </div>
      <div>
        orientation : {profileObj?.orientation_id}
      </div>
      <div>
        pronouns: {profileObj?.number_likes}
      </div>

      {/* <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul> */}

    </div>



    </>
  );
}
export default UserProfile;
