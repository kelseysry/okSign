from app.models import db, Question


def seed_questions():
    query1 = Question(
      question1 ='Carefree',
      must_answer1='Carefree',
      question2 = 'Kissing in Paris',
      must_answer2 = 'Kissing in Paris',
      question3 = 'Bad',
      must_answer3 = 'Bad',
      question4 = 'Yes',
      must_answer4 = 'No',
      question5 = 'Yes',
      must_answer5 = 'Yes',
      question6 = 'No',
      must_answer6 = 'No',
      question7 = 'Weird',
      must_answer7 = 'Weird',
      question8 = 'No',
      must_answer8 = 'No',
      question9 = 'No',
      must_answer9 ='No',
      question10 = 'Yes',
      must_answer10 = 'Yes',
      user_id=1
    )

    query2 = Question(
    question1 ='Intense',
    must_answer1='Intense',
    question2 = 'Kissing in Paris',
    must_answer2 = 'Kissing in Paris',
    question3 = 'Bad',
    must_answer3 = 'Bad',
    question4 = 'Yes',
    must_answer4 = 'No',
    question5 = 'Yes',
    must_answer5 = 'Yes',
    question6 = 'Yes',
    must_answer6 = 'Yes',
    question7 = 'Normal',
    must_answer7 = 'Normal',
    question8 = 'No',
    must_answer8 = 'No',
    question9 = 'Yes',
    must_answer9 ='Yes',
    question10 = 'Yes',
    must_answer10 = 'Yes',
    user_id=2
    )

    query3 = Question(
    question1 ='Intense',
    must_answer1='Intense',
    question2 = 'Kissing in a tent, in the woods',
    must_answer2 = 'Kissing in a tent, in the woods',
    question3 = 'Good',
    must_answer3 = 'Good',
    question4 = 'No',
    must_answer4 = 'No',
    question5 = 'Yes',
    must_answer5 = 'Yes',
    question6 = 'Yes',
    must_answer6 = 'Yes',
    question7 = 'Normal',
    must_answer7 = 'Normal',
    question8 = 'Yes',
    must_answer8 = 'Yes',
    question9 = 'Yes',
    must_answer9 ='Yes',
    question10 = 'No',
    must_answer10 = 'No',
    user_id=3
    )

    query4 = Question(
    question1 ='Carefree',
    must_answer1='Carefree',
    question2 = 'Kissing in Paris',
    must_answer2 = 'Kissing in Paris',
    question3 = 'Bad',
    must_answer3 = 'Bad',
    question4 = 'Yes',
    must_answer4 = 'No',
    question5 = 'Yes',
    must_answer5 = 'Yes',
    question6 = 'No',
    must_answer6 = 'No',
    question7 = 'Weird',
    must_answer7 = 'Weird',
    question8 = 'No',
    must_answer8 = 'No',
    question9 = 'No',
    must_answer9 ='No',
    question10 = 'Yes',
    must_answer10 = 'Yes',
    user_id=4
  )


    query5 = Question(
      question1 ='Intense',
      must_answer1='Intense',
      question2 = 'Kissing in a tent, in the woods',
      must_answer2 = 'Kissing in a tent, in the woods',
      question3 = 'Bad',
      must_answer3 = 'Bad',
      question4 = 'Yes',
      must_answer4 = 'No',
      question5 = 'Yes',
      must_answer5 = 'Yes',
      question6 = 'No',
      must_answer6 = 'No',
      question7 = 'Weird',
      must_answer7 = 'Weird',
      question8 = 'No',
      must_answer8 = 'No',
      question9 = 'Yes',
      must_answer9 ='Yes',
      question10 = 'Yes',
      must_answer10 = 'Yes',
      user_id=5
    )

    query6 = Question(
      question1 ='Carefree',
      must_answer1='Carefree',
      question2 = 'Kissing in Paris',
      must_answer2 = 'Kissing in Paris',
      question3 = 'Bad',
      must_answer3 = 'Bad',
      question4 = 'Yes',
      must_answer4 = 'No',
      question5 = 'Yes',
      must_answer5 = 'Yes',
      question6 = 'No',
      must_answer6 = 'No',
      question7 = 'Weird',
      must_answer7 = 'Weird',
      question8 = 'No',
      must_answer8 = 'No',
      question9 = 'No',
      must_answer9 ='No',
      question10 = 'No',
      must_answer10 = 'No',
      user_id=6
    )

    query7 = Question(
      question1 ='Intense',
      must_answer1='Intense',
      question2 = 'Kissing in Paris',
      must_answer2 = 'Kissing in Paris',
      question3 = 'Bad',
      must_answer3 = 'Bad',
      question4 = 'Yes',
      must_answer4 = 'No',
      question5 = 'No',
      must_answer5 = 'No',
      question6 = 'No',
      must_answer6 = 'No',
      question7 = 'Weird',
      must_answer7 = 'Weird',
      question8 = 'No',
      must_answer8 = 'No',
      question9 = 'Yes',
      must_answer9 ='Yes',
      question10 = 'Yes',
      must_answer10 = 'Yes',
      user_id=7
    )

    query8 = Question(
      question1 ='Intense',
      must_answer1='Intense',
      question2 = 'Kissing in a tent, in the woods',
      must_answer2 = 'Kissing in a tent, in the woods',
      question3 = 'Bad',
      must_answer3 = 'Bad',
      question4 = 'Yes',
      must_answer4 = 'Yes',
      question5 = 'Yes',
      must_answer5 = 'Yes',
      question6 = 'No',
      must_answer6 = 'No',
      question7 = 'Normal',
      must_answer7 = 'Normal',
      question8 = 'No',
      must_answer8 = 'No',
      question9 = 'Yes',
      must_answer9 ='Yes',
      question10 = 'Yes',
      must_answer10 = 'Yes',
      user_id=8
    )


    query9 = Question(
      question1 ='Intense',
      must_answer1='Intense',
      question2 = 'Kissing in a tent, in the woods',
      must_answer2 = 'Kissing in a tent, in the woods',
      question3 = 'Bad',
      must_answer3 = 'Bad',
      question4 = 'Yes',
      must_answer4 = 'Yes',
      question5 = 'Yes',
      must_answer5 = 'Yes',
      question6 = 'No',
      must_answer6 = 'No',
      question7 = 'Normal',
      must_answer7 = 'Normal',
      question8 = 'No',
      must_answer8 = 'No',
      question9 = 'Yes',
      must_answer9 ='Yes',
      question10 = 'Yes',
      must_answer10 = 'Yes',
      user_id=9
    )


    query10 = Question(
    question1 ='Intense',
    must_answer1='Intense',
    question2 = 'Kissing in a tent, in the woods',
    must_answer2 = 'Kissing in a tent, in the woods',
    question3 = 'Good',
    must_answer3 = 'Good',
    question4 = 'No',
    must_answer4 = 'No',
    question5 = 'Yes',
    must_answer5 = 'Yes',
    question6 = 'Yes',
    must_answer6 = 'Yes',
    question7 = 'Normal',
    must_answer7 = 'Normal',
    question8 = 'Yes',
    must_answer8 = 'Yes',
    question9 = 'Yes',
    must_answer9 ='Yes',
    question10 = 'No',
    must_answer10 = 'No',
    user_id=10
    )

    query11 = Question(
      question1 ='Intense',
      must_answer1='Intense',
      question2 = 'Kissing in a tent, in the woods',
      must_answer2 = 'Kissing in a tent, in the woods',
      question3 = 'Bad',
      must_answer3 = 'Bad',
      question4 = 'Yes',
      must_answer4 = 'Yes',
      question5 = 'Yes',
      must_answer5 = 'Yes',
      question6 = 'No',
      must_answer6 = 'No',
      question7 = 'Normal',
      must_answer7 = 'Normal',
      question8 = 'No',
      must_answer8 = 'No',
      question9 = 'Yes',
      must_answer9 ='Yes',
      question10 = 'Yes',
      must_answer10 = 'Yes',
      user_id=11
    )

    query12 = Question(
      question1 ='Carefree',
      must_answer1='Carefree',
      question2 = 'Kissing in a tent, in the woods',
      must_answer2 = 'Kissing in a tent, in the woods',
      question3 = 'Good',
      must_answer3 = 'Good',
      question4 = 'Yes',
      must_answer4 = 'Yes',
      question5 = 'Yes',
      must_answer5 = 'Yes',
      question6 = 'No',
      must_answer6 = 'No',
      question7 = 'Weird',
      must_answer7 = 'Weird',
      question8 = 'No',
      must_answer8 = 'No',
      question9 = 'Yes',
      must_answer9 ='Yes',
      question10 = 'No',
      must_answer10 = 'No',
      user_id=12
    )


    query13 = Question(
      question1 ='Intense',
      must_answer1='Intense',
      question2 = 'Kissing in a tent, in the woods',
      must_answer2 = 'Kissing in a tent, in the woods',
      question3 = 'Bad',
      must_answer3 = 'Bad',
      question4 = 'Yes',
      must_answer4 = 'No',
      question5 = 'Yes',
      must_answer5 = 'Yes',
      question6 = 'No',
      must_answer6 = 'No',
      question7 = 'Normal',
      must_answer7 = 'Normal',
      question8 = 'No',
      must_answer8 = 'No',
      question9 = 'Yes',
      must_answer9 ='Yes',
      question10 = 'Yes',
      must_answer10 = 'Yes',
      user_id=13
    )

    db.session.add(query1)
    db.session.add(query2)
    db.session.add(query3)
    db.session.add(query4)
    db.session.add(query5)
    db.session.add(query6)
    db.session.add(query7)
    db.session.add(query8)
    db.session.add(query9)
    db.session.add(query10)
    db.session.add(query11)
    db.session.add(query12)
    db.session.add(query13)


    db.session.commit()


def undo_questions():
    db.session.execute('TRUNCATE questions RESTART IDENTITY CASCADE;')
    db.session.commit()
