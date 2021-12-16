from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Conversation


class ConversationForm(FlaskForm):
    user_id_one = IntegerField('user_id_one', validators=[DataRequired()])
    user_id_two = IntegerField('user_id_two', validators=[DataRequired()])
