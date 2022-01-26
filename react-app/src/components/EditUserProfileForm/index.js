import { useEffect, useState } from 'react';
// import isURL from 'validator/es/lib/isURL';
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from '../../store/profile'
import isURL from 'validator/es/lib/isURL';
import './EditUserProfileForm.css'

const EditUserProfileForm = ({count, setCount, currentProfile, hideForm}) => {
  const dispatch = useDispatch();

  // grab the user from state so a user doesn't have the manually input their data into the form
  //  automatically know who's submitting the form
  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  const [age, setAge] = useState(currentProfile[0]?.age);
  const [location, setLocation] = useState(currentProfile[0]?.location);
  const [lat, setLat] = useState(currentProfile[0]?.lat);
  const [lng, setLng] = useState(currentProfile[0]?.lng);
  const [about_me, setAbout_me] = useState(currentProfile[0]?.about_me);
  const [goal, setGoal] = useState(currentProfile[0]?.goal);
  const [talent, setTalent] = useState(currentProfile[0]?.talent);
  const [my_traits, setMy_traits] = useState(currentProfile[0]?.my_traits);
  const [needs, setNeeds] = useState(currentProfile[0]?.needs);
  const [hobbies, setHobbies] = useState(currentProfile[0]?.hobbies);
  const [moments, setMoments] = useState(currentProfile[0]?.moments);
  const [secrets, setSecrets] = useState(currentProfile[0]?.secrets);
  const [looking_for, setLooking_for] = useState(currentProfile[0]?.looking_for);
  const [user_audio, setUser_audio] = useState(currentProfile[0]?.user_audio);
  const [gender_id, setGender_id] = useState(currentProfile[0]?.gender_id);
  const [gender_preference_id, setGender_preference_id] = useState(currentProfile[0]?.gender_preference_id);
  const [number_likes, setNumber_likes] = useState(currentProfile[0]?.number_likes);
  const [image_url1, setImage_url1] = useState(currentProfile[0]?.image_url1);
  const [image_url2, setImage_url2] = useState(currentProfile[0]?.image_url2);
  const [image_url3, setImage_url3] = useState(currentProfile[0]?.image_url3);
  const [image_url4, setImage_url4] = useState(currentProfile[0]?.image_url4);
  const [image_url5, setImage_url5] = useState(currentProfile[0]?.image_url5);
  const [image_url6, setImage_url6] = useState(currentProfile[0]?.image_url6);
  const [orientation_id, setOrientation_id] = useState(currentProfile[0]?.orientation_id);
  const [partner_id, setPartner_id] = useState(currentProfile[0]?.partner_id);
  const [pronouns, setPronouns] = useState(currentProfile[0]?.pronouns);
  const [height, setHeight] = useState(currentProfile[0]?.height);
  const [education, setEducation] = useState(currentProfile[0]?.education);
  const [occupation, setOccupation] = useState(currentProfile[0]?.occupation);
  const [horoscope_id, setHoroscope_id] = useState(currentProfile[0]?.horoscope_id);
  const [smoking_id, setSmoking] = useState(currentProfile[0]?.smoking_id);
  const [drinking_id, setDrinking] = useState(currentProfile[0]?.drinking_id);
  const [children_id, setChildren_id] = useState(currentProfile[0]?.children_id);
  const [pet_id, setPet_id] = useState(currentProfile[0]?.pet_id);
  const [politic_id, setPolitic_id] = useState(currentProfile[0]?.politic_id);
  const [religion_id, setReligion_id] = useState(currentProfile[0]?.religion_id);
  const [errors, setErrors] = useState([]);



  function checkIfNumeric(number) {
    return number === +number && number === (number|0);
  }

  function checkIfPositiveNumber(number) {
    if(number <= 0 ) {
      return true
    }
  }

  useEffect(() => {
    const validationErrors = []
    if(!(age)) {
      validationErrors.push("age is required")}
    else if (!checkIfNumeric(parseInt(age))) {
      validationErrors.push("please use integers for your age")
    } else if (checkIfPositiveNumber(age)) {
      validationErrors.push("please use positive integers for your age")
    }

    if(!location) validationErrors.push("location is required")
    if(!(lat)) {
      validationErrors.push("lat is required")}
    else if (!checkIfNumeric(parseInt(lat))) {
      validationErrors.push("must be a valid lat")
    }
    if(!(lng)) {
      validationErrors.push("lng is required")}
    else if (!checkIfNumeric(parseInt(lng))) {
      validationErrors.push("must be a valid lng")
    }
    if(!about_me) validationErrors.push("about me is required")
    if(about_me?.length < 3) validationErrors.push("about me must be longer than 3 characters!")
    if(!goal) validationErrors.push("goal is required")
    if(!talent) validationErrors.push("talent is required")
    if(!my_traits) validationErrors.push("traits are required")
    if(!needs) validationErrors.push("needs are required")
    if(!hobbies) validationErrors.push("hobbies are required")
    if(!moments) validationErrors.push("moments are required")
    if(!secrets) validationErrors.push("secrets are required")
    if(!looking_for) validationErrors.push("looking for is required")
    if(!user_audio) {validationErrors.push("audio is required")}
    else if(!isURL(user_audio)) {
      validationErrors.push("Please provide a valid link for the audio")
    }

    // if(!number_likes) validationErrors.push("number of likes")

    if(!image_url1) {validationErrors.push("you have 3 seconds to impress with this photo")}
    else if (!isURL(image_url1)) {
      validationErrors.push("Please provide a valid link for the image 1")
    }
    if(!image_url2) {validationErrors.push("the less photos, the less matches!")}
    else if (!isURL(image_url2)) {
      validationErrors.push("Please provide a valid link for the image 2")
    }

    if(!image_url3) {validationErrors.push("a picture is worth 1000 words!")}
    else if (!isURL(image_url3)) {
      validationErrors.push("Please provide a valid link for the image 3")
    }

    if(!image_url4) {validationErrors.push("if you must, use a cropped pic!")}
    else if (!isURL(image_url4)) {
      validationErrors.push("Please provide a valid link for the image 4")
    }

    if(!image_url5) {validationErrors.push("you have great competition!")}
    else if (!isURL(image_url5)) {
      validationErrors.push("Please provide a valid link for the image 5")
    }

    if(!image_url6) {validationErrors.push("don't be camera shy!")
  }    else if (!isURL(image_url6)) {
    validationErrors.push("Please provide a valid link for the image 6")
  }

    if(!pronouns) {validationErrors.push("pronouns are required")}
    else if(pronouns.length > 30) {
      validationErrors.push("pronouns cannot be longer than 30 characters")
    }
    if(!height) {validationErrors.push("height is required")}
    else if (!checkIfNumeric(parseInt(height))) {
      validationErrors.push("please use integers for your height")
    } else if (checkIfPositiveNumber(height)) {
      validationErrors.push("please use positive integers for your height")
    }

    if(!education) validationErrors.push("education is required")
    if(!occupation) validationErrors.push("occupation is required")

    setErrors(validationErrors)

  }, [user_id, age, location, lat, lng, about_me, goal, talent, my_traits, needs, hobbies, moments, secrets,looking_for, user_audio, gender_id, gender_preference_id, number_likes, image_url1, image_url2, image_url3, image_url4, image_url5, image_url6, orientation_id, partner_id, pronouns, height, education, occupation, horoscope_id, smoking_id, drinking_id, children_id, pet_id, politic_id, religion_id])


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    setCount(count + 1)

    const userInputUpdateProfile = {
      age, location, lat, lng, about_me, goal, talent, my_traits, needs, hobbies, moments, secrets,looking_for, user_audio, gender_id, gender_preference_id, number_likes , image_url1, image_url2, image_url3, image_url4, image_url5, image_url6, orientation_id, partner_id, pronouns, height, education, occupation, horoscope_id, smoking_id, drinking_id, children_id, pet_id, politic_id, religion_id, user_id
    }

    let profile_id = +currentProfile[0]?.id

    let updated = await dispatch(editProfile(userInputUpdateProfile, profile_id))

      if (updated) {
        setCount(count + 1)
        hideForm();
        scrollToTop()
      }
  }

  const handleCancelFormEditClick = (e) => {
    e.preventDefault();

    setCount(count + 1)
    console.log("count", count)

    hideForm();
    scrollToTop()
  };

  return (
    <>
 <section className="all-questions-container">

<nav className="profile-nav-bar">
  <a href="#question-1"><i class="fas fa-user-circle"></i></a>
  <a href="#question-2"><i class="fas fa-map-marker-alt"></i></a>
  <a href="#question-3"><i class="fas fa-briefcase"></i></a>
  <a href="#question-4"><i class="fas fa-trophy"></i></a>
  <a href="#question-5"><i class="fas fa-heart"></i></a>
  <a href="#question-6"><i class="fas fa-grin-squint"></i></a>
  <a href="#question-7"><i class="fas fa-play-circle"></i></a>
  <a href="#question-8"><i class="fas fa-images"></i></a>
  <a href="#question-9"><i class="fas fa-cocktail"></i></a>
  <a href="#question-10"><i class="fas fa-baby-carriage"></i></a>
  <a href="#question-11"><i class="fas fa-dove"></i></a>
  <a href="#question-12"><i class="fas fa-check-circle"></i></a>
</nav>

<section class="scroll-container">


    {/* <div className="ProfileNavExtension">
      <div className="profileFormHeader">Profile Questions</div>
    </div> */}


    <section className="edit-profile-form-continer">
          <form className="profile-fom" onSubmit={handleSubmit}>

          <div class="scroll-question1-section" id="question-1">
            <div className="question-flex">
                <label
                  className="labelName"
                >
                  Age
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="24"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    >
                    </input>
                </label>

                <div className="profile-select">
                  <label className="selectField">
                  </label>
                    <span className="labelName">Gender</span>
                    <select value={gender_id} onChange={(e) => setGender_id(+e.target.value)}>
                      {/* <option value='1' disabled>Select a gender</option> */}
                      <option value="1">Women</option>
                      <option value="2">Male</option>
                    </select>
                </div>


                <label className="labelName">
              Pronouns
                <input
                className="profile-input"
                type="text"
                placeholder="she/her"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                >
                </input>
            </label>
            <label className="labelName">
              height
                <input
                className="profile-input"
                type="text"
                placeholder="use cm please for our international users"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                >
                </input>
            </label>


            <div className="profile-select">
              <label className="selectField">
              </label>
                <span className="labelName">Orientation</span>
                <select value={orientation_id} onChange={(e) => setOrientation_id(+e.target.value)}>
                  <option value="1">Straight</option>
                  <option value="2">Lesbian</option>
                  <option value="3">Gay</option>
                  <option value="4">Bisexual</option>
                  <option value="5">Queer</option>
                  <option value="6">Pansexual</option>
                </select>
            </div>

          </div>
        </div>


          <div class="scroll-question2-section" id="question-2">
          <div className="question-flex">
              <label className="labelName">
                location
                  <input
                  className="profile-input"
                  type="text"
                  placeholder="Long Beach, California"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  >
                  </input>
              </label>
              <label className="labelName">
                lat
                  <input
                  className="profile-input"
                  type="text"
                  placeholder="use lat from google maps 📍 33.85897723024835"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  >
                  </input>
              </label>
              <label className="labelName">
                lng
                  <input
                  className="profile-input"
                  type="text"
                  placeholder="use lat from google maps 📍 -118.08115190136616 "
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  >
                  </input>
              </label>
          </div>
        </div>

        <div class="scroll-question-section" id="question-3">
            <div className="question-flex">

            <label className="labelName">
              About Me
                <input
                className="profile-input"
                type="text"
                placeholder="Stuck? Use UrbanDictionary for inspiration"
                value={about_me}
                onChange={(e) => setAbout_me(e.target.value)}
                >
                </input>
            </label>

            <label className="labelName">
              Education
                <input
                className="profile-input"
                type="text"
                placeholder="what is your latest degree from?"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                >
                </input>
            </label>
            <label className="labelName">
              Occupation
                <input
                className="profile-input"
                type="text"
                placeholder="where do you work?"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                >
                </input>
            </label>


            </div>
        </div>


        <div class="scroll-question4-section" id="question-4">
          <div className="question-flex">
              <label className="labelName">
                Goal
                  <input
                  className="profile-input"
                  type="text"
                  placeholder="don't write to find love 🤨"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  >
                  </input>
              </label>
              <label className="labelName">
                Talent
                  <input
                  className="profile-input"
                  type="text"
                  placeholder="not getting ghosted... maybe?"
                  value={talent}
                  onChange={(e) => setTalent(e.target.value)}
                  >
                  </input>
              </label>
              <label className="labelName">
                Traits
                  <input
                  className="profile-input"
                  type="text"
                  placeholder="now, don't be a 🚩 "
                  value={my_traits}
                  onChange={(e) => setMy_traits(e.target.value)}
                  >
                  </input>
              </label>

            </div>
        </div>

        <div class="scroll-question-section" id="question-5">
            <div className="question-flex">
            <label className="labelName">
              Needs
                <input
                className="profile-input"
                type="text"
                placeholder="what do you value the most?"
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
                >
                </input>
            </label>


            <label className="labelName">
              Looking for
                <input
                className="profile-input"
                type="text"
                placeholder="no judgement: what do you want?"
                value={looking_for}
                onChange={(e) => setLooking_for(e.target.value)}
                >
                </input>
            </label>


            <div className="profile-select">
            <label className="selectField">
            </label>
            <span className="labelName">What is your relationship status?</span>
              <select value={partner_id} onChange={(e) => setPartner_id(+e.target.value)}>
                <option value="1">Monogamous</option>
                <option value="2">Non-monogamous</option>
                <option value="3">Open to either</option>
              </select>
            </div>


            <div className="profile-select">
            <label className="selectField">
            </label>
              <span className="labelName">Horoscope</span>
              <select value={horoscope_id} onChange={(e) => setHoroscope_id(+e.target.value)}>
                <option value="1">Aries</option>
                <option value="2">Taurus</option>
                <option value="3">Gemini</option>
                <option value="4">Cancer</option>
                <option value="5">Leo</option>
                <option value="6">Virgo</option>
                <option value="7">Libra</option>
                <option value="8">Scorpio</option>
                <option value="9">Sagittarius</option>
                <option value="10">Capricorn</option>
                <option value="11">Aquarius</option>
                <option value="12">Pisces</option>
              </select>
            </div>


            <div className="profile-select">
            <label className="selectField">
            </label>
              <span className="labelName">Gender Preference</span>
              <select value={gender_preference_id} onChange={(e) => setGender_preference_id(+e.target.value)}>
                {/* <option value='1' disabled>Select a gender preference </option> */}
                <option value="1">Women</option>
                <option value="2">Male</option>
              </select>
            </div>


          </div>
      </div>

      <div class="scroll-question-section" id="question-6">
            <div className="question-flex">
            <label className="labelName">
              Hobbies
                <input
                className="profile-input"
                type="text"
                placeholder="just be honest if you're the type to watch TV for 8+ hrs"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
                >
                </input>
            </label>

            <label className="labelName">
              Moments
                <input
                className="profile-input"
                type="text"
                placeholder="what does a perfect day look like to you?"
                value={moments}
                onChange={(e) => setMoments(e.target.value)}
                >
                </input>
            </label>
            <label className="labelName">
              Secrets
                <input
                className="profile-input"
                type="text"
                placeholder="we're looking for scorching hot tea 🍵"
                value={secrets}
                onChange={(e) => setSecrets(e.target.value)}
                >
                </input>
            </label>
           </div>
      </div>

      <div class="scroll-question7-section" id="question-7">
            <div className="question-flex">

            <label className="labelName">
              A Shower thought you recently had
                <input
                className="audio-input"
                type="text"
                placeholder="mp3 format 🎵 ➡️ https://res.cloudinary.com/mabmab/video/upload/v1640820480/okSign/example_audio_link_ubjhn1.mp3"
                value={user_audio}
                onChange={(e) => setUser_audio(e.target.value)}
                >
                </input>
            </label>

        </div>
      </div>

      <div class="scroll-question-section" id="question-8">
            <div className="question-flex">

            <label className="labelName">
              Image Url 1
                <input
                className="picture-input"
                type="text"
                placeholder="pic format 🖼  ➡️ https://res.cloudinary.com/mabmab/image/upload/v1639292458/okSign/kelsey1_yut7zy.png"
                value={image_url1}
                onChange={(e) => setImage_url1(e.target.value)}
                >
                </input>
            </label>
            <label className="labelName">
              Image Url 2
                <input
                className="picture-input"
                type="text"
                placeholder="don't use a photo that clearly has another person cropped out"
                value={image_url2}
                onChange={(e) => setImage_url2(e.target.value)}
                >
                </input>
            </label>
            <label className="labelName">
              Image Url 3
                <input
                className="picture-input"
                type="text"
                placeholder="a picture can make up for a bad bio"
                value={image_url3}
                onChange={(e) => setImage_url3(e.target.value)}
                >
                </input>
            </label>
            <label className="labelName">
              Image Url 4
                <input
                className="picture-input"
                type="text"
                placeholder="don't use mirror selfies"
                value={image_url4}
                onChange={(e) => setImage_url4(e.target.value)}
                >
                </input>
            </label>
            <label className="labelName">
              Image Url 5
                <input
                className="picture-input"
                type="text"
                placeholder="have your friends pick out your best photos"
                value={image_url5}
                onChange={(e) => setImage_url5(e.target.value)}
                >
                </input>
            </label>
            <label className="labelName">
              Image Url 6
                <input
                className="picture-input"
                type="text"
                placeholder="try not to use group pictures...we're not playing find waldo"
                value={image_url6}
                onChange={(e) => setImage_url6(e.target.value)}
                >
                </input>
            </label>
      </div>
      </div>

      <div class="scroll-question-section" id="question-9">
            <div className="question-flex">

            <div className="profile2-select">
              <label className="selectField">
              </label>
                <span className="labelName">Smoking</span>
                <select value={smoking_id} onChange={(e) => setSmoking(+e.target.value)}>
                  <option value="1">Smokes cigarettes regularly</option>
                  <option value="2">Smokes cigarettes sometimes</option>
                  <option value="3">Vapes</option>
                  <option value="4">Doesn't smoke</option>
                </select>
            </div>

            <div className="profile2-select">
              <label className="selectField">
              </label>
                <span className="labelName">Drinking</span>
                <select value={drinking_id} onChange={(e) => setDrinking(+e.target.value)}>
                  <option value="1">Drinks often</option>
                  <option value="2">Drinks sometimes</option>
                  <option value="3">Doesn't drink</option>
                </select>
            </div>

      </div>
      </div>



      <div class="scroll-question-section" id="question-10">
            <div className="question-flex">

            <div className="profile-select">

            <label className="selectField">
            </label>
              <span className="labelName">Children</span>
              <select value={children_id} onChange={(e) => setChildren_id(+e.target.value)}>
                <option value="1">Doesn't have kids but might want them</option>
                <option value="2">Doesn't have kids but wants them</option>
                <option value="3">Doesn't have kids and doesn't want want them</option>
                <option value="4">Has kids and doesn't want more</option>
                <option value="5">Has kids and might want more</option>
                <option value="6">Has kids and want more</option>
              </select>
            </div>

          <div className="profile-select">
          <label className="selectField">
            </label>
              <span className="labelName">Pets</span>
              <select value={pet_id} onChange={(e) => setPet_id(+e.target.value)}>
                <option value="1">Doesn't have pets</option>
                <option value="2">Cat</option>
                <option value="3">Dog</option>
                <option value="4">Has other pets</option>
              </select>
            </div>

      </div>
      </div>


      <div class="scroll-question-section" id="question-11">
            <div className="question-flex">
            <div className="profile2-select">
              <label className="selectField">
              </label>
                <span className="labelName">Politics</span>
                <select value={politic_id} onChange={(e) => setPolitic_id(+e.target.value)}>
                  <option value="1">Politically liberal</option>
                  <option value="2">Politically moderate</option>
                  <option value="3">Politically conservative</option>
                  <option value="4">Other political beliefs</option>
                </select>
              </div>

              <div className="profile2-select">
              <label className="selectField">
              </label>
                <span className="labelName">Religion</span>
                <select value={religion_id} onChange={(e) => setReligion_id(+e.target.value)}>
                  <option value="1">Agnosticism</option>
                  <option value="2">Atheism</option>
                  <option value="3">Christianity</option>
                  <option value="4">Judaism</option>
                  <option value="5">Catholicism</option>
                  <option value="6">Islam</option>
                  <option value="7">Hinduism</option>
                  <option value="8">Buddhism</option>
                  <option value="9">Sikh</option>
                  <option value="10">Other religion</option>
                </select>
              </div>

      </div>
      </div>


      <div class="scroll-question-section" id="question-12">
        <div className="profile-errors-container">
            {
              errors.length?
              <>
            <div className="profile-errors-hr"></div>

            <ul className="error-profile">
                {errors.map((error) => <li key={error}>{error}</li>)}
              </ul>
              </>
              : null
              }
              <button
                className="profile-submit-button"
                type="submit"
                disabled={errors.length>0}>
                Submit
              </button>
              <button type="button" className="profile-submit-button" onClick={handleCancelFormEditClick}>Cancel</button>



        </div>
      </div>

{/*
            <ul className="error">
              {errors.map((error) => <li key={error}>{error}</li>)}
            </ul>
            <button
              className="ProfileFormSubmitButton"
              type="submit"
              disabled={errors.length>0}

            >
              Submit
            </button>
  */}
            </form>
          </section>


        </section>
    </section>

        {/* <div className="questionAnswered">
          <div className="questionsHeader">Edit Profile</div>
          <button type="button" className="EditQuestionCancel" onClick={handleCancelFormEditClick}>Cancel</button>

        </div>
        <section className="edit-profile-form-container">
              <form className="profile-form" onSubmit={handleSubmit}>
                <label>
                  Age
                    <input
                    className="profile-input"
                    type="text"
                    placeholder=""
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  location
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="don't worry, you can still see matches from abroad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  lat
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="use lat from google maps"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  lng
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="use lat from google maps"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  About Me
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="if you can't write a good description, just UrbanDictionary your name"
                    value={about_me}
                    onChange={(e) => setAbout_me(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Goal
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="don't write to find love 🤨"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Talent
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="not getting ghosted... maybe?"
                    value={talent}
                    onChange={(e) => setTalent(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Traits
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="height, gym, hustle, good vibes are not descriptive traits 🚩 "
                    value={my_traits}
                    onChange={(e) => setMy_traits(e.target.value)}
                    >
                    </input>
                </label>
                        <label>
                  Needs
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="what do you value the most?"
                    value={needs}
                    onChange={(e) => setNeeds(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Hobbies
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="just be honest if you're the type to watch TV for 8+ hrs"
                    value={hobbies}
                    onChange={(e) => setHobbies(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Moments
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="what does a perfect day look like to you?"
                    value={moments}
                    onChange={(e) => setMoments(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Secrets
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="we're looking for scorching hot tea 🍵"
                    value={secrets}
                    onChange={(e) => setSecrets(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Looking for
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="no judgement: what do you want from this whole dating app thing?"
                    value={looking_for}
                    onChange={(e) => setLooking_for(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  A Shower thought you recently had
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="record yourself or any audio that represents you!"
                    value={user_audio}
                    onChange={(e) => setUser_audio(e.target.value)}
                    >
                    </input>
                </label>
                <label className="selectField">
                  <span className="labelName">Gender</span>
                  <select value={gender_id} onChange={(e) => setGender_id(+e.target.value)}>
                    <option value="1">Women</option>
                    <option value="2">Male</option>
                  </select>
                </label>
                <label className="selectField">
                  <span className="labelName">Gender Preference</span>
                  <select value={gender_preference_id} onChange={(e) => setGender_preference_id(+e.target.value)}>
                    <option value="1">Women</option>
                    <option value="2">Male</option>
                  </select>
                </label>

                <label>
                  Image Url 1
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="don't use a photo that clearly has another person cropped out"
                    value={image_url1}
                    onChange={(e) => setImage_url1(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Image Url 2
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="a picture is worth a 1000 words"
                    value={image_url2}
                    onChange={(e) => setImage_url2(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Image Url 3
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="a picture can make up for a bad bio"
                    value={image_url3}
                    onChange={(e) => setImage_url3(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Image Url 4
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="don't use mirror selfies"
                    value={image_url4}
                    onChange={(e) => setImage_url4(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Image Url 5
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="have your friends pick out your best photos"
                    value={image_url5}
                    onChange={(e) => setImage_url5(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Image Url 6
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="try not to use group pictures..., we're not playing find waldo"
                    value={image_url6}
                    onChange={(e) => setImage_url6(e.target.value)}
                    >
                    </input>
                </label>

                <label className="selectField">
                  <span className="labelName">Orientation</span>
                  <select value={orientation_id} onChange={(e) => setOrientation_id(+e.target.value)}>
                    <option value="1">Straight</option>
                    <option value="2">Lesbian</option>
                    <option value="3">Gay</option>
                    <option value="4">Bisexual</option>
                    <option value="5">Queer</option>
                    <option value="6">Pansexual</option>
                  </select>
                </label>

                <label className="selectField">
                <span className="labelName">What is your relationship status?</span>
                  <select value={partner_id} onChange={(e) => setPartner_id(+e.target.value)}>
                    <option value="1">Monogamous</option>
                    <option value="2">Non-monogamous</option>
                    <option value="3">Open to either</option>
                  </select>
                </label>

                <label>
                  Pronouns
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="pronouns"
                    value={pronouns}
                    onChange={(e) => setPronouns(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  height
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="use cm please for our international users"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    >
                    </input>
                </label>
                        <label>
                  Education
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="what is your latest degree from?"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    >
                    </input>
                </label>
                <label>
                  Occupation
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="where do you work?"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    >
                    </input>
                </label>

                <label className="selectField">
                  <span className="labelName">Horoscope</span>
                  <select value={horoscope_id} onChange={(e) => setHoroscope_id(+e.target.value)}>
                    <option value="1">Aries</option>
                    <option value="2">Taurus</option>
                    <option value="3">Gemini</option>
                    <option value="4">Cancer</option>
                    <option value="5">Leo</option>
                    <option value="6">Virgo</option>
                    <option value="7">Libra</option>
                    <option value="8">Scorpio</option>
                    <option value="9">Sagittarius</option>
                    <option value="10">Capricorn</option>
                    <option value="11">Aquarius</option>
                    <option value="12">Pisces</option>
                  </select>
                </label>

                <label className="selectField">
                  <span className="labelName">Smoking</span>
                  <select value={smoking_id} onChange={(e) => setSmoking(+e.target.value)}>
                    <option value="1">Smokes cigarettes regularly</option>
                    <option value="2">Smokes cigarettes sometimes</option>
                    <option value="3">Vapes</option>
                    <option value="4">Doesn't smoke</option>
                  </select>
                </label>

                <label className="selectField">
                  <span className="labelName">Drinking</span>
                  <select value={drinking_id} onChange={(e) => setDrinking(+e.target.value)}>
                    <option value="1">Drinks often</option>
                    <option value="2">Drinks sometimes</option>
                    <option value="3">Doesn't drink</option>
                  </select>
                </label>

                <label className="selectField">
                  <span className="labelName">Children</span>
                  <select value={children_id} onChange={(e) => setChildren_id(+e.target.value)}>
                    <option value="1">Doesn't have kids but might want them</option>
                    <option value="2">Doesn't have kids but wants them</option>
                    <option value="3">Doesn't have kids and doesn't want want them</option>
                    <option value="4">Has kids and doesn't want more</option>
                    <option value="5">Has kids and might want more</option>
                    <option value="6">Has kids and want more</option>
                  </select>
                </label>

              <label className="selectField">
                  <span className="labelName">Pets</span>
                  <select value={pet_id} onChange={(e) => setPet_id(+e.target.value)}>
                    <option value="1">Doesn't have pets</option>
                    <option value="2">Cat</option>
                    <option value="3">Dog</option>
                    <option value="4">Has other pets</option>
                  </select>
                </label>

                <label className="selectField">
                  <span className="labelName">Politics</span>
                  <select value={politic_id} onChange={(e) => setPolitic_id(+e.target.value)}>
                    <option value="1">Politically liberal</option>
                    <option value="2">Politically moderate</option>
                    <option value="3">Politically conservative</option>
                    <option value="4">Other political beliefs</option>
                  </select>
                </label>

                <label className="selectField">
                  <span className="labelName">Religion</span>
                  <select value={religion_id} onChange={(e) => setReligion_id(+e.target.value)}>
                    <option value="1">Agnosticism</option>
                    <option value="2">Atheism</option>
                    <option value="3">Christianity</option>
                    <option value="4">Judaism</option>
                    <option value="5">Catholicism</option>
                    <option value="6">Islam</option>
                    <option value="7">Hinduism</option>
                    <option value="8">Buddhism</option>
                    <option value="9">Sikh</option>
                    <option value="10">Other religion</option>
                  </select>
                </label>

        <ul className="error">
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <button
          className="ProfileFormSubmitButton"
          type="submit"
          disabled={errors.length>0}
        >
          Submit
        </button>
        </form>
      </section> */}
      </>
    )
}


export default EditUserProfileForm
