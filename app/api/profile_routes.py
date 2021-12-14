from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Profile, db, User
from app.forms import ProfileForm
from flask_login import login_required, current_user

profile_routes = Blueprint('profiles', __name__)


@profile_routes.route('/')
def profiles():
    profiles = Profile.query.all()
    return {'profiles': [profile.to_dict() for profile in profiles]}


@profile_routes.route('/<int:id>')
def profile(id):
    profile = Profile.query.get(id)
    return profile.to_dict()
