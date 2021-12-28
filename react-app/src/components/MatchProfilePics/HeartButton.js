import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createLike, EditLike, getProfileUserLiked } from "../../store/like";


const HeartButton = ({profileLikedStatus, user_id_one, matchProfileObj}) => {
  const dispatch = useDispatch()

  const [count, setCount] = useState('')

  const [profileLiked, setProfileLiked] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/likes/user/${user_id_one}/matchProfile/${matchProfileObj[0]?.id}`);
      const responseData = await response.json();
      setProfileLiked(responseData);
    }
    fetchData();
  }, [count]);

  const handleLikeToggle = () => {
    // console.log("🤡enter handleLikeToggle")
    let user_id = user_id_one

    // console.log("profileLiked.liked🤡🤡", profileLiked.liked)
    let liked;
    let match_profile_id;

    // so we should check first if profile has been liked by the current user before
    // if has been liked, profileLiked.liked =="true"
    // then we want to handleDecreaseLike and edit the like to be false
    if(profileLiked?.liked === "true") {
      liked = "false"
      console.log("liked🤡🤡  minus", liked)
      match_profile_id = matchProfileObj[0]?.id
      let changeProfileLikeToFalse = {
        liked, user_id, match_profile_id
      }


      dispatch(EditLike(changeProfileLikeToFalse, user_id, match_profile_id))
      setCount(count +1)

    } else if(profileLiked?.liked === "false") {
      liked = "true"
      console.log("😂  plus", liked)
      match_profile_id = matchProfileObj[0]?.id
      let changeProfileLikeToTrue = {
        liked, user_id, match_profile_id
      }

      dispatch(EditLike(changeProfileLikeToTrue, user_id, match_profile_id))
      setCount(count +1)
    } else {
      // otherwise we should handleIncreaseLike
      liked = "true"
      console.log("first like🤡🤡", liked)
      match_profile_id = matchProfileObj[0]?.id
      let createFirstProfileLike = {
        liked, user_id, match_profile_id
      }
      dispatch(createLike(createFirstProfileLike, user_id, match_profile_id))
      setCount(count +1)
    }

  }


  return (

    <button
    className={(profileLikedStatus === "true"? " selected" : " blank")}
    onClick={()=>{handleLikeToggle()}}
    >
      <div className="heart-text">
        <i class="fas fa-heart"></i>
      </div>
    </button>

  )
}

export default HeartButton
