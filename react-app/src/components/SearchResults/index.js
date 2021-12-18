import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { search } from "../../store/search"
import {useParams} from 'react-router-dom';
import SearchMatchTile from "../SearchMatchTile";

const SearchResults = () => {
   //searchResults will give the profile.id of the user
    const searchResultsObj = useSelector((state)=>state.search)
    const dispatch = useDispatch();
    const {input} = useParams()
    const [isLoaded, setIsLoaded] = useState(false)

    console.log("searchUserResults---------", searchResultsObj.user)



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

    console.log("searchUserresults array", searchUserResults)


    if (!searchUserResults.length){
        return (
            <h2>No users found for "{input}"</h2>
        )
    }
    else {
        return (
          <>

    {  isLoaded && (
      <div>
                <div className="">
                    Search Results For "{input}"
                </div>

                  {
                    searchUserResults?.map((matchProfileId) => <SearchMatchTile matchProfileId={matchProfileId}/>)
                  }

            </div>)

            }

          </>
        )
    }
}

export default SearchResults;
