
import { closeNav, openNav } from '../../store/navigation'
import './test.css'
import NavigationMenu from '../NavigationMenu/NavigationMenu';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import RadioButton from '../RadioButton';
import { createQuestion } from "../../store/question"
import { useHistory } from 'react-router';




function Test() {

  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  const [question1, setQuestion1] = useState('');
  const [must_answer1, setMust_answer1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [must_answer2, setMust_answer2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [must_answer3, setMust_answer3] = useState('');



return (
<section className="all-questions-container">

<nav className="question-nav-bar">
  <a href="#question-1">1</a>
  <a href="#question-2">2</a>
  <a href="#question-3">3</a>
  <a href="#question-4">4</a>
  <a href="#question-5">5</a>
  <a href="#question-6">6</a>
  <a href="#question-7">7</a>
  <a href="#question-8">8</a>
  <a href="#question-9">9</a>
  <a href="#question-10">10</a>
</nav>

    <section class="scroll-container">

        <div class="scroll-question1-section" id="question-1">
          <div className="question-big"> 1. Which word describes you better?</div>
          <div className="vertical-line"></div>

          
            <section className="question1ContainerE">
                    <div className="questionTextE">Your Answer?</div>
                    <div className ="question-choice">
                      <RadioButton
                          label="Carefree"
                          value={question1 === 'Carefree'}
                          onChange={(e) => setQuestion1("Carefree")}
                        />
                      <RadioButton
                        label="Intense"
                        value={question1 === 'Intense'}
                        onChange={(e) => setQuestion1("Intense")}
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
                        label="Intense"
                        value={must_answer1 === 'Intense'}
                        onChange={(e) => setMust_answer1("Intense")}
                      />
                    </div>
              </section>
            <div className="horizontal-line"></div>
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

export default Test
