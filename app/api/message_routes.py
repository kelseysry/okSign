from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Message, db, User
from app.forms import MessageForm
from flask_login import login_required, current_user

message_routes = Blueprint('message', __name__)

# post a message
@message_routes.route('/<int:conversation_id>/messages', methods=['POST'])
def create_message(conservation_id):
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    message = Message()
    form.populate_obj(message)
    db.session.add(message)
    db.session.commit()
    print("message dict-------------", message.to_dict())
    return {"message":message.to_dict()}
  else:
    return "bad data"

# get all messages for a conversation
@message_routes.route('/<int:conversation_id>/messages', methods=['GET'])
def get_conversation(conversation_id):
  messages = Message.query.filter(Message.conversation_id == conversation_id).all()
  # print("all messages", messages)
  return {message.id: message.to_dict() for message in messages}
