from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, TextAreaField, BooleanField, DateField, RadioField
from wtforms.validators import DataRequired

# Which word describes you better?

class QuestionForm(FlaskForm):
  question1 = RadioField('Which word describes you better?', choices=['Carefree', 'Intense'])
  must_answer1 = RadioField('Answer you\'ll accept?', choices=['Carefree', 'Intense'])
  question2 = RadioField('Choose the better romantic activity', choices=['Kissing in Paris', 'Kissing in a tent, in the woods'])
  must_answer2 = RadioField('Answer you\'ll accept?', choices=['Kissing in Paris', 'Kissing in a tent, in the woods'])
  question3 = RadioField('If you don\'t do anything at all for an entire day, how does that make you feel?', choices=['Good', 'Bad'])
  must_answer3 = RadioField('Answer you\'ll accept?', choices=['Good', 'Bad'])
  question4 = RadioField('Do you often find yourself worrying about things that you have no control over?', choices=['Yes', 'No'])
  must_answer4 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'])
  question5 = RadioField('Is jealously healthi in a relationship?', choices=['Yes', 'No'])
  must_answer5 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'])
  question6 = RadioField('Would you date someone that vaped/used e-cigs?', choices=['Yes', 'No'])
  must_answer6 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'])
  question7 = RadioField('Which would you rather be?', choices=['Weird', 'Normal'])
  must_answer7 = RadioField('Answer you\'ll accept?', choices=['Weird', 'Normal'])
  question8 = RadioField('Is astrological sign at all important in a match?', choices=['Yes', 'No'])
  must_answer8 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'])
  question9 = RadioField('Do you enjoy discussing politics?', choices=['Yes', 'No'])
  must_answer9 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'])
  question10 = RadioField('Do you think it’s important to have an emotional connection before a physical one?', choices=['Yes', 'No'])
  must_answer10 = RadioField('Answer you\'ll accept?', choices=['Yes', 'No'])


  submit = SubmitField('Submit')
