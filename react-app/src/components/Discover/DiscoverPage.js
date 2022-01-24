
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import MatchProfile from "../MatchProfile";
import NoMatches from "../NoMatches";
import './Discover.css'
import DiscoverHoroscope from "../DiscoverHoroscope/DiscoverHoroscopePage";
import { useBackgroundContent } from "../../context/BackgroundContext";
import pictures from "../../data/pictures";
import './DiscoverSlide.css'
import '../MatchProfile/DiscoverPics.css'
import './Step.css'
import Discover from ".";
import { useDiscoverContent } from "../../context/DiscoverContentContext";
import horoscopePics from "../../data/horoscopePics";
import DiscoverSteps from "./DiscoverSteps";
const DiscoverPage = () => {

  const [discoverContent, setDiscoverContent] = useState('QuestionMatch')

  // const {discoverContent, setDiscoverContent} = useDiscoverContent()

  console.log("discoverContent",discoverContent )

  return (
    <>
    {/* <DiscoverSteps /> */}
      <Discover />
    </>

  )
}


export default DiscoverPage
