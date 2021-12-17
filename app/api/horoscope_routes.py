from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, User, Horoscope
# from app.forms import HoroscopeForm
from flask_login import login_required, current_user


horoscope_routes = Blueprint('horoscopes', __name__)

# get all horoscope in db
@horoscope_routes.route('/')
def horoscopes():
    horoscopes = Horoscope.query.all()
    return {'horoscopes': [horoscope.to_dict() for horoscope in horoscopes]}
