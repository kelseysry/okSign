from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, User, Conversation
from app.forms import ConversationForm
from flask_login import login_required, current_user


conversation_routes = Blueprint('conversations', __name__)

# get all conversation in db
@conversation_routes.route('/')
def conversations():
    conversations = Conversation.query.all()
    return {'conversations': [conversation.to_dict() for conversation in conversations]}

# get one conversation
@conversation_routes.route('/<int:id>')
def conversation(id):
    conversation = Conversation.query.get(id)
    return conversation.to_dict()


# post a conversation
@conversation_routes.route('/', methods=['POST'])
def create_conversation():
  form = ConversationForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    conversation = Conversation()
    form.populate_obj(conversation)
    db.session.add(conversation)
    db.session.commit()
    print("conversation dict-------------", conversation.to_dict())
    return {"conversation":conversation.to_dict()}
  else:
    return "bad data"
