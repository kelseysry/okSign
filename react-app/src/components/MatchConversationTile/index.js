
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getProfile } from "../../store/profile";
import './MatchConversationTile.css';

const MatchConversationTile = ({profile_id}) => {
  const dispatch = useDispatch()

  let profileObj = useSelector((state) => state?.profile[profile_id])
  // let profile = Object.values(profileObj)


  // get one profile
  useEffect(() => {
    dispatch(getProfile(profile_id));
  }, [dispatch, profile_id]);

  // console.log("profileObj", profileObj)
  // console.log("about me---", profileObj?.about_me)

  return (
    <>

        <div className="each_match_profile_container">
          <img className="match_profile_image" src={profileObj?.image_url1} alt="Photo"/>




        </div>

    </>
  )

}


export default MatchConversationTile
