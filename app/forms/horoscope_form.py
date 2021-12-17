from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Horoscope


class HoroscopeForm(FlaskForm):
    sign = StringField('sign',validators=[DataRequired()])
    image_url = StringField('image_url',validators=[DataRequired()])
    match = StringField('match',validators=[DataRequired()])
