from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Like, db, User
from app.forms import LikeForm
from flask_login import login_required, current_user

like_routes = Blueprint('like', __name__)

# post a message
@like_routes.route('/create', methods=['POST'])
def create_like():
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      like = Like()
      form.populate_obj(like)
      db.session.add(like)
      db.session.commit()
      print("like dict-------------", like.to_dict())
      print(form.errors)
      return {"like":like.to_dict()}
    else:
      print(form.errors)
      return "bad data"


# create like or edit post
# @like_routes.route('/users/<int:user_id>/matchProfile/<int:match_profile_id>', methods=['GET', 'POST'])
# @like_routes.route('/users', methods=['GET', 'POST'])
# def like_detail(user_id=0, match_profile_id=0):
#   form = LikeForm()
#   if form.validate_on_submit():
#     like = Like.query.filter(Like.user_id == user_id).filter(Like.match_profile_id == match_profile_id).first()
#     if like:
#       form.populate_obj(like)
#       db.session.add(like)
#       db.session.commit()
#     else:
#       like = Like()
#       form.populate_obj(like)
#       db.session.add(like)
#       db.session.commit()
#     return {"like":like.to_dict()}
#   else:
#     like = Like.query.filter(Like.user_id == user_id).filter(Like.match_profile_id == match_profile_id).first()
#     if like:
#       form.process(obj=like)
#     else:
#       like = Like()
#       form.process(obj=like)
#     return {"like":like.to_dict()}



# get one profile that matches
# the user_id (current user that like the profile)
# match_profile_id (profile that got liked)
@like_routes.route('/user/<int:user_id>/matchProfile/<int:match_profile_id>')
def profile(user_id, match_profile_id):
    like = Like.query.filter(Like.user_id == user_id).filter(Like.match_profile_id == match_profile_id).first()
    if like:
      return like.to_dict()
    else:
      print(form.errors)
      return "bad data"
