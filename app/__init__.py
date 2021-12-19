import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.message_routes import message_routes
from .api.profile_routes import profile_routes
from .api.question_routes import question_routes
from .api.conversation_routes import conversation_routes
from .api.horoscope_routes import horoscope_routes
from .api.search_routes import search_routes
from .api.gender_routes import gender_routes
from .api.smoking_routes import smoking_routes
from .api.drinking_routes import drinking_routes
from .api.children_routes import children_routes
from .api.pet_routes import pet_routes
from .api.politic_routes import politic_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(message_routes, url_prefix='/api/conversations')
app.register_blueprint(profile_routes, url_prefix='/api/profiles')
app.register_blueprint(question_routes, url_prefix='/api/questions')
app.register_blueprint(conversation_routes, url_prefix='/api/conversations')
app.register_blueprint(horoscope_routes, url_prefix='/api/horoscopes')
app.register_blueprint(search_routes, url_prefix='/api/search')
app.register_blueprint(gender_routes, url_prefix='/api/genders')
app.register_blueprint(smoking_routes, url_prefix='/api/smokings')
app.register_blueprint(drinking_routes, url_prefix='/api/drinkings')
app.register_blueprint(children_routes, url_prefix='/api/children')
app.register_blueprint(pet_routes, url_prefix='/api/pets')
app.register_blueprint(politic_routes, url_prefix='/api/politics')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
