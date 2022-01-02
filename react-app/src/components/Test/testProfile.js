
import { closeNav, openNav } from '../../store/navigation'
import './test.css'
import NavigationMenu from '../NavigationMenu/NavigationMenu';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import RadioButton from '../RadioButton';
import { createQuestion } from "../../store/question"
import { useHistory } from 'react-router';

import './TestProfile.css'


function TestProfile() {

  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  const [question1, setQuestion1] = useState('');
  const [must_answer1, setMust_answer1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [must_answer2, setMust_answer2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [must_answer3, setMust_answer3] = useState('');

  const [age, setAge] = useState('');
  const [gender_id, setGender_id] = useState('1');

  /*

  1. person emoji
  - age
  - gender - select
  - pronouns
  - orientation - select
  - height


  2. map emoji
  location
  lat
  lng

  3. book
  - about me
  - education
  - occupation

  4. trophy
  - goal
  - talent
  - traits


  4. Relationship
  - relationship status
  - needs
  - looking for
  - gender preference

  5. Funny
  - moments
  - secrets
  - hobbies

  6. Shower thought

  7. Images
  - 6. urls

  9. Small Details
  - smoking
  - drinking
  - children
  - pets
  - politics
  - religion

  */


return (
<section className="all-questions-container">
<nav className="profile-nav-bar">
  <a href="#question-1"><i className="fas fa-ice-cream"></i></a>
  <a href="#question-2"><i class="fas fa-map-marker-alt"></i></a>
  <a href="#question-3">about me</a>
  <a href="#question-4">4</a>
  <a href="#question-5">5</a>
  <a href="#question-6">6</a>
  <a href="#question-7">7</a>
  <a href="#question-8">

  <i class="fa-solid fa-ice-cream"></i>
  </a>
  <a href="#question-9">9</a>
  <a href="#question-10">10</a>
</nav>

    <section class="scroll-container">


        <div class="scroll-question1-section" id="question-1">
          <div className="basic-detail-grid">

            <div className="box1">
              <div className="box1a">
              <label>
                  Age
                    <input
                    className="profile-inpu"
                    type="text"
                    placeholder=""
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    >
                    </input>
                </label>
              </div>


              <div className="box1b">height</div>
            </div>
            <div className="box2">pronouns</div>


            <div className="box4">

            <div className="profile-select">
            <label className="selectField">
                  <span className="labelName">Gender</span>
                  <select value={gender_id} onChange={(e) => setGender_id(+e.target.value)}>
                    {/* <option value='1' disabled>Select a gender</option> */}
                    <option value="1">Women</option>
                    <option value="2">Male</option>
                  </select>
                </label>
            </div>

            </div>


            <div className="box5">orientation</div>

          </div>






        </div>

        {/* - about me
  - hobbies
  - education
  - occupation */}
        <div class="scroll-question2-section" id="question-2">

<section className="location-grid">
            <div className="location-box1-map">map</div>
            <div className="location-box2">location</div>
            <div className="location-box3-grid">
              <div className="location-box4-lat">lat</div>
              <div className="location-box5-lat">lng</div>
            </div>

          </section>
</div>


        <div class="scroll-question3-section" id="question-3">
          <section className="about-me-grid">
            <div className="about-box1">about me</div>
            <div className="about-box2">hobbies</div>
            <div className="about-box3">education</div>
            <div className="about-box4">occupation</div>


          </section>
        </div>


        <div class="scroll-question3-section" id="question-3">
          <section className="a">

          </section>
        </div>


        <div class="scroll-question4-section" id="question-4">
          <div className="relationship-grid">
            <div className="relationship1">status</div>
            <div className="relationship2">needs</div>
            <div className="relationship3">looing for</div>
            <div className="relationship4">gender preference</div>
          </div>
        </div>


        <div class="scroll-question5-section" id="question-5">
        <div class="parent">
<div class="div1">hello1 </div>
<div class="div2">helo2 </div>
<div class="div3">3 </div>
<div class="div4"> 4</div>
<div class="div5">5 </div>
<div class="div6">6 </div>
</div>


        </div>




    </section>


</section>

  )

}

export default TestProfile
