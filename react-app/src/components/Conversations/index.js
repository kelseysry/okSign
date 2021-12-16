
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getProfile } from "../../store/profile";

const Conversations = ({profile_id}) => {
  const dispatch = useDispatch()
  console.log("match profile id", +profile_id)

  let profileObj = useSelector((state) => state?.profile[profile_id])
  // let profile = Object.values(profileObj)


  // get one profile
  useEffect(() => {
    dispatch(getProfile(profile_id));
  }, [dispatch, profile_id]);

  console.log("profileObj", profileObj)
  console.log("about me---", profileObj?.about_me)

  return (
    <>
      <div>in conversations component</div>

      <div>
        <img className="match_profile_image" src={profileObj?.image_url1} alt="Photo"/>
        {profileObj?.goal}
      </div>

    </>
  )

}


export default Conversations
