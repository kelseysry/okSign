from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, Orientation


orientation_routes = Blueprint('orientations', __name__)

# get all orientation in db
@orientation_routes.route('/')
def orientations():
    orientations = Orientation.query.all()
    return {'orientations': [orientation.to_dict() for orientation in orientations]}
