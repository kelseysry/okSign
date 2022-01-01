import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {search} from '../../store/search';
import {useHistory} from "react-router";
import './SearchForm.css'
import { closeNav } from '../../store/navigation';



const SearchForm = ({hideModal}) => {

const dispatch = useDispatch();
const history = useHistory();

const [searchKeyWord,setSearchKeyWord] = useState('')

const handleKeyPress = async (e) =>{
    if (e.charCode === 13) {
        e.preventDefault();
        let resultFromSearch = await dispatch(search(searchKeyWord));
        if (resultFromSearch) {
            hideModal()
            dispatch(closeNav())
            history.push(`/search/${searchKeyWord}`);
            setSearchKeyWord('');
        }

    }
}



return (
    <form >
        <input className="searchForm"
            type="text"
            placeholder="men                                   🔍"
            value={searchKeyWord}
            onChange={(e)=>setSearchKeyWord(e.target.value)}
            onKeyPress={(e)=> handleKeyPress(e)}


            />
    </form>
)
}

export default SearchForm
