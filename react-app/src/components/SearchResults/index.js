import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { search } from "../../store/search"
import {useParams} from 'react-router-dom';

import SearchCarouselContainer from "./SearchCarouselContainer";
import './SearchCarousel.css'
import NoSearchResults from "./NoSearchResults";

const SearchResults = () => {
   //searchResults will give the profile.id of the user
    const searchResultsObj = useSelector((state)=>state.search)
    const dispatch = useDispatch();
    const {input} = useParams()
    const [isLoaded, setIsLoaded] = useState(false)

    const [inputExists, setInputExists] = useState('')

    useEffect( ()=>{
         dispatch(search(input))
        if (!isLoaded) {
          setIsLoaded(true)
        }
        if(input) {
          setInputExists(input)
        }

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


    if (!searchUserResults.length){
        return (

          <div className="ConversationHeaderContainer">
            <NoSearchResults input={input}/>
          </div>
        )
    }
    else {
        return (
          <>
            { isLoaded && (
              <div>

              <section className="SearchCarouselContainer">
                {

                  <SearchCarouselContainer inputExists={inputExists} input={input} searchUserResults={searchUserResults}/>
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
