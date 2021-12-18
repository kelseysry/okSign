import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { search } from "../../store/search"
import {useParams} from 'react-router-dom';

const SearchResults = () => {
   //searchResults will give the profile.id of the user
    const searchResults = useSelector((state)=>state.search)
    const dispatch = useDispatch();

    const {input} = useParams()

    useEffect(()=>{
        dispatch(search(input))
    },[dispatch,input])

    console.log("searchResults", searchResults)

    //on first load the state will be empty
    if(!searchResults) {
       return null
    }
    const usersSearch = Object.values(searchResults)


    if (!usersSearch.length){
        return (
            <h2>No users found for "{input}"</h2>
        )
    }
    else {
        return (
            <div>
                <div className="">
                    Search Results For "{input}"
                </div>

            </div>
        )
    }
}

export default SearchResults;
