from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, User, Religion


religion_routes = Blueprint('religions', __name__)

# get all religion in db
@religion_routes.route('/')
def religions():
    religions = Religion.query.all()
    return {'religions': [religion.to_dict() for religion in religions]}
