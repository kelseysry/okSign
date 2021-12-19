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
    # print("hor🍷🍷🍷🍷🍷🍷", horo[1])
    # print(("😫😫😫😫😫😫",list(horo.keys())))
    print("term🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷", term)
    print("term🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷", horo)
    horoscopeIdList= list(horo.keys())
    horoscopeIdString = ''.join(str(e) for e in horoscopeIdList)
    horoscopeIdNum = int(horoscopeIdString)
    print("😫num😫",horoscopeIdNum)
    if term.lower() == horo[horoscopeIdNum]['sign'].lower():
      profilesMatchHoroscope1 = Profile.query.filter(Profile.horoscope_id == horo[horoscopeIdNum]['id']).all()
      print("🥳😡😡😡😡😡😡🥳", profilesMatchHoroscope1)
      if profilesMatchHoroscope1:
        for user in profilesMatchHoroscope1:
          userResultsFromQuery.add(user)
        return userResultsFromQuery

  gender = Gender.query.filter(Gender.name.ilike(f'{term}')).all()
  if gender:
    userGender = {g.id: g.to_dict() for g in gender}
    userGenderIdList = list(userGender.keys())
    # print("userGenderIdList🥳🥳🥳🥳🥳🥳", userGender)
    userGenderIdString = ''.join(str(e) for e in userGenderIdList)
    # print("userGenderIdString😡😡😡😡😡😡😡", userGenderIdString)
    userGenderIdNum = int(userGenderIdString)
    # print("userGenderIdNum😡😡😡😡😡😡😡", userGenderIdNum)
    if term.lower() == userGender[userGenderIdNum]['name'].lower():
      profileMatchGender = Profile.query.filter(Profile.gender_id == userGender[userGenderIdNum]['id']).all()
      # print("🥳😡😡😡😡😡😡🥳", profileMatchGender)
      if profileMatchGender:
        for user in profileMatchGender:
          userResultsFromQuery.add(user)
        return userResultsFromQuery

  # smoking = Smoking.query.filter(Smoking.name.ilike(f'{term}')).all()
  # if smoking:
  #   print("😡😡term", term)
  #   userSmoking = {g.id: g.to_dict() for g in smoking}
  #   userSmokingIdList = list(userSmoking.keys())
  #   userSmokingString = ''.join(str(e) for e in userSmokingIdList)
  #   userSmokingIdNum = int(userSmokingString)
  #   # print("userSmokingNum😡😡😡😡😡😡😡", userSmokingIdNum)
  #   if term.lower() == userGender[userSmokingIdNum]['name'].lower():
  #     profileMatchSmoking = Profile.query.filter(Profile.smoking_id == userSmoking[userSmokingIdNum]['id']).all()
  #     # print("🥳😡😡😡😡😡😡🥳", profileMatchSmoking)
  #     if profileMatchSmoking:
  #       for user in profileMatchSmoking:
  #         userResultsFromQuery.add(user)
  #       return userResultsFromQuery


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
