from .db import db
from sqlalchemy.sql import func


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    # query = db.Column(db.String)
    question1 = db.Column(db.String)
    must_answer1 = db.Column(db.String)
    question2 = db.Column(db.String)
    must_answer2 = db.Column(db.String)
    question3 = db.Column(db.String)
    must_answer3 = db.Column(db.String)
    question4 = db.Column(db.String)
    must_answer4 = db.Column(db.String)
    question5 = db.Column(db.String)
    must_answer5 = db.Column(db.String)
    question6 = db.Column(db.String)
    must_answer6 = db.Column(db.String)
    question7 = db.Column(db.String)
    must_answer7 = db.Column(db.String)
    question8 = db.Column(db.String)
    must_answer8 = db.Column(db.String)
    question9 = db.Column(db.String)
    must_answer9 = db.Column(db.String)
    question10 = db.Column(db.String)
    must_answer10 = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    user = db.relationship("User", back_populates="questions")

    def to_dict(self):
        return {
            'id': self.id,
            'question1': self.question1,
            'must_answer1' :self.must_answer1,
            'question2': self.question2,
            'must_answer2' :self.must_answer2,
            'question3': self.question3,
            'must_answer3' :self.must_answer3,
            'question4': self.question4,
            'must_answer4' :self.must_answer4,
            'question5': self.question5,
            'must_answer5' :self.must_answer5,
            'question6': self.question6,
            'must_answer6' :self.must_answer6,
            'question7': self.question7,
            'must_answer7' :self.must_answer7,
            'question8': self.question8,
            'must_answer8' :self.must_answer8,
            'question9': self.question9,
            'must_answer9' :self.must_answer9,
            'question10': self.question10,
            'must_answer10' :self.must_answer10,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
