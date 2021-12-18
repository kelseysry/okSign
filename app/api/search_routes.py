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
  userResultsFromQuery = set()
  # this gets locations
  locations = Profile.query.filter(Profile.location.ilike(f'%{term}%')).all()
  # print("locations--------", locations)
  for user in locations:
    userResultsFromQuery.add(user)

  horoscope = Horoscope.query.filter(Horoscope.sign.ilike(f'%{term}%')).all()
  if horoscope:
    horo = {h.id: h.to_dict() for h in horoscope}
    print("search---------------🥳🥳🥳----", horoscope)
    print("search get horoscope name--🥳---", horo[1]['sign'])
    # aquarius
    if term == horo[1]['sign']:
      idx = 1
      profilesMatchHoroscope1 = Profile.query.filter(Profile.horoscope_id == horo[idx]['id']).all()
      if profilesMatchHoroscope1:
        print("profile matching horoscope-----", profilesMatchHoroscope1)
        for user in profilesMatchHoroscope1:
          userResultsFromQuery.add(user)


    # print("search get horoscope id-----", horo[1]['id']) # 1
    # print("search-----------------------------", horo[1]['id'])







    # profilesMatchHoroscope1 = Profile.query.filter(Profile.horoscope_id == horo[1]['id']).all()
    # if profilesMatchHoroscope1:
    #   print("profile matching horoscope-----", profilesMatchHoroscope1)
    #   for user in profilesMatchHoroscope1:
    #     userResultsFromQuery.add(user)



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
