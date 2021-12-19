from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, User, Gender
from flask_login import login_required, current_user


gender_routes = Blueprint('genders', __name__)

# get all gender in db
@gender_routes.route('/')
def genders():
    genders = Gender.query.all()
    return {'genders': [gender.to_dict() for gender in genders]}
