
// matchProfile is the entire profile obj for one match
const SearchMatchTile = ({matchProfile}) => {

  return (
    <>
      <img className="match_profile_image" src={matchProfile?.image_url1} alt="match_image"/>
    </>
  )
}

export default SearchMatchTile
