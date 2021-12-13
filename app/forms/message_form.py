from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import Review


class MessageForm(FlaskForm):
    conversation_id = IntegerField('conversation_id', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired()])
    from_user_id = IntegerField('from_user_id', validators=[DataRequired()])
