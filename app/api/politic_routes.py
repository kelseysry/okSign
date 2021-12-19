from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, User, Politic


politic_routes = Blueprint('politics', __name__)

# get all politic in db
@politic_routes.route('/')
def politics():
    politics = Politic.query.all()
    return {'politics': [politic.to_dict() for politic in politics]}
