import pictures from '../../data/pictures'
import ErrorMapContainer from './ErrorMapContainer'

import './HitError.css'
import {errorMessage as allMarkers} from '../../data/errorMessage'

function HitErrorPage () {

  return (
    <>
    <div className="error-pic-container" style={{ backgroundImage: `url('${pictures.collection[0].imageUrl}')` }}>
      <div className="error-font">404</div>
    </div>

    <div className="error-map-container">
      <ErrorMapContainer allMarkers={allMarkers} />
    </div>





    </>
  )
}

export default HitErrorPage
