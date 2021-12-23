from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Profile, db, User
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