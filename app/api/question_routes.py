from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Question, db
from app.forms import QuestionForm

question_routes = Blueprint('questions', __name__)

# get all answers to questions for every user
@question_routes.route('/')
def questions():
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}

# get all answers to questions for one user, remember questions are attached via user_id and not the question.id
@question_routes.route('/<int:user_id>')
def question(user_id):
    # question = Question.query.get(id)
    question = Question.query.filter(Question.user_id == user_id).first()
    print("question in back", question)
    return question.to_dict()

# post a question form
@question_routes.route('/create', methods=['POST'])
def create_question():
  form = QuestionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    question = Question()
    form.populate_obj(question)
    db.session.add(question)
    db.session.commit()
    print("question dict-------------", question.to_dict())
    return {"question":question.to_dict()}
  else:
    print(form.errors)
    return "bad data"


# edit one question
@question_routes.route('/<int:user_id>', methods=['GET','PUT'])
def question_detail(user_id):
    question = Question.query.filter(Question.user_id == user_id).first()

    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      question.question1 = form.data['question1']
      question.must_answer1 = form.data['must_answer1']
      question.question2 = form.data['question2']
      question.must_answer2 = form.data['must_answer2']
      question.question3 = form.data['question3']
      question.must_answer3 = form.data['must_answer3']
      question.question4 = form.data['question4']
      question.must_answer4 = form.data['must_answer4']
      question.question5 = form.data['question5']
      question.must_answer5 = form.data['must_answer5']
      question.question6 = form.data['question6']
      question.must_answer6 = form.data['must_answer6']
      question.question7 = form.data['question7']
      question.must_answer7 = form.data['must_answer7']
      question.question8 = form.data['question8']
      question.must_answer8 = form.data['must_answer8']
      question.question9 = form.data['question9']
      question.must_answer9 = form.data['must_answer9']
      question.question10 = form.data['question10']
      question.must_answer10 = form.data['must_answer10']
      question.user_id = form.data['user_id']
      db.session.commit()
      # print("question api-!!!!!!!!!----------", question.to_dict())
      return question.to_dict()
    else:
      # print("request.json !!!!!!!!",request.json)
      print(form.errors)
      return "bad data"
