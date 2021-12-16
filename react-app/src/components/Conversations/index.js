
import { useSelector, useDispatch } from "react-redux";
import { GetMatches } from "../../context/MatchesContext";
import MatchConversationTile from "../MatchConversationTile";
import { NavLink } from 'react-router-dom';


const Conversations = () => {
  const dispatch = useDispatch()
  const {matchedProfileIds} = GetMatches()

  // console.log("match profile ids from context", matchedProfileIds)


  return (
    <>
       {/* <NavLink to={`/conversations/${conversations?.id}`}>

        { matchedProfileIds.map((profile_id) =>  <MatchConversationTile profile_id={profile_id}/>)}

       </NavLink> */}

    </>
  )

}


export default Conversations
