from app.models import db, Question


def seed_questions():
    query1 = Question(
      question1 ='Carefree',
      must_answer1='Carefree',
      question2 = 'Kissing in Paris'
      must_answer2 = 'Kissing in Paris'
      question3 = 'Bad'
      must_answer3 = 'Bad'
      question4 = 'Yes'
      must_answer4 = 'No'
      question5 = 'Yes'
      must_answer5 = 'Yes'
      question6 = 'No'
      must_answer6 = 'No'
      question7 = 'Weird'
      must_answer7 = 'Weird'
      question8 = 'No'
      must_answer8 = 'No'
      question9 = 'No'
      must_answer9 ='No'
      question10 = 'Yes'
      must_answer10 = 'Yes'
      user_id=1
    )


    db.session.add(question1)

    db.session.commit()


def undo_questions():
    db.session.execute('TRUNCATE questions RESTART IDENTITY CASCADE;')
    db.session.commit()
