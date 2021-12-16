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