import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { getQuestions } from "../../store/question";
import NoMatches from "../NoMatches";
import DiscoverHoroscopeProfile from "./DiscoverHoroscopeProfile";

const DiscoverHoroscope = () => {
  // const dispatch = useDispatch()

  const [profiles, setProfiles] = useState([]);

  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id
  // console.log("user_id", user_id)


  // console.log("qprofiless🤠🤠🤠🤠🤠🤠🤠🤠🤠🤠-------------", profiles)


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/profiles/');
      const responseData = await response.json();
      setProfiles(responseData.profiles);
    }
    fetchData();
  }, []);


  let allProfilesExcludeCurrent = profiles.filter(function(profile) {
    return profile.user_id !== user_id
  })

  console.log("allProfilesExcludeCurrent", allProfilesExcludeCurrent)

  let content;

  if (profiles?.length) {
    content = (
      <div className="">

        {allProfilesExcludeCurrent?.map((profile, idx) =>
          <div key={idx}>
            <NavLink
              to={`/matchProfile/${profile.user_id}`} // userIdPercentObj[0] is the user.id
              >
              {/* <MatchProfile userIdPercentObj={userIdPercentObj}/> */}
              <DiscoverHoroscopeProfile profile={profile}/>
            </NavLink>
          </div>
        )}
      </div>
    )
  }     else {
    content = (
      <div className="center-no-matches-component">
        <NoMatches user_id={user_id} />
      </div>
    )
  }


  return (
    <>
    <div className="ConversationHeaderContainer">
      <div className="ConversationHeader">Discover</div>
    </div>

    <div className="DiscoverContent">

      {content}
    </div>
    </>
  )

}


export default DiscoverHoroscope
