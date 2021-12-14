import { useEffect, useState } from 'react';
// import isURL from 'validator/es/lib/isURL';
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getProfiles } from '../../store/profile'
import isURL from 'validator/es/lib/isURL';

const EditUserProfileForm = () => {
  const dispatch = useDispatch();
  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  // grab all the profiles and filter out the one that has user_id matching with session user
  // have to do this b/c a user can delete their profile so then profile_id is no longer
  // directly correlated with the user.id
  useEffect(() => {
    dispatch(getProfiles());
  },[dispatch])

  // grab the user from state so a user doesn't have the manually input their data into the form
  //  automatically know who's submitting the form
  const sessionUser = useSelector((state) => state.session.user)
  const user_id = sessionUser.id

  // console.log("profiles in editUser", profiles)
  let currentProfile = profiles[0]?.filter((profile) => {return profile.user_id === user_id})
  // console.log("currentProfile in edit", currentProfile)

  const [age, setAge] = useState(currentProfile?.age);
  const [location, setLocation] = useState(currentProfile?.location);
  const [lat, setLat] = useState(currentProfile?.lat);
  const [lng, setLng] = useState(currentProfile?.lng);
  const [about_me, setAbout_me] = useState(currentProfile?.about_me);
  const [goal, setGoal] = useState(currentProfile?.goal);
  const [talent, setTalent] = useState(currentProfile?.talent);
  const [my_traits, setMy_traits] = useState(currentProfile?.my_traits);
  const [needs, setNeeds] = useState(currentProfile?.needs);
  const [hobbies, setHobbies] = useState(currentProfile?.hobbies);
  const [moments, setMoments] = useState(currentProfile?.moments);
  const [secrets, setSecrets] = useState(currentProfile?.secrets);
  const [looking_for, setLooking_for] = useState(currentProfile?.looking_for);
  const [user_audio, setUser_audio] = useState(currentProfile?.user_audio);
  const [gender_id, setGender_id] = useState(currentProfile?.gender_id);
  const [number_likes, setNumber_likes] = useState(currentProfile?.number_likes);
  const [image_url1, setImage_url1] = useState(currentProfile?.image_url1);
  const [image_url2, setImage_url2] = useState(currentProfile?.image_url2);
  const [image_url3, setImage_url3] = useState(currentProfile?.image_url3);
  const [image_url4, setImage_url4] = useState(currentProfile?.image_url4);
  const [image_url5, setImage_url5] = useState(currentProfile?.image_url5);
  const [image_url6, setImage_url6] = useState(currentProfile?.image_url6);
  const [orientation_id, setOrientation_id] = useState(currentProfile?.orientation_id);
  const [partner_id, setPartner_id] = useState(currentProfile?.partner_id);
  const [pronouns, setPronouns] = useState(currentProfile?.pronouns);
  const [height, setHeight] = useState(currentProfile?.height);
  const [education, setEducation] = useState(currentProfile?.education);
  const [occupation, setOccupation] = useState(currentProfile?.occupation);
  const [horoscope_id, setHoroscope_id] = useState(currentProfile?.horoscope_id);
  const [smoking, setSmoking] = useState(currentProfile?.smoking);
  const [drinking, setDrinking] = useState(currentProfile?.drinking);
  const [children_id, setChildren_id] = useState(currentProfile?.children_id);
  const [pet_id, setPet_id] = useState(currentProfile?.pet_id);
  const [politic_id, setPolitic_id] = useState(currentProfile?.politic_id);
  const [religion_id, setReligion_id] = useState(currentProfile?.religion_id);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const validationErrors = []
    if(!age) validationErrors.push("age is required")
    if(!location) validationErrors.push("location is required")
    if(!lat) validationErrors.push("lat is required")
    if(!lng) validationErrors.push("lng is required")
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
    if(!user_audio) validationErrors.push("audio is required")
    if(!gender_id) validationErrors.push("gender is required")
    if(!number_likes) validationErrors.push("number of likes") // need to figure out how to do this
    if(!image_url1) {
      validationErrors.push("you need 6 photos!")
    } else if (!isURL(image_url1)) {
      validationErrors.push("Please provide a valid link for the image")
    }
    if(!image_url2) validationErrors.push("you need 6 photos!")
    if(!image_url3) validationErrors.push("you need 6 photos!")
    if(!image_url4) validationErrors.push("you need 6 photos!")
    if(!image_url5) validationErrors.push("you need 6 photos!")
    if(!image_url6) validationErrors.push("you need 6 photos!")
    if(!orientation_id) validationErrors.push("orientation is required")
    if(!partner_id) validationErrors.push("partner is required")
    if(!pronouns) validationErrors.push("pronouns are required")
    if(!height) validationErrors.push("height is required")
    if(!education) validationErrors.push("education is required")
    if(!occupation) validationErrors.push("occupation is required")
    if(!horoscope_id) validationErrors.push("horoscope is required")
    if(!smoking) validationErrors.push("smoking status is required")
    if(!drinking) validationErrors.push("drinking status is required")
    if(!children_id) validationErrors.push("children status is required")
    if(!pet_id) validationErrors.push("pet status is required")
    if(!politic_id) validationErrors.push("political belief is required")
    if(!religion_id) validationErrors.push("religion is required")

    setErrors(validationErrors)

  }, [age, location, lat, lng, about_me, goal, talent, my_traits, needs, hobbies, moments, secrets,looking_for, user_audio, gender_id, number_likes, image_url1, image_url2, image_url3, image_url4, image_url5, image_url6, orientation_id, partner_id, pronouns, height, education, occupation, horoscope_id, smoking, drinking, children_id, pet_id, politic_id, religion_id])

  const handleSubmit = async(e) => {
    e.preventDefault();


  }



  return (
    <section className="edit-profile-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Age
            <input
            type="text"
            placeholder="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            >
            </input>
        </label>

        </form>
      </section>
    )
}


export default EditUserProfileForm
