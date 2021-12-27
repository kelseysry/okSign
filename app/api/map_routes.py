from flask import Blueprint, jsonify
from app.config import Config

map_routes = Blueprint("maps", __name__)


@map_routes.route("/key")
def getKey():
    print("hit back---🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍-----")
    return {"k":Config.REACT_APP_MAPS_KEY}
