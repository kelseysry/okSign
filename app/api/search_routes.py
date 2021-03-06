from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Message, db, User, Horoscope, Profile, Gender, Smoking
from flask_login import login_required, current_user

search_routes = Blueprint('search', __name__)


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
    # print("horπ·π·π·π·π·π·", horo[1])
    # print(("π«π«π«π«π«π«",list(horo.keys())))
    print("termπ·π·π·π·π·π·π·π·π·π·π·π·π·π·π·π·", term)
    print("termπ·π·π·π·π·π·π·π·π·π·π·π·π·π·π·π·", horo)
    horoscopeIdList= list(horo.keys())
    horoscopeIdString = ''.join(str(e) for e in horoscopeIdList)
    horoscopeIdNum = int(horoscopeIdString)
    print("π«numπ«",horoscopeIdNum)
    if term.lower() == horo[horoscopeIdNum]['sign'].lower():
      profilesMatchHoroscope1 = Profile.query.filter(Profile.horoscope_id == horo[horoscopeIdNum]['id']).all()
      print("π₯³π‘π‘π‘π‘π‘π‘π₯³", profilesMatchHoroscope1)
      if profilesMatchHoroscope1:
        for user in profilesMatchHoroscope1:
          userResultsFromQuery.add(user)
        return userResultsFromQuery

  gender = Gender.query.filter(Gender.name.ilike(f'{term}')).all()
  if gender:
    userGender = {g.id: g.to_dict() for g in gender}
    userGenderIdList = list(userGender.keys())
    # print("userGenderIdListπ₯³π₯³π₯³π₯³π₯³π₯³", userGender)
    userGenderIdString = ''.join(str(e) for e in userGenderIdList)
    # print("userGenderIdStringπ‘π‘π‘π‘π‘π‘π‘", userGenderIdString)
    userGenderIdNum = int(userGenderIdString)
    # print("userGenderIdNumπ‘π‘π‘π‘π‘π‘π‘", userGenderIdNum)
    if term.lower() == userGender[userGenderIdNum]['name'].lower():
      profileMatchGender = Profile.query.filter(Profile.gender_id == userGender[userGenderIdNum]['id']).all()
      # print("π₯³π‘π‘π‘π‘π‘π‘π₯³", profileMatchGender)
      if profileMatchGender:
        for user in profileMatchGender:
          userResultsFromQuery.add(user)
        return userResultsFromQuery



  return userResultsFromQuery

@search_routes.route('/<term>', methods=['GET'])
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
