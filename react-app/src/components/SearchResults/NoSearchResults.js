
import './NoSearchResults.css'
import pictures from '../../data/pictures'

const NoSearchResults = ({input}) => {

  return (
      <section className="step-container-search">
        <div className="Step1S">no</div>
        <div className="Step2S">users</div>
        <div className="Step3S">found</div>
        <div className="Step5S">for</div>
        <div className="Step6S">"{input}"</div>

        <img class="noUsersImg" src={pictures.collection[15].imageUrl} />
        <div className="noImgChat">
          <div className="noImgChatFirstLine">Don't be too picky now. Try a term like</div>
          <ul className="noImgChatSecondLine">
            <li>aquarius</li>
            <li>tokyo</li>
            <li>men</li>
          </ul>
        </div>
      </section>
  )

}

export default NoSearchResults
