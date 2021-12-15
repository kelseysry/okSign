import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom';
import ProfileForm from '../ProfileForm';

// ********************************************************************
// no longer using this component since can
// hide create profile form if alrdy exist
// ********************************************************************

function HideCreateProfileForm() {
  const dispatch = useDispatch()
  const [showChangeNow, setshowChangeNow] = useState(false)
  const [showCreateProfileForm, setShowCreateProfileForm] = useState(false)
  const [hideCreateProfileButton, setHideCreateProfileButton] = useState(false)

  const sessionUser = useSelector((state) => state.session.user);
  const user_id = sessionUser?.id

    // hide create a profile button
    useEffect(() => {
      setHideCreateProfileButton(false)
  },[dispatch])


    //trying to hide profile form
    useEffect(() => {
      setShowCreateProfileForm(false)
    },[dispatch])

    let createProfileButton;
    if(user_id) {
      createProfileButton = (
        !hideCreateProfileButton &&
          <button className=""
          onClick={() => {setShowCreateProfileForm(true);  setHideCreateProfileButton(true)
          }}>
          <i className="fas fa-star"></i>&nbsp;&nbsp;Create Profile &nbsp;&nbsp;<i className="fas fa-star"></i></button>
      )
    } else {
      <div> hi</div>
      // return <AllReviews product={product}/>
    }


    let profileFormRender = null;
    if(showCreateProfileForm) {
      profileFormRender = (
        <>
          <ProfileForm hideForm={() => setShowCreateProfileForm(false)} hideButton={() => setHideCreateProfileButton(false)}/>
        </>
      )
    }




    return(
      <>
      <div>"in hide create profile form" </div>
        <div className="">
          {createProfileButton}
          {profileFormRender}
          <div>
          {/* {reviewContent}
          <AllReviews product={product}/> */}
          </div>
        </div>
        </>
    )

}

export default HideCreateProfileForm
