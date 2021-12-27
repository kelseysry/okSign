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
