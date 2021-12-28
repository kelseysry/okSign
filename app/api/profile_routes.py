from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Profile, db, User, Horoscope
from app.forms import ProfileForm
from flask_login import login_required, current_user

profile_routes = Blueprint('profiles', __name__)

# get specific profile from db
@profile_routes.route('/userProfile/<int:user_id>')
def user_profile(user_id):
    oneProfile = Profile.query.filter(Profile.user_id == user_id).first()
    print("profile----------", oneProfile)
    return {'oneProfile' : [oneProfile.to_dict()]}


# get all profiles in db
@profile_routes.route('/')
def profiles():
    profiles = Profile.query.all()
    return {'profiles': [profile.to_dict() for profile in profiles]}

# get one profile
@profile_routes.route('/<int:id>')
def profile(id):
    profile = Profile.query.get(id)
    return profile.to_dict()


def search_users(matchUserIds):
  all_Match_Users = set()
  userIdList = matchUserIds.split(",")
  # print("matchUserIds🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎", userIdList)
  for userId in userIdList:
    userProfileObj = Profile.query.filter(Profile.user_id == userId).first()
    all_Match_Users.add(userProfileObj)
  return all_Match_Users


# get profiles that match with current user for the conversations map
@profile_routes.route('/<matchUserIds>')
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




# edit one profile
@profile_routes.route('/<int:id>', methods=['GET','PUT'])
def edit_profile(id):
    profile = Profile.query.get(id)

    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("profile api---🍎🍎e🍎🍎e🍎🍎e🍎🍎e🍎🍎e--------", form.data)
    # print("profile api-??????----------", profiles.to_dict())

    if form.validate_on_submit():
      profile.user_id = form.data['user_id']
      profile.age = form.data['age']
      profile.location = form.data['location']
      profile.lng = form.data['lng']
      profile.about_me = form.data['about_me']
      profile.goal = form.data['goal']
      profile.talent = form.data['talent']
      profile.my_traits = form.data['my_traits']
      profile.needs = form.data['needs']
      profile.hobbies = form.data['hobbies']
      profile.moments = form.data['moments']
      profile.secrets = form.data['secrets']
      profile.looking_for = form.data['looking_for']
      profile.user_audio = form.data['user_audio']
      profile.gender_id = form.data['gender_id']
      profile.gender_preference_id = form.data['gender_preference_id']
      profile.number_likes = form.data['number_likes']
      profile.image_url1 = form.data['image_url1']
      profile.image_url2 = form.data['image_url2']
      profile.image_url3 = form.data['image_url3']
      profile.image_url4 = form.data['image_url4']
      profile.image_url5 = form.data['image_url5']
      profile.image_url6 = form.data['image_url6']
      profile.orientation_id = form.data['orientation_id']
      profile.partner_id = form.data['partner_id']
      profile.pronouns = form.data['pronouns']
      profile.height = form.data['height']
      profile.education = form.data['education']
      profile.occupation = form.data['occupation']
      profile.horoscope_id = form.data['horoscope_id']
      profile.smoking_id = form.data['smoking_id']
      profile.drinking_id = form.data['drinking_id']
      profile.children_id = form.data['children_id']
      profile.pet_id = form.data['pet_id']
      profile.politic_id = form.data['politic_id']
      profile.religion_id = form.data['religion_id']

      db.session.commit()
      print("profile api-!!!!!!!!🍎🍎🍎🍎🍎🍎🍎🍎!----------", profile.to_dict())
      return profile.to_dict()
    else:
      # print("request.json !!!!!!!!",request.json)
      print(form.errors)
      return "bad data"

# create profile
@profile_routes.route('/create', methods=['POST'])
def create_profile():
  form = ProfileForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    profile = Profile()
    form.populate_obj(profile)
    db.session.add(profile)
    db.session.commit()
    print("profile dict-------------", profile.to_dict())
    print(form.errors)
    return {"profile":profile.to_dict()}
  else:
    print(form.errors)
    return "bad data"

# delete profile
@profile_routes.route('/<int:id>', methods=['GET', 'DELETE'])
def delete_profile(id):
    profile = Profile.query.get(id)

    if profile:
      db.session.delete(profile)
      db.session.commit()
      return "deleted"
    else:
      print("not delted-------")
      return "401"
