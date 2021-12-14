from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, BooleanField, TextAreaField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import Profile


class ProfileForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    age = IntegerField('age', validators=[DataRequired()])
    location = StringField('location',validators=[DataRequired()])
    lat = FloatField('lat', validators=[DataRequired()])
    lng = FloatField('lng', validators=[DataRequired()])
    about_me = StringField('about_me',validators=[DataRequired()])

    goal = StringField('goal',validators=[DataRequired()])
    talent = StringField('talent',validators=[DataRequired()])
    my_traits = StringField('my_traits',validators=[DataRequired()])
    needs = StringField('needs',validators=[DataRequired()])
    hobbies = StringField('hobbies',validators=[DataRequired()])
    moments = StringField('moments',validators=[DataRequired()])
    secrets = StringField('secrets',validators=[DataRequired()])
    looking_for = StringField('looking_for',validators=[DataRequired()])
    user_audio = StringField('user_audio',validators=[DataRequired()])
    gender_id = IntegerField('gender_id', validators=[DataRequired()])
    number_likes = IntegerField('number_likes', validators=[DataRequired()])
    image_url1 = StringField('image_url1',validators=[DataRequired()])
    image_url2 = StringField('image_url2',validators=[DataRequired()])
    image_url3 = StringField('image_url3',validators=[DataRequired()])
    image_url4 = StringField('image_url4',validators=[DataRequired()])
    image_url5 = StringField('image_url5',validators=[DataRequired()])
    image_url6 = StringField('image_url6',validators=[DataRequired()])
    orientation_id = IntegerField('orientation_id', validators=[DataRequired()])
    partner_id = IntegerField('partner_id', validators=[DataRequired()])
    pronouns = StringField('pronouns',validators=[DataRequired()])
    height = IntegerField('height', validators=[DataRequired()])
    education = StringField('education',validators=[DataRequired()])
    occupation = StringField('occupation',validators=[DataRequired()])
    horoscope_id = IntegerField('horoscope_id', validators=[DataRequired()])
    smoking = BooleanField('smoking')
    drinking = BooleanField('drinking')
    children_id = IntegerField('children_id', validators=[DataRequired()])
    pet_id = = IntegerField('pet_id', validators=[DataRequired()])
    politic_id = IntegerField('politic_id', validators=[DataRequired()])
    religion_id = IntegerField('religion_id', validators=[DataRequired()])
