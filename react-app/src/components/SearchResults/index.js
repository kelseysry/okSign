import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { search } from "../../store/search"
import {useParams} from 'react-router-dom';
import SearchMatchTile from "../SearchMatchTile";
import { NavLink } from "react-router-dom";
import SearchCarouselContainer from "./SearchCarouselContainer";
import './SearchCarousel.css'

const SearchResults = () => {
   //searchResults will give the profile.id of the user
    const searchResultsObj = useSelector((state)=>state.search)
    const dispatch = useDispatch();
    const {input} = useParams()
    const [isLoaded, setIsLoaded] = useState(false)

    // console.log("searchUserResults---------", searchResultsObj.user)

    useEffect( ()=>{
         dispatch(search(input))
        if (!isLoaded) setIsLoaded(true);
    },[dispatch,input, isLoaded])

    let searchUserResultsObj;
    let searchUserResults

    if(searchResultsObj) {
      searchUserResultsObj = searchResultsObj?.user
    } else {
      return null
    }

    if(searchUserResultsObj) {
      searchUserResults = Object.values(searchUserResultsObj)
    } else {
      return null
    }

    // console.log("searchUserresults array", searchUserResults)


    if (!searchUserResults.length){
        return (

          <div className="ConversationHeaderContainer">
            <div className="ConversationHeader">No users found for "{input}"</div>
          </div>
        )
    }
    else {
        return (
          <>
            { isLoaded && (
              <div>
                {/* <div className="ConversationHeaderContainer">
                  <div className="ConversationHeader">Search Results For "{input}"</div>
                </div> */}

              <section className="SearchCarouselContainer">
                {

                  <SearchCarouselContainer input={input} searchUserResults={searchUserResults}/>
                  // searchUserResults?.map((matchProfile,idx) =>
                  // <div key={idx}>
                  //   <NavLink
                  //     to={`/matchProfile/${matchProfile.user_id}`}
                  //     >
                  //     <SearchMatchTile matchProfile={matchProfile}/>
                  //   </NavLink>
                  // </div>
                  // )
                  }
               </section>
              </div>
             )
            }
          </>
        )
    }
}

export default SearchResults;
