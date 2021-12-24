from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Profile, db, User, Message
from app.forms import ProfileForm
from flask_login import login_required, current_user

match_routes = Blueprint('matches', __name__)



def search_users(matchUserIds):
  all_Match_Users = set()
  userIdList = matchUserIds.split(",")
  # print("matchUserIds🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎", userIdList)
  for userId in userIdList:
    userProfileObj = Profile.query.filter(Profile.user_id == userId).first()
    all_Match_Users.add(userProfileObj)
  return all_Match_Users


# get profiles that match with current user for the conversations map
@match_routes.route('/<matchUserIds>')
def get_matchProfile(matchUserIds):
  searchResult = search_users(matchUserIds)
  # print("searchResult🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎", searchResult)
  if searchResult:
    result = {p.id : p.to_dict() for p in searchResult}
    return {
              "user" : result,

          }
  else:
    return { "user" : {},
            }

# get latest message in a conversation with match
@match_routes.route('/<int:conversation_id>/messages', methods=['GET'])
def get_conversation(conversation_id):
  messages = Message.query.filter(Message.conversation_id == conversation_id).all()
  lastMessage = messages
  print("last message 🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎---------------", lastMessage[-1])
  return {message.id: message.to_dict() for message in messages}
