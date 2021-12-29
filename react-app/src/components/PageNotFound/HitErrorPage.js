import pictures from '../../data/pictures'
import ErrorMapContainer from './ErrorMapContainer'

import './HitError.css'
import {errorMessage as allMarkers} from '../../data/errorMessage'

function HitErrorPage () {

  return (
    <>

<div className="container-banner">
      <div className="top-banner-pic" style={{ backgroundImage: `url('${pictures.collection[0].imageUrl}')` }}>
        <div className="header-banner-text">oh no</div>
        <div className="header-banner-sign">404</div>

        <div className="text-banner">Please navigate back to home,</div>
        <div className="text-banner">you won't find any matches here!</div>
      </div>
    </div>


    <div className="error-map-container">
      <ErrorMapContainer allMarkers={allMarkers} />
    </div>





    </>
  )
}

export default HitErrorPage
