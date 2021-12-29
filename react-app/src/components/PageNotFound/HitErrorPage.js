import pictures from '../../data/pictures'
import ErrorMapContainer from './ErrorMapContainer'

import './HitError.css'
import {errorMessage as allMarkers} from '../../data/errorMessage'

function HitErrorPage () {

  return (

  <div className="error-page" style={{ backgroundImage: `url('${pictures.collection[0].imageUrl}')` }}>

      <div className="container-banner">
        <div className="top-banner-pic-error">
          <div className="header-banner-text">oh no</div>
          <div className="header-banner-sign">404</div>
          <div className="text-banner-e">Please navigate back to home,</div>
          <div className="text-banner-e">you won't find any matches here!</div>
        </div>



    <div className="error-map-container">
      <ErrorMapContainer allMarkers={allMarkers} />
    </div>

      </div>



    </div>






  )
}

export default HitErrorPage
