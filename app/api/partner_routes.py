from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import db, Partner


partner_routes = Blueprint('partners', __name__)

# get all partner in db
@partner_routes.route('/')
def partners():
    partners = Partner.query.all()
    return {'partners': [partner.to_dict() for partner in partners]}
