import React, { useState, useEffect } from 'react';


function QuestionPage() {

  const [showEditQuestion, setShowEditQuestionForm] = useState(false)

  useEffect(() => {
    setShowEditQuestionForm(fakse)
  },[dispatch])

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

if (!user) {
  return null;
}


let content = null;
if(showEditProfileForm) {
  content = (
    <EditUserProfileForm count={count} setCount={setCount} currentProfile={currentProfile} hideForm={() => setShowEditProfileForm(false)}/>
  )
} else if (isLoaded){
  content = (
    <>
      {currentProfile ? <img className= 'user_profile_image' src={currentProfile[0]?.image_url1} alt="user_image"/> : null }
      <div className="user_profile_container">
        <UserProfileAboutSection currentUserProfile={currentProfile}/>
      </div>
    </>
  )
} else {
  return null
}

const handleDeleteProfile = (id) => {
  dispatch(deleteProfile(id));
  setCount(count + 1)
 history.push(`/profiles/${userId}`)
}

let content_edit_compiled;
content_edit_compiled = (
  <>
    {content}
    <button className="edit-profile-button" onClick={() => setShowEditProfileForm(true)}>Edit Profile <i className="fas fa-edit"></i></button>
    <button className="" onClick={() => {handleDeleteProfile(currentProfile[0]?.id)}}>Delete Profile <i className="fas fa-trash"></i></button>
  </>
)

return (
  <>

     {   currentProfile? content_edit_compiled :
       <div>
          <NavLink to={`/createProfile`}><div className=""></div>Create Profile <i className="fas fa-address-card"></i></NavLink>
        </div>}

  </>
);


}

export default QuestionPage
