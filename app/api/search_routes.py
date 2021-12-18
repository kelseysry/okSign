from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Message, db, User, Horoscope, Profile
from flask_login import login_required, current_user

search_routes = Blueprint('search', __name__)


# this works -> gets specific horoscope

# @search_routes.route('/<term>/', methods=['GET'])
# def search(term):
#   searchResult = Horoscope.query.filter(Horoscope.sign.ilike(f'%{term}%')).all()
#   if searchResult:
#     result = {p.id : p.to_dict() for p in searchResult}
#     return {
#               "sign" : result,

#           }
#   else:
#     return { "sign" : {},
#             }



# this works -> gets users based off of location

# @search_routes.route('/<term>/', methods=['GET'])
# def search(term):
#   searchResult = Profile.query.filter(Profile.location.ilike(f'%{term}%')).all()
#   if searchResult:
#     result = {p.id : p.to_dict() for p in searchResult}
#     return {
#               "profile" : result,

#           }
#   else:
#     return { "profile" : {},
#             }




def search_users(term):
  # this only gets horoscope table
  horoscope = Horoscope.query.filter(Horoscope.sign.ilike(f'%{term}%')).all()
  horo = {h.id: h.to_dict() for h in horoscope}
  # print("search-----------------------------", horo[11]['sign']) #aquarius
  print("search-----------------------------", horo[11]['id'])

  horoscope = Profile.query.filter(Profile.horoscope_id == horo[11]['id']).all()

  userResultsFromQuery = set(horoscope)

  # gets user via the location typed in --- from profile
  location = Profile.query.filter(Profile.location.ilike(f'%{term}%')).all()
  for user in location:
    userResultsFromQuery.add(user)

  return userResultsFromQuery




# this works -> gets specific horoscope

@search_routes.route('/<term>/', methods=['GET'])
def search(term):
  searchResult = search_users(term)
  if searchResult:
    result = {p.id : p.to_dict() for p in searchResult}
    return {
              "user" : result,

          }
  else:
    return { "user" : {},
            }
