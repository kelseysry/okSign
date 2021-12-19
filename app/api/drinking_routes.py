from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, User, Drinking


drinking_routes = Blueprint('drinkings', __name__)

# get all Drinking in db
@drinking_routes.route('/')
def drinkings():
    drinkings = Drinking.query.all()
    return {'drinkings': [drinking.to_dict() for drinking in drinkings]}
