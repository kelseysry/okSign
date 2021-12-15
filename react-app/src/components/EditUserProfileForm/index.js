import { useEffect, useState } from 'react';
// import isURL from 'validator/es/lib/isURL';
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getProfiles } from '../../store/profile'
import isURL from 'validator/es/lib/isURL';
import './EditUserProfileForm.css'
import { clearProfiles } from '../../store/profile';

const EditUserProfileForm = ({count, setCount, currentProfile, hideForm}) => {
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);
  // const profilesObj = useSelector((state) => state?.profile)
  // const profiles = Object?.values(profilesObj)
  // console.log("profiles edit?", profiles)
  // grab all the profiles and filter out the one that has user_id matching with session user
  // have to do this b/c a user can delete their profile so then profile_id is no longer
  // directly correlated with the user.id
  // useEffect(async () => { // comment 16-20 back in
  //   await dispatch(getProfiles());
  //   // await getCurrentProfile(user_id,profiles)
  //   if (!isLoaded) setIsLoaded(true);
  // },[dispatch, profiles?.length])

  // useEffect(async () => {
  //   if(currentProfile) {
  //     // await currentProfile;
  //     await setAge(currentProfile[0]?.age)
  //     await setLocation(currentProfile[0]?.location)
  //   }
  // },[currentProfile])

  //   useEffect(async () => {
  //   // if(currentProfile) {
  //     // await currentProfile;
  //     await getCurrentProfile()
  //     await setAge(currentProfile[0]?.age)
  //   // }
  // },[profilesObj])

  // grab the user from state so a user doesn't have the manually input their data into the form
  //  automatically know who's submitting the form
  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  // console.log("profiles in editUser", profiles)


  // comment back in
  // let currentProfile = profiles[0]?.filter((profile) => {return profile.user_id === user_id})
  // console.log("currentProfile in edit", currentProfile)
  // console.log("currentProfile in edit age--", currentProfile[0]?.age)

  // let currentProfile
  // const getCurrentProfile = (user_id,profiles) => {

  //     return currentProfile =  profiles[0]?.filter((profile) => {return profile.user_id === user_id})
  // }

  // console.log('currentProfile in edit', currentProfile)

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
  // const [smoking, setSmoking] = useState(currentProfile[0]?.smoking);
  // const [drinking, setDrinking] = useState(currentProfile[0]?.smoking);
  const [children_id, setChildren_id] = useState(currentProfile[0]?.children_id);
  const [pet_id, setPet_id] = useState(currentProfile[0]?.pet_id);
  const [politic_id, setPolitic_id] = useState(currentProfile[0]?.politic_id);
  const [religion_id, setReligion_id] = useState(currentProfile[0]?.religion_id);
  const [errors, setErrors] = useState([]);

  // const [count, setCount] = useState(0)

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
    // if(!image_url1) {
    //   validationErrors.push("you need 6 photos!")
    // } else if (!isURL(image_url1)) {
    //   validationErrors.push("Please provide a valid link for the image")
    // }
    // if(!image_url1) validationErrors.push("you need 6 photos!")
    if (!isURL(image_url1)) validationErrors.push("Please provide a valid link for the image")

    if(!image_url2) validationErrors.push("the less photos, the less matches!")
    if(!image_url3) validationErrors.push("a picture is worth 1000 words!")
    if(!image_url4) validationErrors.push("you have great competition!")
    if(!image_url5) validationErrors.push("no great bio, make up for that with a pic!")
    if(!image_url6) validationErrors.push("don't be camera shy!")
    if(!orientation_id) validationErrors.push("orientation is required")
    if(!partner_id) validationErrors.push("partner is required")
    if(!pronouns) validationErrors.push("pronouns are required")
    if(!height) validationErrors.push("height is required")
    if(!education) validationErrors.push("education is required")
    if(!occupation) validationErrors.push("occupation is required")
    if(!horoscope_id) validationErrors.push("horoscope is required")
    // if(!smoking) validationErrors.push("smoking status is required")
    // if(!drinking) validationErrors.push("drinking status is required")
    if(!children_id) validationErrors.push("children status is required")
    if(!pet_id) validationErrors.push("pet status is required")
    if(!politic_id) validationErrors.push("political belief is required")
    if(!religion_id) validationErrors.push("religion is required")

    setErrors(validationErrors)

  }, [age, location, lat, lng, about_me, goal, talent, my_traits, needs, hobbies, moments, secrets,looking_for, user_audio, gender_id, number_likes, image_url1, image_url2, image_url3, image_url4, image_url5, image_url6, orientation_id, partner_id, pronouns, height, education, occupation, horoscope_id, children_id, pet_id, politic_id, religion_id, user_id])


//   useEffect(async ()  => {
//     await dispatch(getProfiles()).then(()=>dispatch(getProfiles()))
// },[dispatch, count])

  const handleSubmit = async(e) => {
    e.preventDefault();

    setCount(count + 1)
    console.log("count", count)

    const userInputUpdateProfile = {
      age, location, lat, lng, about_me, goal, talent, my_traits, needs, hobbies, moments, secrets,looking_for, user_audio, gender_id, number_likes, image_url1, image_url2, image_url3, image_url4, image_url5, image_url6, orientation_id, partner_id, pronouns, height, education, occupation, horoscope_id, children_id, pet_id, politic_id, religion_id, user_id
    }

    console.log("userInputUpdateProfile", userInputUpdateProfile)
    console.log("currentProfile[0]?.user_id ", currentProfile[0]?.id )
    let profile_id = +currentProfile[0]?.id
    console.log("profile_id profile_id", profile_id)

    let updated = await dispatch(editProfile(userInputUpdateProfile, profile_id))

      console.log(updated, updated)
      // await setCount(count + 1)
      console.log("count", count)

      // dispatch(clearProfiles())
      // dispatch(getProfiles());

      if (updated) {
        setCount(count + 1)

        hideForm();
      }


  }

  const handleCancelFormEditClick = (e) => {
    e.preventDefault();

    setCount(count + 1)
    console.log("count", count)
    // dispatch(clearProfiles())
    // dispatch(getProfiles());
    hideForm();
  };


  return (
    <>
<section className="edit-profile-form-container">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
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
        <label>
          location
            <input
            type="text"
            placeholder="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            >
            </input>
        </label>
        <label>
          lat
            <input
            type="text"
            placeholder="lat"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            >
            </input>
        </label>
        <label>
          lng
            <input
            type="text"
            placeholder="lng"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            >
            </input>
        </label>
        <label>
          About Me
            <input
            type="text"
            placeholder="about me"
            value={about_me}
            onChange={(e) => setAbout_me(e.target.value)}
            >
            </input>
        </label>
        <label>
          Goal
            <input
            type="text"
            placeholder="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            >
            </input>
        </label>
        <label>
          Talent
            <input
            type="text"
            placeholder="talent"
            value={talent}
            onChange={(e) => setTalent(e.target.value)}
            >
            </input>
        </label>
        <label>
          Traits
            <input
            type="text"
            placeholder="traits"
            value={my_traits}
            onChange={(e) => setMy_traits(e.target.value)}
            >
            </input>
        </label>
                <label>
          Needs
            <input
            type="text"
            placeholder="needs"
            value={needs}
            onChange={(e) => setNeeds(e.target.value)}
            >
            </input>
        </label>
        <label>
          Hobbies
            <input
            type="text"
            placeholder="hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            >
            </input>
        </label>
        <label>
          Moments
            <input
            type="text"
            placeholder="moments"
            value={moments}
            onChange={(e) => setMoments(e.target.value)}
            >
            </input>
        </label>
        <label>
          Secrets
            <input
            type="text"
            placeholder="secrets"
            value={secrets}
            onChange={(e) => setSecrets(e.target.value)}
            >
            </input>
        </label>
        <label>
          Looking for
            <input
            type="text"
            placeholder="looking for"
            value={looking_for}
            onChange={(e) => setLooking_for(e.target.value)}
            >
            </input>
        </label>
        <label>
          User Audio
            <input
            type="text"
            placeholder="user audio"
            value={user_audio}
            onChange={(e) => setUser_audio(e.target.value)}
            >
            </input>
        </label>
        <label>
          Gender
            <input
            type="text"
            placeholder="gender id"
            value={gender_id}
            onChange={(e) => setGender_id(e.target.value)}
            >
            </input>
        </label>
        <label>
          number of likes
            <input
            type="text"
            placeholder="number likes"
            value={number_likes}
            onChange={(e) => setNumber_likes(e.target.value)}
            >
            </input>
        </label>
        <label>
          Image Url 1
            <input
            type="text"
            placeholder="image url 1"
            value={image_url1}
            onChange={(e) => setImage_url1(e.target.value)}
            >
            </input>
        </label>
        <label>
          Image Url 2
            <input
            type="text"
            placeholder="image url 2"
            value={image_url2}
            onChange={(e) => setImage_url2(e.target.value)}
            >
            </input>
        </label>
        <label>
          Image Url 3
            <input
            type="text"
            placeholder="image url 3"
            value={image_url3}
            onChange={(e) => setImage_url3(e.target.value)}
            >
            </input>
        </label>
        <label>
          Image Url 4
            <input
            type="text"
            placeholder="image url 4"
            value={image_url4}
            onChange={(e) => setImage_url4(e.target.value)}
            >
            </input>
        </label>
        <label>
          Image Url 5
            <input
            type="text"
            placeholder="image url 5"
            value={image_url5}
            onChange={(e) => setImage_url5(e.target.value)}
            >
            </input>
        </label>
        <label>
          Image Url 6
            <input
            type="text"
            placeholder="image url 6"
            value={image_url6}
            onChange={(e) => setImage_url6(e.target.value)}
            >
            </input>
        </label>
        <label>
          Orientation
            <input
            type="text"
            placeholder="orientation id"
            value={orientation_id}
            onChange={(e) => setOrientation_id(e.target.value)}
            >
            </input>
        </label>
        <label>
          Partner
            <input
            type="text"
            placeholder="partner id"
            value={partner_id}
            onChange={(e) => setPartner_id(e.target.value)}
            >
            </input>
        </label>
        <label>
          Pronouns
            <input
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
            type="text"
            placeholder="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            >
            </input>
        </label>
                <label>
          Education
            <input
            type="text"
            placeholder="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            >
            </input>
        </label>
        <label>
          Occupation
            <input
            type="text"
            placeholder="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            >
            </input>
        </label>
        <label>
          Horoscope
            <input
            type="text"
            placeholder="horoscope"
            value={horoscope_id}
            onChange={(e) => setHoroscope_id(e.target.value)}
            >
            </input>
        </label>
        {/* <label>
          Drinking
            <input
            type="boolean"
            placeholder="drinking"
            value={drinking}
            onChange={(e) => setDrinking(e.target.value)}
            >
            </input>
        </label>
        <label> */}

    {/* <label> Drinking
    <div>
      {[
        { name: "true", value: true },
        { name: "false", value: false }
      ].map((option) => (
        <label key={option.name}>
          {option.name}:
          <input
            onChange={(e) => {
              setDrinking(e.target.value);

            }}
            type="radio"
            name="answer"
            value={option.name}
            checked={option.name === drinking}
          />
        </label>
      ))}
    </div>
    </label> */}

        {/* <input  type="radio" value="Instructor"
                  name="staff" id='staff-instructor'
                  checked={staff === "Instructor" ? "checked" : ""}
                  onChange={(e) => setStaff(e.target.value)}
          /> Instructor
          <input  type="radio" value="Student"
                  name="staff" id='staff-Student'
                  checked={staff === "Student" ? "checked" : ""}
                  onChange={(e) => setStaff(e.target.value)}
          /> Student */}




          {/* <label>
          Smoker
            <input
            type="text"
            placeholder="smoking"
            value={smoking}
            onChange={(e) => setSmoking(e.target.value)}
            >
            </input>
        </label> */}

{/* <label> Smoking
    <div>
      {[
        { name: "yes", value: true},
        { name: "no", value: false}
      ].map((option) => (
        <label key={option.name}>
          {option.name}:
          <input
            onChange={(e) => {
              setSmoking(e.target.value);

            }}
            type="radio"
            name="smoker_answer"
            value={smoking}
            checked={option.name === smoking}
          />
        </label>
      ))}
    </div>
</label> */}

{/* <div onChange={setSmoking.bind(this)}>
        <input type="radio" value={smoking} name="gender"/> smoke
        <input type="radio" value="false" name="gender"/> no smoke
      </div> */}


        <label>
          Children
            <input
            type="text"
            placeholder="children_id"
            value={children_id}
            onChange={(e) => setChildren_id(e.target.value)}
            >
            </input>
        </label>
        <label>
          Pet
            <input
            type="text"
            placeholder="pet_id"
            value={pet_id}
            onChange={(e) => setPet_id(e.target.value)}
            >
            </input>
        </label>
        <label>
          Politic
            <input
            type="text"
            placeholder="politic"
            value={politic_id}
            onChange={(e) => setPolitic_id(e.target.value)}
            >
            </input>
        </label>
        <label>
          Religion
            <input
            type="text"
            placeholder="religion"
            value={religion_id}
            onChange={(e) => setReligion_id(e.target.value)}
            >
            </input>
        </label>

        <ul className="error">
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <button
          className="mobile-submit-create-business"
          type="submit"
          disabled={errors.length>0}
        >
          Submit
        </button>
        <button type="button" onClick={handleCancelFormEditClick}>Cancel</button>
        </form>
      </section>
      </>
    )
}


export default EditUserProfileForm
