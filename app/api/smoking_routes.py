from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, User, Smoking
from flask_login import login_required, current_user


smoking_routes = Blueprint('smokings', __name__)

# get all smoking in db
@smoking_routes.route('/')
def smokings():
    smokings = Smoking.query.all()
    return {'smokings': [smoking.to_dict() for smoking in smokings]}
