from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Question, db, User
from app.forms import QuestionForm
from flask_login import login_required, current_user

question_routes = Blueprint('questions', __name__)

# get all answers to questions for every user
@question_routes.route('/')
@login_required
def questions():
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}

# get all answers to questions for one user
@question_routes.route('/<int:id>')
@login_required
def question(id):
    question = Question.query.get(id)
    return question.to_dict()
