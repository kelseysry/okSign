from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Like

class LikeForm(FlaskForm):
    liked = StringField('liked',validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    match_profile_id = IntegerField('match_profile_id', validators=[DataRequired()])
