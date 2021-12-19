from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, User, Pet


pet_routes = Blueprint('pets', __name__)

# get all pets in db
@pet_routes.route('/')
def pets():
    pets = Pet.query.all()
    return {'pets': [pet.to_dict() for pet in pets]}
