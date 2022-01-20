import horoscopePics from "../../data/horoscopePics"
import "./MatchProfileHoroscope.css"
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getHoroscopeMatchPercent } from "../DiscoverHoroscope/getHoroScopeMatchPercent";
import { horoscopeContent } from "../DiscoverHoroscope/getHoroScopeMatchPercent";

const MatchProfileHoroscope = ({matchProfile}) => {

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  const [currentUserProfile, setCurrentUserProfile] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${user_id}`);
      const responseData = await response.json();
      setCurrentUserProfile(responseData);
    }
    fetchData();
  }, []);

  let currentUserHoroscopeId = currentUserProfile?.oneProfile[0]?.horoscope_id

console.log("horoscopeContent?.length",horoscopeContent?.length < 500 )

  return (
    <>
      <div className="matchContainerHeader">Horoscope Compatibility</div>

      <section className="MatchHoroscopeInnerContainer">
        {/* <p className="matchHoroscopeContent">
        <span className="bench">
          <img src={horoscopePics.collection[12].imageUrl} />
        </span>
          {horoscopeContent}

        </p> */}

        <p>
        <img className="bench" src={horoscopePics.collection[12].imageUrl} />
        <section className={horoscopeContent?.length < 500 ? 'contentHoroscopeFiller' : 'noContentHoroscopeFiller'}>
        <div>&nbsp;&nbsp;</div>
        <div>&nbsp;&nbsp;</div>
        <div>&nbsp;&nbsp;</div>
        </section>
        {horoscopeContent}
        </p>



        <div className="matchHoroscopeSign">
          <img src={horoscopePics.collection[matchProfile.horoscope_id - 1 ]?.sign} />
        </div>
        <div className="currentUserHoroscopeSign">
          <img src={horoscopePics.collection[currentUserHoroscopeId - 1 ]?.sign} />
        </div>
      </section>

{/* <p>
<img className="bench" src={horoscopePics.collection[currentUserHoroscopeId - 1 ]?.sign} />
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue erosLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velitLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velitLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
</p> */}



            {getHoroscopeMatchPercent(matchProfile.horoscope_id, currentUserHoroscopeId)}
    </>

  )


}

export default MatchProfileHoroscope
