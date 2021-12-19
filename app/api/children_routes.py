from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, User, Children


children_routes = Blueprint('children', __name__)

# get all children in db
@children_routes.route('/')
def childrens():
    childrens = Children.query.all()
    return {'childrens': [children.to_dict() for children in childrens]}
