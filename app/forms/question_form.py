from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, TextAreaField, BooleanField, DateField, RadioField
from wtforms.validators import DataRequired

# Which word describes you better?

class QuestionForm(FlaskForm):
  question1 = RadioField('Which word describes you better?', choices=['Carefree', 'Intense'], validators=[DataRequired()])
  must_answer1 = RadioField('Answer you\'ll accept?', choices=['Carefree', 'Intense'], validators=[DataRequired()])
  question2 = RadioField('Choose the better romantic activity', choices=['Kissing in Paris', 'Kissing in a tent, in the woods'], validators=[DataRequired()])
  must_answer2 = RadioField('Answer you\'ll accept?', choices=['Kissing in Paris', 'Kissing in a tent, in the woods'], validators=[DataRequired()])
  question3 = RadioField('If you don\'t do anything at all for an entire day, how does that make you feel?', choices=['Good', 'Bad'], validators=[DataRequired()])
  must_answer3 = RadioField('Answer you\'ll accept?', choices=['Good', 'Bad'], validators=[DataRequired()])
  question4 = RadioField('Do you often find yourself worrying about things that you have no control over?', choices=['Yes', 'No'], validators=[DataRequired()])
  must_answer4 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'], validators=[DataRequired()])
  question5 = RadioField('Is jealously healthi in a relationship?', choices=['Yes', 'No'], validators=[DataRequired()])
  must_answer5 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'], validators=[DataRequired()])
  question6 = RadioField('Would you date someone that vaped/used e-cigs?', choices=['Yes', 'No'], validators=[DataRequired()])
  must_answer6 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'], validators=[DataRequired()])
  question7 = RadioField('Which would you rather be?', choices=['Weird', 'Normal'], validators=[DataRequired()])
  must_answer7 = RadioField('Answer you\'ll accept?', choices=['Weird', 'Normal'], validators=[DataRequired()])
  question8 = RadioField('Is astrological sign at all important in a match?', choices=['Yes', 'No'], validators=[DataRequired()])
  must_answer8 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'], validators=[DataRequired()])
  question9 = RadioField('Do you enjoy discussing politics?', choices=['Yes', 'No'], validators=[DataRequired()])
  must_answer9 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'], validators=[DataRequired()])
  question10 = RadioField('Do you think it’s important to have an emotional connection before a physical one?', choices=['Yes', 'No'], validators=[DataRequired()])
  must_answer10 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'], validators=[DataRequired()])
  user_id = IntegerField('user_id', validators=[DataRequired()])

  submit = SubmitField('Submit')
