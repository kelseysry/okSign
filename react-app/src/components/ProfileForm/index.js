import { useEffect, useState } from "react"
import { useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import { createProfile } from "../../store/profile";
import isURL from 'validator/es/lib/isURL';
import { useHistory } from 'react-router';
import './ProfileForm.css'
import { getProfiles } from '../../store/profile';
import { useParams } from 'react-router-dom';


const ProfileForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [about_me, setAbout_me] = useState('');
  const [goal, setGoal] = useState('');
  const [talent, setTalent] = useState('');
  const [my_traits, setMy_traits] = useState('');
  const [needs, setNeeds] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [moments, setMoments] = useState('');
  const [secrets, setSecrets] = useState('');
  const [looking_for, setLooking_for] = useState('');
  const [user_audio, setUser_audio] = useState('');
  const [gender_id, setGender_id] = useState('1');
  const [gender_preference_id, setGender_preference_id] = useState('1');
  // const [number_likes, setNumber_likes] = useState("0");
  const [image_url1, setImage_url1] = useState('');
  const [image_url2, setImage_url2] = useState('');
  const [image_url3, setImage_url3] = useState('');
  const [image_url4, setImage_url4] = useState('');
  const [image_url5, setImage_url5] = useState('');
  const [image_url6, setImage_url6] = useState('');
  const [orientation_id, setOrientation_id] = useState('1');
  const [partner_id, setPartner_id] = useState('1');
  const [pronouns, setPronouns] = useState('');
  const [height, setHeight] = useState('');
  const [education, setEducation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [horoscope_id, setHoroscope_id] = useState('1');
  const [smoking_id, setSmoking] = useState('1');
  const [drinking_id, setDrinking] = useState('1');
  const [children_id, setChildren_id] = useState('1');
  const [pet_id, setPet_id] = useState('1');
  const [politic_id, setPolitic_id] = useState('1');
  const [religion_id, setReligion_id] = useState('1');
  const [errors, setErrors] = useState([]);

  const profilesObj = useSelector((state) => state?.profile)
  const profiles = Object?.values(profilesObj)[0]

  const number_likes = '1';


  const { userId }  = useParams();
  const [isLoaded, setIsLoaded] = useState(false)
  const [showCreateProfileForm, setShowCreateProfileForm] = useState(false)
  const [count, setCount] = useState('')

  useEffect(async () => {
    // dispatch(clearProfiles())
    await dispatch(getProfiles());
    // await getCurrentProfile(user_id,profiles)
    if (!isLoaded) setIsLoaded(true);
  },[dispatch, profiles?.length, user_id, isLoaded, count])


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


  let currentProfile = profiles?.filter((profile) => {
    return profile?.user_id === +userId
  })

  console.log("currentProfile🍵🍵🍵🍵🍵🍵🍵", currentProfile)


  const handleSubmit = async (e) => {
    e.preventDefault();


    const createNewProfileData = {
      user_id, age, location, lat, lng, about_me, goal, talent, my_traits, needs, hobbies, moments, secrets,looking_for, user_audio, gender_id, gender_preference_id, number_likes, image_url1, image_url2, image_url3, image_url4, image_url5, image_url6, orientation_id, partner_id, pronouns, height, education, occupation, horoscope_id, smoking_id, drinking_id, children_id, pet_id, politic_id, religion_id
    }
    console.log("createNewProfileData", createNewProfileData)


     let newUserProfile = await dispatch(createProfile(createNewProfileData));

      if (newUserProfile) {
        setCount(count + 1)
        console.log("count--------", count)
        history.push(`/profiles/${user_id}`)
      }

  }


  return (
    <>
    <section className="all-questions-container">

    <nav className="question-nav-bar">
      <a href="#question-1"><i class="fas fa-user-circle"></i></a>
      <a href="#question-2"><i class="fas fa-map-marker-alt"></i></a>
      <a href="#question-3"><i class="fas fa-briefcase"></i></a>
      <a href="#question-4"><i class="fas fa-trophy"></i></a>
      <a href="#question-5"><i class="fas fa-heart"></i></a>
      <a href="#question-6"><i class="fas fa-grin-squint"></i></a>
      <a href="#question-7"><i class="fas fa-play-circle"></i></a>
      <a href="#question-8"><i class="fas fa-images"></i></a>
      <a href="#question-9"><i class="fas fa-address-card"></i></a>
      <a href="#question-10">10</a>
      <a href="#question-11"><i class="fas fa-check-circle"></i></a>
    </nav>

    <section class="scroll-container">


        <div className="ProfileNavExtension">
          <div className="profileFormHeader">Profile Questions</div>
        </div>


        <section className="edit-profile-form-contaer">
              <form className="profile-form" onSubmit={handleSubmit}>

              <div class="scroll-question1-section" id="question-1">

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

              </div>

              <div class="scroll-question2-section" id="question-2">

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

              </div>

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
                    placeholder="now, don't be a 🚩 "
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
                    placeholder="mp3 format 🎵 https://res.cloudinary.com/mabmab/video/upload/v1640820480/okSign/example_audio_link_ubjhn1.mp3"
                    value={user_audio}
                    onChange={(e) => setUser_audio(e.target.value)}
                    >
                    </input>
                </label>
                <label className="selectField">
                  <span className="labelName">Gender</span>
                  <select value={gender_id} onChange={(e) => setGender_id(+e.target.value)}>
                    {/* <option value='1' disabled>Select a gender</option> */}
                    <option value="1">Women</option>
                    <option value="2">Male</option>
                  </select>
                </label>
                <label className="selectField">
                  <span className="labelName">Gender Preference</span>
                  <select value={gender_preference_id} onChange={(e) => setGender_preference_id(+e.target.value)}>
                    {/* <option value='1' disabled>Select a gender preference </option> */}
                    <option value="1">Women</option>
                    <option value="2">Male</option>
                  </select>
                </label>
                {/* <label>
                  number of likes
                    <input
                    className="profile-input"
                    type="text"
                    placeholder="number likes"
                    value={number_likes}
                    onChange={(e) => setNumber_likes(e.target.value)}
                    >
                    </input>
                </label> */}
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
                {/* <button type="button"
                className="ProfileFormSubmitButton"
                onClick={handleCancelFormEditClick}>Cancel</button> */}
                </form>
              </section>


            </section>
        </section>
      </>
    )

}

export default ProfileForm
