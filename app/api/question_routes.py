from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Question, db
from app.forms import QuestionForm

question_routes = Blueprint('questions', __name__)

# get all answers to questions for every user
@question_routes.route('/')
def questions():
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}

# get all answers to questions for one user
@question_routes.route('/<int:id>')
def question(id):
    question = Question.query.get(id)
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
