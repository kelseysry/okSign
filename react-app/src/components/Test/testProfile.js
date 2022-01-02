
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
  - hobbies
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

  6. Shower thought

  7. Images
  - 6. urls

  9. Small Details
  - horoscope
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
  <a href="#question-3">3</a>
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
              <div className="box1a">age</div>
              <div className="box1b">height</div>
            </div>
            <div className="box2">pronouns</div>
            <div className="box4">gender</div>
            <div className="box5">orientation</div>

          </div>

          {/* <div className="vertical-line-profile"></div>

          <div className="horizontal-line-profile"></div> */}





        </div>




        <div class="scroll-question2-section" id="question-2">
          <div className="question-big">2. Choose the better romantic activity</div>
          <div className="vertical-line"></div>
            <section className="question1ContainerE">
                    <div className="questionTextE">Your Answer?</div>
                    <div className ="question-choice">
                    <RadioButton
                        label="Kissing in Paris"
                        value={question2 === 'Kissing in Paris'}
                        onChange={(e) => setQuestion2("Kissing in Paris")}
                      />
                    <RadioButton
                        label="Kissing in a tent, in the woods"
                        value={question2 === 'Kissing in a tent, in the woods'}
                        onChange={(e) => setQuestion2("Kissing in a tent, in the woods")}
                      />
                    </div>

                    <div className="questionTextE">Answer you'll accept?</div>
                    <div className ="question-choice">
                      <RadioButton
                          label="Carefree"
                          value={must_answer1 === 'Carefree'}
                          onChange={(e) => setMust_answer1("Carefree")}
                        />
                      <RadioButton
                        label="Kissing in a tent, in the woods"
                        value={must_answer2 === "Kissing in a tent, in the woods"}
                        onChange={(e) => setMust_answer2("Kissing in a tent, in the woods")}
                      />
                    </div>
              </section>
            <div className="horizontal-line"></div>
        </div>







    </section>


</section>

  )

}

export default TestProfile
